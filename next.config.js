/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: `https://gbqgujildfv-666bfe4fe0e8.herokuapp.com/api/v1/:path*`,
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
