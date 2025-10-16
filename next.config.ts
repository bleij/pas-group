// next.config.ts
import type {NextConfig} from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
    reactStrictMode: !isDev, // в dev выключаем, в проде включено
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "pasgroup.online", pathname: "/wp-content/**"},
            {protocol: "https", hostname: "**.wp.com", pathname: "/**"},
        ],
    },
};

export default nextConfig;