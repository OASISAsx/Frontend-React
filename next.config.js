/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: { appDir: true },
    env: {
        NEXTAUTH_SECRET: "conter",
        API_ENDPOINT: "http://localhost:8088/v1/",
    }
}

module.exports = nextConfig
