/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: 'https://hostile-beta-fd821710a9f8.herokuapp.com/api/v1/:path*',
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            }
        ]
    }
}

module.exports = nextConfig
