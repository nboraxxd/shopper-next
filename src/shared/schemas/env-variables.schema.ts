import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_REFRESH_TOKEN_CHECK_INTERVAL: z.string(),
  NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT: z.string(),
})

const envProject = envSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_REFRESH_TOKEN_CHECK_INTERVAL: process.env.NEXT_PUBLIC_REFRESH_TOKEN_CHECK_INTERVAL,
  NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT: process.env.NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT,
})

if (!envProject.success) {
  throw new Error('Invalid configuration. Please check your .env file.')
}

const envVariables = envProject.data

export default envVariables
