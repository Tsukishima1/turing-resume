/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() { 
        return [ 
         //接口请求 前缀带上/api-text/
            { source: '/api/resume/:path*', destination: `http://localhost:8080/:path*` }, // 意为将/api/resume/xxx 代理到http://localhost:8080/xxx
            { source: '/api/resume/:path*', destination: `http://localhost:8080/:path*` },
        ]
      },
};

export default nextConfig;
