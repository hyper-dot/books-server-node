import { z } from 'zod'
export const envSchema = z.object({
  DB_URL: z.string(),

  // JWT
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),

  // GOOGLE OAUTH
  // CLIENT_ID: z.string(),
  // CLIENT_SECRET: z.string(),
  // REDIRECT_URL: z.string().url(),

  // Frontend url
  // CLIENT_URL: z.string().url(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
