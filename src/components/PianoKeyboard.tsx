
import { useState, useCallback, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import AudioEngine from "@/utils/AudioEngine";

interface PianoKeyboardProps {
  instrument?: string;
  onKeyPress?: (note: string) => void;
  highlightedKeys?: string[];
}

const PianoKeyboard = ({ instrument = 'piano', onKeyPress, highlightedKeys = [] }: PianoKeyboardProps) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const audioEngineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    audioEngineRef.current = new AudioEngine();
    return () => {
      audioEngineRef.current?.cleanup();
    };
  }, []);

  const notes = [
    { note: 'C4', type: 'white', position: 0 },
    { note: 'C#4', type: 'black', position: 0.7 },
    { note: 'D4', type: 'white', position: 1 },
    { note: 'D#4', type: 'black', position: 1.7 },
    { note: 'E4', type: 'white', position: 2 },
    { note: 'F4', type: 'white', position: 3 },
    { note: 'F#4', type: 'black', position: 3.7 },
    { note: 'G4', type: 'white', position: 4 },
    { note: 'G#4', type: 'black', position: 4.7 },
    { note: 'A4', type: 'white', position: 5 },
    { note: 'A#4', type: 'black', position: 5.7 },
    { note: 'B4', type: 'white', position: 6 },
    { note: 'C5', type: 'white', position: 7 },
    { note: 'C#5', type: 'black', position: 7.7 },
    { note: 'D5', type: 'white', position: 8 },
    { note: 'D#5', type: 'black', position: 8.7 },
    { note: 'E5', type: 'white', position: 9 },
    { note: 'F5', type: 'white', position: 10 },
    { note: 'F#5', type: 'black', position: 10.7 },
    { note: 'G5', type: 'white', position: 11 },
    { note: 'G#5', type: 'black', position: 11.7 },
    { note: 'A5', type: 'white', position: 12 },
    { note: 'A#5', type: 'black', position: 12.7 },
    { note: 'B5', type: 'white', position: 13 },
  ];

  const handleKeyPress = useCallback((note: string) => {
    console.log(`Playing note: ${note} with instrument: ${instrument}`);
    
    // Play sound
    audioEngineRef.current?.playNote(note, instrument);
    
    // Visual feedback
    setPressedKeys(prev => new Set(prev).add(note));
    setTimeout(() => {
      setPressedKeys(prev => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    }, 200);

    // Callback to parent
    onKeyPress?.(note);
  }, [instrument, onKeyPress]);

  const getKeyClasses = (note: string, type: string) => {
    const isPressed = pressedKeys.has(note);
    const isHighlighted = highlightedKeys.includes(note);
    
    let baseClasses = "absolute transition-all duration-150 rounded-b-lg border-2 cursor-pointer select-none ";
    
    if (type === 'white') {
      baseClasses += "bg-gradient-to-b from-white to-gray-100 border-gray-300 h-32 w-12 ";
      if (isPressed) {
        baseClasses += "key-active scale-95 ";
      } else if (isHighlighted) {
        baseClasses += "bg-gradient-to-b from-neon-blue to-neon-purple border-neon-blue animate-glow-pulse ";
      } else {
        baseClasses += "hover:from-gray-50 hover:to-gray-200 hover:shadow-lg ";
      }
    } else {
      baseClasses += "bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 h-20 w-8 z-10 ";
      if (isPressed) {
        baseClasses += "key-active scale-95 ";
      } else if (isHighlighted) {
        baseClasses += "bg-gradient-to-b from-neon-purple to-neon-pink border-neon-purple animate-glow-pulse ";
      } else {
        baseClasses += "hover:from-gray-700 hover:to-gray-800 hover:shadow-lg ";
      }
    }
    
    return baseClasses;
  };

  return (
    <Card className="glass-effect border-white/20 p-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Magic Piano Keyboard</h2>
        <p className="text-gray-400">Tap the keys to create beautiful music!</p>
      </div>
      
      <div className="relative mx-auto" style={{ width: '840px', height: '140px' }}>
        {notes.map(({ note, type, position }) => (
          <button
            key={note}
            className={getKeyClasses(note, type)}
            style={{
              left: `${position * 60}px`,
              transform: type === 'black' ? 'translateX(-50%)' : undefined
            }}
            onMouseDown={() => handleKeyPress(note)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleKeyPress(note);
            }}
          >
            <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium ${
              type === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {note.replace(/[0-9]/g, '')}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          🎹 Multi-touch supported • Choose different instruments above 🎹
        </p>
      </div>
    </Card>
  );
};

export default PianoKeyboard;
