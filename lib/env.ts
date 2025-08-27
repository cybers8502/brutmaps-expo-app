import Constants from 'expo-constants';

export type AppEnv = {
  API_BASE_URL?: string;
  MAPBOX_PUBLIC_TOKEN?: string;
  ENV: 'dev' | 'staging' | 'prod' | string;
};

export const env = (Constants.expoConfig?.extra || {}) as AppEnv;
