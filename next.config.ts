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
      { protocol: 'https', hostname: 'salt.tikicdn.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/v0/b/**' },
    ],
  },
  transpilePackages: ['lucide-react'],
  async redirects() {
    return [
      {
        source: '/login',
        destination: PATH.LOGIN,
        permanent: true,
      },
      {
        source: '/logout',
        destination: PATH.LOGOUT,
        permanent: true,
      },
      {
        source: '/register',
        destination: PATH.REGISTER,
        permanent: true,
      },
      {
        source: '/verify-account',
        destination: PATH.VERIFY_ACCOUNT,
        permanent: true,
      },
      {
        source: '/resend-verification-email',
        destination: PATH.RESEND_VERIFICATION_EMAIL,
        permanent: true,
      },
      {
        source: '/forgot-password',
        destination: PATH.FORGOT_PASSWORD,
        permanent: true,
      },
      {
        source: '/reset-password',
        destination: PATH.RESET_PASSWORD,
        permanent: true,
      },
      {
        source: '/products',
        destination: PATH.PRODUCTS,
        permanent: true,
      },
      {
        destination: PATH.CART,
        source: '/cart',
        permanent: true,
      },
      {
        destination: PATH.CHECKOUT,
        source: '/checkout',
        permanent: true,
      },
      {
        destination: PATH.ACCOUNT,
        source: '/account',
        permanent: true,
      },
      {
        destination: PATH.PROFILE,
        source: '/account/profile',
        permanent: true,
      },
      {
        destination: PATH.PAYMENT,
        source: '/account/payment',
        permanent: true,
      },
      {
        destination: PATH.ADD_PAYMENT,
        source: '/account/payment/add',
        permanent: true,
      },
      {
        destination: PATH.ADDRESS,
        source: '/account/address',
        permanent: true,
      },
      {
        destination: PATH.ADD_ADDRESS,
        source: '/account/address/add',
        permanent: true,
      },
      {
        destination: `${PATH.UPDATE_ADDRESS}/:id`,
        source: '/account/address/update/:id',
        permanent: true,
      },
      {
        destination: PATH.WISHLIST,
        source: '/account/wishlist',
        permanent: true,
      },
      {
        destination: PATH.ORDER_HISTORY,
        source: '/account/order-history',
        permanent: true,
      },
      {
        destination: PATH.SUPPORT,
        source: '/support',
        permanent: true,
      },
    ]
  },
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
        source: PATH.LOGOUT,
        destination: '/logout',
      },
      {
        source: PATH.REGISTER,
        destination: '/register',
      },
      {
        source: PATH.VERIFY_ACCOUNT,
        destination: '/verify-account',
      },
      {
        source: PATH.RESEND_VERIFICATION_EMAIL,
        destination: '/resend-verification-email',
      },
      {
        source: PATH.FORGOT_PASSWORD,
        destination: '/forgot-password',
      },
      {
        source: PATH.RESET_PASSWORD,
        destination: '/reset-password',
      },
      {
        source: PATH.CART,
        destination: '/cart',
      },
      {
        source: PATH.CHECKOUT,
        destination: '/checkout',
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
        source: `${PATH.UPDATE_ADDRESS}/:id`,
        destination: '/account/address/update/:id',
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
