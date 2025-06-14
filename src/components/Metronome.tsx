
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, VolumeOff } from "lucide-react";

interface MetronomeProps {
  enabled: boolean;
  tempo: number;
  onToggle: (enabled: boolean) => void;
  onTempoChange: (tempo: number) => void;
}

const Metronome = ({ enabled, tempo, onToggle, onTempoChange }: MetronomeProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Audio Context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const playClick = (isDownbeat: boolean = false) => {
    if (!audioContextRef.current) return;
    
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for downbeat and regular beats
    oscillator.frequency.setValueAtTime(isDownbeat ? 800 : 600, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const startMetronome = () => {
    if (!enabled) return;
    
    setIsPlaying(true);
    const interval = (60 / tempo) * 1000; // Convert BPM to milliseconds
    
    intervalRef.current = setInterval(() => {
      setCurrentBeat(prev => {
        const nextBeat = (prev + 1) % 4;
        playClick(nextBeat === 1); // Downbeat on beat 1
        return nextBeat;
      });
    }, interval);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentBeat(0);
  };

  useEffect(() => {
    if (isPlaying && enabled) {
      stopMetronome();
      startMetronome();
    } else if (!enabled && isPlaying) {
      stopMetronome();
    }
  }, [tempo, enabled]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => onToggle(!enabled)}
        variant="outline"
        size="sm"
        className={`glass-effect ${enabled 
          ? 'border-neon-green text-neon-green' 
          : 'border-gray-500 text-gray-500'
        }`}
      >
        {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeOff className="w-4 h-4" />}
      </Button>
      
      <Button
        onClick={handleTogglePlay}
        disabled={!enabled}
        size="sm"
        className={`${isPlaying 
          ? 'bg-gradient-to-r from-neon-green to-neon-blue' 
          : 'bg-gradient-to-r from-gray-600 to-gray-700'
        }`}
      >
        {isPlaying ? 'Stop' : 'Start'}
      </Button>
      
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onTempoChange(Math.max(60, tempo - 10))}
          disabled={!enabled}
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
        >
          -
        </Button>
        
        <div className="text-center min-w-[60px]">
          <div className="text-sm font-bold text-white">{tempo}</div>
          <div className="text-xs text-gray-400">BPM</div>
        </div>
        
        <Button
          onClick={() => onTempoChange(Math.min(200, tempo + 10))}
          disabled={!enabled}
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
        >
          +
        </Button>
      </div>
      
      {enabled && (
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((beat) => (
            <div
              key={beat}
              className={`w-3 h-3 rounded-full transition-all duration-100 ${
                currentBeat === beat ? 'bg-neon-blue animate-pulse' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Metronome;
