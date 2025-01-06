import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'

import customPlugin from './tailwind-plugin'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        '2xl': '1400px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          red: '#F94545',
          green: '#67B044',
          blue: '#0071DC',
          purple: '#7644E1',
          yellow: '#FFB700',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          blue: '#77DAE6',
          green: '#00F375',
          1: '#1A162E',
          2: '#9E9DA8',
          3: '#D2D1D6',
          4: '#EDEDF6',
          5: '#F8F8FB',
          6: '#FAFAFD ',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        header: 'hsl(var(--header))',
        footer: 'hsl(var(--footer))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        light: {
          1: '#FFFFFF',
          2: '#F6F6F6',
          3: '#EEEEEE',
        },
        dark: {
          DEFAULT: '#000000',
          1: '#171C28',
          2: '#292E39',
          3: '#B9BABE',
        },
      },
      borderRadius: {
        lg: 'var(--radius)' /* 8px */,
        md: 'calc(var(--radius) - 2px)' /* 6px */,
        sm: 'calc(var(--radius) - 4px)' /* 4px */,
        xl: 'calc(var(--radius) + 2px)' /* 10px */,
        '3xl': '1.25rem' /* 20px */,
      },
      boxShadow: {
        section: 'var(--section-shadow)',
        popover: 'var(--popover-shadow)',
      },
      spacing: {
        'header-height': 'var(--header-height)',
        'sheet-header-height': 'var(--sheet-header-height)',
      },
      fontSize: {
        /** 12px size / 1rem height */
        xs: ['0.75rem', { lineHeight: '1rem' }],
        /** 14px size / 142.857% height */
        sm: ['0.875rem', { lineHeight: '142.857%' }],
        /** 16px size / 150% height */
        base: ['1rem', { lineHeight: '150%' }],
        /** 18px size / 144.444% height */
        lg: ['1.125rem', { lineHeight: '144.444%' }],
        /** 22px size / 145.455% height */
        xl: ['1.375rem', { lineHeight: '145.455%' }],
        /** 24px size / 141.667% height */
        '2xl': ['1.5rem', { lineHeight: '141.667%' }],
        /** 26px size / 138.462% height */
        '3xl': ['1.625rem', { lineHeight: '138.462%' }],
        /** 30px size / 146.667% height */
        '4xl': ['1.875rem', { lineHeight: '146.667%' }],
        /** 36px size / 138.889% height */
        '5xl': ['2.25rem', { lineHeight: '138.889%' }],
        /** 42px size / 142.857% height */
        '6xl': ['2.625rem', { lineHeight: '142.857%' }],
        /** 48px size / 1 height */
        '7xl': ['3rem', { lineHeight: '1' }],
        /** 60px size / 1 height */
        '8xl': ['3.75rem', { lineHeight: '1' }],
        /** 72px size / 1 height */
        '9xl': ['4.5rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [tailwindcssAnimate, customPlugin],
} satisfies Config
