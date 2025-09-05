import Constants from 'expo-constants';

export type AppEnv = {
  API_BASE_URL: string;
  MAPBOX_PUBLIC_TOKEN: string;
  ENV: 'dev' | 'staging' | 'prod' | string;
};

const rawEnv = (Constants.expoConfig?.extra || {}) as Record<string, unknown>;

function requireEnv(key: string): string {
  const value = rawEnv[key];
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  throw new Error(`Missing environment variable: ${key}`);
}

export const env: AppEnv = {
  API_BASE_URL: requireEnv('API_BASE_URL'),
  MAPBOX_PUBLIC_TOKEN: requireEnv('MAPBOX_PUBLIC_TOKEN'),
  ENV: (rawEnv.ENV as AppEnv['ENV']) || 'dev',
};
