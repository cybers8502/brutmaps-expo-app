import 'dotenv/config';
import type {ExpoConfig} from 'expo/config';

const config: ExpoConfig = {
  name: 'expo-brutmaps',
  slug: 'expo-brutmaps',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'expobrutmaps',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,

  extra: {
    API_BASE_URL: process.env.API_BASE_URL,
    ENV: process.env.APP_ENV ?? 'dev',
    MAPBOX_PUBLIC_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN,
    MAPBOX_DOWNLOAD_TOKEN: process.env.MAPBOX_DOWNLOAD_TOKEN,
    eas: {projectId: process.env.EAS_PROJECT_ID ?? 'REPLACE_WITH_YOUR_EAS_PROJECT_ID'},
  },

  ios: {
    bundleIdentifier: 'com.yourco.brutmaps',
    supportsTablet: true,
    infoPlist: {
      MBXAccessToken: process.env.MAPBOX_PUBLIC_TOKEN,
    },
  },

  android: {
    package: 'com.yourco.brutmaps',
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['android.permission.ACCESS_COARSE_LOCATION', 'android.permission.ACCESS_FINE_LOCATION'],
  },

  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },

  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-background.png',
        resizeMode: 'contain',
        backgroundColor: '#1C1C1C',
      },
    ],
    ['expo-location', {locationWhenInUsePermission: 'Show current location on map.'}],
    [
      '@rnmapbox/maps',
      {
        RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN,
      },
    ],
    ['./plugins/disableUserScriptSandboxing', {configurations: ['Debug'], value: 'NO'}],
  ],

  experiments: {typedRoutes: true},
};

export default config;
