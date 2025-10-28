// lib/wp-client.ts
const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT!;
if (!endpoint) throw new Error("WORDPRESS_GRAPHQL_ENDPOINT is not set");

// === DEV in-memory cache (TTL) ===
const isDev = process.env.NODE_ENV !== "production";
const DEV_TTL = Number(process.env.WP_DEV_CACHE_TTL ?? 120);
type CacheEntry = { expires: number; data: any };
const mem = new Map<string, CacheEntry>();

function getCache(k: string) {
    if (!isDev || DEV_TTL <= 0) return null;
    const hit = mem.get(k);
    if (hit && hit.expires > Date.now()) return hit.data;
    if (hit) mem.delete(k);
    return null;
}

function setCache(k: string, data: any) {
    if (!isDev || DEV_TTL <= 0) return;
    mem.set(k, { expires: Date.now() + DEV_TTL * 1000, data });
}

// === дедуп одинаковых запросов ===
const inflight = new Map<string, Promise<any>>();

// === ограничение параллелизма ===
const MAX_CONCURRENT = Number(process.env.WP_MAX_CONCURRENT ?? 1);
let active = 0;
const queue: Array<() => void> = [];

function schedule<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        const run = async () => {
            active++;
            try {
                resolve(await task());
            } catch (e) {
                reject(e);
            } finally {
                active--;
                queue.shift()?.();
            }
        };
        if (active < MAX_CONCURRENT) run();
        else queue.push(run);
    });
}

function keyOf(query: string, variables: any) {
    return JSON.stringify({ query, variables });
}

export async function wpRequest<T>(
    query: string,
    variables: any = {},
    { revalidate = Number(process.env.WP_REVALIDATE ?? 600) }: { revalidate?: number } = {}
): Promise<T> {
    const key = keyOf(query, variables);

    // dev cache
    const devCached = getCache(key);
    if (devCached) return devCached as T;

    // dedupe
    if (inflight.has(key)) return inflight.get(key)!;

    const p = schedule<T>(async () => {
        const body = JSON.stringify({ query, variables });

        for (let attempt = 0; attempt < 7; attempt++) {
            try {
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "PAS-NextJS",
                    },
                    body,
                    next: { revalidate },
                });

                if (res.status === 429) {
                    const retryAfter = Number(res.headers.get("retry-after") || 0);
                    const delay =
                        (retryAfter > 0
                            ? retryAfter * 1000
                            : Math.min(2000 * 2 ** attempt, 15000)) +
                        Math.random() * 500;
                    console.warn(`⚠️ WP 429 Too Many Requests (try ${attempt + 1}) → wait ${Math.round(delay / 1000)}s`);
                    await new Promise((r) => setTimeout(r, delay));
                    continue;
                }

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`WP ${res.status}: ${text.slice(0, 200)}`);
                }

                const json = await res.json();

                if (json?.errors) {
                    console.error("WP GraphQL errors:", json.errors);
                    throw new Error(`WP GraphQL errors: ${JSON.stringify(json.errors).slice(0, 300)}`);
                }

                const data = json.data as T;
                setCache(key, data);
                return data;
            } catch (err: any) {
                // лог ошибок, но не падаем сразу
                console.error(`⚠️ WP fetch error (attempt ${attempt + 1}):`, err.message);
                const delay = Math.min(1500 * (attempt + 1), 8000);
                await new Promise((r) => setTimeout(r, delay));
            }
        }

        console.error(`❌ WP failed after all retries for query: ${query.slice(0, 50)}...`);
        // возвращаем пустой объект, чтобы Next не падал
        return {} as T;
    });

    inflight.set(key, p);
    try {
        return await p;
    } finally {
        inflight.delete(key);
    }
}