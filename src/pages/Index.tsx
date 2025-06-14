
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PianoKeyboard from "@/components/PianoKeyboard";
import LearnMode from "@/components/LearnMode";
import { Music, CirclePlay, Volume2 } from "lucide-react";

const Index = () => {
  const [currentMode, setCurrentMode] = useState<'menu' | 'freeplay' | 'learn'>('menu');
  const [currentInstrument, setCurrentInstrument] = useState('piano');

  const instruments = [
    { id: 'piano', name: 'Piano', color: '#00D4FF' },
    { id: 'organ', name: 'Organ', color: '#8B5CF6' },
    { id: 'synth', name: 'Synth', color: '#F472B6' },
  ];

  if (currentMode === 'freeplay') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button 
              onClick={() => setCurrentMode('menu')}
              variant="outline"
              className="glass-effect border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-slate-900"
            >
              ← Back to Menu
            </Button>
            <div className="flex gap-2">
              {instruments.map((instrument) => (
                <Button
                  key={instrument.id}
                  onClick={() => setCurrentInstrument(instrument.id)}
                  variant={currentInstrument === instrument.id ? "default" : "outline"}
                  className={`glass-effect ${currentInstrument === instrument.id 
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-slate-900' 
                    : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                  style={{ 
                    borderColor: currentInstrument === instrument.id ? instrument.color : undefined 
                  }}
                >
                  {instrument.name}
                </Button>
              ))}
            </div>
          </div>
          <PianoKeyboard instrument={currentInstrument} />
        </div>
      </div>
    );
  }

  if (currentMode === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <LearnMode onBack={() => setCurrentMode('menu')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 animate-glow-pulse">
          <Music className="w-24 h-24 mx-auto text-neon-blue mb-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent mb-4">
            Magic Piano
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Learn to play piano with magical falling notes and glowing keys!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-effect border-neon-blue/30 p-8 hover:border-neon-blue transition-all duration-300 cursor-pointer group" 
                onClick={() => setCurrentMode('learn')}>
            <CirclePlay className="w-12 h-12 text-neon-purple mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2">Learn Mode</h2>
            <p className="text-gray-400">Follow the falling notes and learn your favorite songs step by step</p>
          </Card>

          <Card className="glass-effect border-neon-purple/30 p-8 hover:border-neon-purple transition-all duration-300 cursor-pointer group"
                onClick={() => setCurrentMode('freeplay')}>
            <Volume2 className="w-12 h-12 text-neon-blue mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2">Free Play</h2>
            <p className="text-gray-400">Express yourself with our magical piano keyboard and create beautiful music</p>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">🎵 Tap, learn, and create magical music! 🎵</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
