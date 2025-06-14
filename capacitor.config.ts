
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.360dac4348994d48816d8828a3b17b8b',
  appName: 'Magic Piano - Learn & Play',
  webDir: 'dist',
  server: {
    url: 'https://360dac43-4899-4d48-816d-8828a3b17b8b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e293b',
      showSpinner: false
    }
  }
};

export default config;
