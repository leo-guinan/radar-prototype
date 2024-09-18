/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack:
    {
        resolve: {
            fallback: {
                "@visheratin/web-ai": false
            }
        }
    }
};

export default nextConfig;
