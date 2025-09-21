import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/redirect',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
