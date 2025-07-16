/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io',
                pathname: '/ipfs/**',
            },
            {
                protocol: 'https',
                hostname: 'gateway.pinata.cloud',
                pathname: '/ipfs/**',
            }
        ],
    },
}
  
export default nextConfig
  