/** @type {import('next').NextConfig} */
const nextConfig = {
    
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: 'http://localhost:8080/api/v1/:path*',
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '//localhost:8080',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
