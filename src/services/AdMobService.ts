
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, RewardAdOptions, AdmobConsentStatus, AdmobConsentDebugGeography } from '@capacitor-community/admob';

export class AdMobService {
  private static instance: AdMobService;
  private isInitialized = false;

  static getInstance(): AdMobService {
    if (!AdMobService.instance) {
      AdMobService.instance = new AdMobService();
    }
    return AdMobService.instance;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing AdMob...');
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true,
      });
      this.isInitialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  async showBannerAd() {
    try {
      const options: BannerAdOptions = {
        adId: 'ca-app-pub-3940256099942544/6300978111',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true
      };
      
      await AdMob.showBanner(options);
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  async hideBannerAd() {
    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  async showRewardedAd(): Promise<boolean> {
    try {
      const options: RewardAdOptions = {
        adId: 'ca-app-pub-3940256099942544/5224354917',
        isTesting: true
      };

      await AdMob.prepareRewardVideoAd(options);
      const result = await AdMob.showRewardVideoAd();
      
      if (result.rewarded) {
        console.log('User earned reward!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to show rewarded ad:', error);
      return false;
    }
  }
}
