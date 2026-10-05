import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: (() => {
    const parsed = parseInt(getEnv('PORT', '4000'), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 4000;
  })(),
  corsOrigin: getEnv('CORS_ORIGIN', '*'),
  isProduction: getEnv('NODE_ENV', 'development') === 'production',
} as const;
