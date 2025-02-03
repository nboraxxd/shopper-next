import type { NextConfig } from 'next'

import PATH from '@/shared/constants/path'

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'tailwindui.com', pathname: '/plus/img/**' },
      { protocol: 'https', hostname: 'salt.tikicdn.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/v0/b/**' },
    ],
  },
  transpilePackages: ['lucide-react'],
  async rewrites() {
    return [
      {
        source: PATH.PRODUCTS,
        destination: '/products',
      },
      {
        source: PATH.LOGIN,
        destination: '/login',
      },
      {
        source: PATH.CART,
        destination: '/cart',
      },
      {
        source: PATH.ACCOUNT,
        destination: '/account',
      },
      {
        source: PATH.PROFILE,
        destination: '/account/profile',
      },
      {
        source: PATH.PAYMENT,
        destination: '/account/payment',
      },
      {
        source: PATH.ADD_PAYMENT,
        destination: '/account/payment/add',
      },
      {
        source: PATH.ADDRESS,
        destination: '/account/address',
      },
      {
        source: PATH.ADD_ADDRESS,
        destination: '/account/address/add',
      },
      {
        source: PATH.WISHLIST,
        destination: '/account/wishlist',
      },
      {
        source: PATH.ORDER_HISTORY,
        destination: '/account/order-history',
      },
      {
        source: PATH.SUPPORT,
        destination: '/support',
      },
    ]
  },
}

export default nextConfig
