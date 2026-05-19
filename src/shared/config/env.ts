const requireEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value as string;
};

export const env = {
  OPENWEATHER_API_KEY: requireEnv('VITE_OPENWEATHER_API_KEY'),
  OPENWEATHER_BASE_URL: requireEnv('VITE_OPENWEATHER_BASE_URL'),
} as const;
