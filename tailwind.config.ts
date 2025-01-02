import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'

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
        /** 16px size / 150% height */
        base: ['1rem', '150%'],
        /** 15px size / 146.667% height / regular */
        'regular-15': ['0.9375rem', { lineHeight: '146.667%', fontWeight: '400' }],
        /** 15px size / 146.667% height / medium */
        'medium-15': ['0.9375rem', { lineHeight: '146.667%', fontWeight: '500' }],
        /** 16px size / 150% height / regular */
        'regular-16': ['1rem', { lineHeight: '150%', fontWeight: '400' }],
        /** 16px size / 150% height / medium */
        'medium-16': ['1rem', { lineHeight: '150%', fontWeight: '500' }],
        /** 18px size / 144.444% height / medium */
        'medium-18': ['1.125rem', { lineHeight: '144.444%', fontWeight: '500' }],
        /** 18px size / 144.444% height / bold */
        'bold-18': ['1.125rem', { lineHeight: '144.444%', fontWeight: '700' }],
        /** 22px size / 145.455% height / bold */
        'bold-22': ['1.375rem', { lineHeight: '145.455%', fontWeight: '700' }],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [tailwindcssAnimate, require('./tailwind-plugin.cts')],
} satisfies Config
