
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Play } from "lucide-react";

const NativeAd = () => {
  return (
    <Card className="glass-effect border-neon-yellow/30 p-6 my-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-neon-yellow to-neon-orange rounded-lg flex items-center justify-center">
          <Star className="w-6 h-6 text-slate-900" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Piano Master Pro</h3>
          <p className="text-xs text-gray-400">Sponsored</p>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-4">
        Unlock advanced piano techniques with our premium course. Master complex pieces faster!
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-neon-yellow fill-current" />
            ))}
          </div>
          <span className="text-xs text-gray-400">4.8 • Free</span>
        </div>
        
        <Button 
          size="sm"
          className="bg-gradient-to-r from-neon-yellow to-neon-orange text-slate-900 hover:from-neon-yellow/90 hover:to-neon-orange/90"
        >
          <Play className="w-3 h-3 mr-1" />
          Try Now
        </Button>
      </div>
    </Card>
  );
};

export default NativeAd;
