
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.360dac4348994d48816d8828a3b17b8b',
  appName: 'keyglow-melody-spark',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-3940256099942544~3347511713',
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b']
    }
  }
};

export default config;
