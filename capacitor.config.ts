import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'porta.vinia.app',
  appName: 'portal-app',
  webDir: 'www',
  android: {
    allowMixedContent: true,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['alert', 'sound'],
    },
  },
};

export default config;
