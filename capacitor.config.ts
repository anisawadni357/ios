import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.topomer.app',
  appName: 'topomer',
  webDir: 'www',  
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '311031680675-dgsi4hjj6fc9enalh1pe6fbtkod7jic6.apps.googleusercontent.com', // Trouvé dans la console Google
      forceCodeForRefreshToken: true,
    }
   
  },
  
};

export default config;
