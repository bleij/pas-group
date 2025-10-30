import type {NextConfig} from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
    reactStrictMode: !isDev,
    staticPageGenerationTimeout: 600, // 10 минут
    typedRoutes: false,
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "pasgroup.online", pathname: "/wp-content/**"},
            {protocol: "https", hostname: "**.wp.com", pathname: "/**"},
        ],
    },
    eslint: {
        ignoreDuringBuilds: true, // чтобы не роняло билд из-за lint
    },
};

export default nextConfig;