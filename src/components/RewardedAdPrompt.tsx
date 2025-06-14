
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Play, Star, Clock } from "lucide-react";
import { AdMobService } from '@/services/AdMobService';
import { toast } from "@/hooks/use-toast";

interface RewardedAdPromptProps {
  onRewardEarned: () => void;
  onCancel: () => void;
  rewardType: 'premium_lesson' | 'extra_practice' | 'bonus_content';
}

const RewardedAdPrompt = ({ onRewardEarned, onCancel, rewardType }: RewardedAdPromptProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const adMobService = AdMobService.getInstance();

  const getRewardDetails = () => {
    switch (rewardType) {
      case 'premium_lesson':
        return {
          icon: <Star className="w-8 h-8 text-neon-yellow" />,
          title: 'Unlock Premium Lesson',
          description: 'Watch a short ad to unlock this advanced lesson for free!',
          reward: 'Premium Lesson Access'
        };
      case 'extra_practice':
        return {
          icon: <Clock className="w-8 h-8 text-neon-blue" />,
          title: 'Extra Practice Time',
          description: 'Get 30 minutes of unlimited practice time by watching an ad!',
          reward: '30 Min Extra Practice'
        };
      case 'bonus_content':
        return {
          icon: <Gift className="w-8 h-8 text-neon-purple" />,
          title: 'Bonus Content',
          description: 'Unlock exclusive songs and exercises with a quick ad!',
          reward: 'Bonus Songs & Exercises'
        };
    }
  };

  const handleWatchAd = async () => {
    setIsLoading(true);
    try {
      const rewarded = await adMobService.showRewardedAd();
      
      if (rewarded) {
        toast({
          title: "Reward Earned! 🎉",
          description: `You've unlocked: ${getRewardDetails().reward}`,
        });
        onRewardEarned();
      } else {
        toast({
          title: "Ad Cancelled",
          description: "You need to watch the complete ad to earn the reward.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to show ad. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const details = getRewardDetails();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="glass-effect border-white/20 p-6 max-w-sm w-full text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            {details.icon}
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{details.title}</h2>
          <p className="text-gray-400 text-sm">{details.description}</p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-neon-green">
            <Gift className="w-4 h-4" />
            <span className="font-medium text-sm">{details.reward}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleWatchAd}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-neon-green to-neon-blue text-slate-900 hover:from-neon-green/90 hover:to-neon-blue/90"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                Loading Ad...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Watch Ad (30s)
              </>
            )}
          </Button>
          
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
          >
            Maybe Later
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Support Piano Academy by watching ads! 💙
        </p>
      </Card>
    </div>
  );
};

export default RewardedAdPrompt;
