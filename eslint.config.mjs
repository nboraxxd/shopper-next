import { dirname } from 'path'
import pluginJs from '@eslint/js'
import { fileURLToPath } from 'url'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'
import tailwind from 'eslint-plugin-tailwindcss'
import pluginQuery from '@tanstack/eslint-plugin-query'
import eslintPluginPrettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'tailwindcss/no-custom-classname': ['warn', { whitelist: ['mySwiper', 'toaster', '(?!(calendar)\\-).*'] }],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'es5',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: false,
        },
      ],
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'className'],
        classRegex: '.*[Cc]lass[Nn]ame.*',
      },
    },
    ignores: ['**/node_modules/', '**/dist/'],
  },
]

export default eslintConfig
