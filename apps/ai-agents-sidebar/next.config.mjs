import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@ui': path.resolve(process.cwd(), 'packages/ui'),
      '@utils': path.resolve(process.cwd(), 'packages/utils'),
      '@hooks': path.resolve(process.cwd(), 'packages/hooks'),
      '@constants': path.resolve(process.cwd(), 'packages/constants'),
      '@types': path.resolve(process.cwd(), 'packages/types'),
    };
    return config;
  },
};

export default nextConfig;
