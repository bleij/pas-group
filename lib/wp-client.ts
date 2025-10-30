const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT!;
if (!endpoint) throw new Error("WORDPRESS_GRAPHQL_ENDPOINT is not set");

const isDev = process.env.NODE_ENV !== "production";
const DEV_TTL = Number(process.env.WP_DEV_CACHE_TTL ?? 120);

interface CacheEntry<T> {
    expires: number;
    data: T;
}

const mem = new Map<string, CacheEntry<unknown>>();

function getCache<T>(key: string): T | null {
    if (!isDev || DEV_TTL <= 0) return null;
    const hit = mem.get(key);
    if (hit && hit.expires > Date.now()) return hit.data as T;
    if (hit) mem.delete(key);
    return null;
}

function setCache<T>(key: string, data: T): void {
    if (!isDev || DEV_TTL <= 0) return;
    mem.set(key, {expires: Date.now() + DEV_TTL * 1000, data});
}

// === дедуп одинаковых запросов ===
const inflight = new Map<string, Promise<unknown>>();

// === ограничение параллелизма ===
let MAX_CONCURRENT = Number(process.env.WP_MAX_CONCURRENT ?? 1);
let active = 0;
const queue: Array<() => void> = [];

function schedule<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        const run = async (): Promise<void> => {
            active++;
            try {
                const result = await task();
                resolve(result);
            } catch (e) {
                reject(e);
            } finally {
                active--;
                queue.shift()?.();
            }
        };
        if (active < MAX_CONCURRENT) void run();
        else queue.push(run);
    });
}

function keyOf(query: string, variables: Record<string, unknown>): string {
    return JSON.stringify({query, variables});
}

export async function wpRequest<T>(
    query: string,
    variables: Record<string, unknown> = {},
    {revalidate = Number(process.env.WP_REVALIDATE ?? 600)}: { revalidate?: number } = {}
): Promise<T> {
    const key = keyOf(query, variables);

    const cached = getCache<T>(key);
    if (cached) return cached;

    if (inflight.has(key)) return inflight.get(key) as Promise<T>;

    const p = schedule<T>(async () => {
        const body = JSON.stringify({query, variables});

        for (let attempt = 0; attempt < 10; attempt++) {
            try {
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "PAS-NextJS",
                    },
                    body,
                    next: {revalidate},
                });

                // === 429 Too Many Requests ===
                if (res.status === 429) {
                    const retryAfter = Number(res.headers.get("retry-after") || 0);
                    const delay =
                        (retryAfter > 0
                            ? retryAfter * 1000
                            : Math.min(2000 * 2 ** attempt, 30000)) +
                        Math.random() * 500;
                    console.warn(
                        `⚠️ WP 429 Too Many Requests (try ${attempt + 1}) → wait ${Math.round(delay / 1000)}s`
                    );

                    // немного расслабляем ограничение при долгих очередях
                    if (attempt > 5 && MAX_CONCURRENT < 3) {
                        MAX_CONCURRENT++;
                        console.warn(`⬆️ увеличен MAX_CONCURRENT до ${MAX_CONCURRENT}`);
                    }

                    await new Promise((r) => setTimeout(r, delay));
                    continue;
                }

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`WP ${res.status}: ${text.slice(0, 200)}`);
                }

                const json = (await res.json()) as { data?: T; errors?: unknown };
                if (json.errors) {
                    console.error("WP GraphQL errors:", json.errors);
                    throw new Error(`WP GraphQL errors: ${JSON.stringify(json.errors).slice(0, 300)}`);
                }

                const data = json.data as T;
                setCache(key, data);
                return data;
            } catch (err) {
                const error = err instanceof Error ? err.message : String(err);
                console.error(`⚠️ WP fetch error (attempt ${attempt + 1}):`, error);
                const delay = Math.min(2000 * (attempt + 1), 10000);
                await new Promise((r) => setTimeout(r, delay));
            }
        }

        console.error(`❌ WP failed after all retries for query: ${query.slice(0, 50)}...`);
        const fallback: T = {} as T;
        setCache(key, fallback);
        return fallback;
    });

    inflight.set(key, p);
    try {
        return await p;
    } finally {
        inflight.delete(key);
    }
}