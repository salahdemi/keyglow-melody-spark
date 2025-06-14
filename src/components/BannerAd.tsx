
import { useEffect } from 'react';
import { AdMobService } from '@/services/AdMobService';

interface BannerAdProps {
  show: boolean;
}

const BannerAd = ({ show }: BannerAdProps) => {
  const adMobService = AdMobService.getInstance();

  useEffect(() => {
    const initializeAds = async () => {
      await adMobService.initialize();
      if (show) {
        await adMobService.showBannerAd();
      }
    };

    initializeAds();

    return () => {
      if (show) {
        adMobService.hideBannerAd();
      }
    };
  }, [show, adMobService]);

  useEffect(() => {
    if (show) {
      adMobService.showBannerAd();
    } else {
      adMobService.hideBannerAd();
    }
  }, [show, adMobService]);

  // Banner ads are rendered natively by Capacitor, so we return null
  return null;
};

export default BannerAd;
