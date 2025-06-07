/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
  