/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    reactStrictMode: false,
    async redirects(){
        return [
            {
                source: '/',
                destination: '/auth',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
