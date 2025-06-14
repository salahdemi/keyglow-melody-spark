
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PianoKeyboard from "./PianoKeyboard";
import Metronome from "./Metronome";
import { CirclePlay, Music } from "lucide-react";

interface FallingNote {
  id: string;
  note: string;
  position: number;
  startTime: number;
}

interface LearnModeProps {
  onBack: () => void;
}

const LearnMode = ({ onBack }: LearnModeProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fallingNotes, setFallingNotes] = useState<FallingNote[]>([]);
  const [score, setScore] = useState(0);
  const [currentSong] = useState('Twinkle Twinkle Little Star');
  const [highlightedKeys, setHighlightedKeys] = useState<string[]>([]);
  const [metronomeEnabled, setMetronomeEnabled] = useState(true);
  const [tempo, setTempo] = useState(120);

  // Simple song pattern - Twinkle Twinkle Little Star
  const songPattern = [
    'C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4',
    'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4'
  ];

  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  const spawnNote = useCallback((note: string, delay: number = 0) => {
    const noteId = `${note}-${Date.now()}-${Math.random()}`;
    const newNote: FallingNote = {
      id: noteId,
      note,
      position: 0,
      startTime: Date.now() + delay
    };
    
    setFallingNotes(prev => [...prev, newNote]);
    
    // Remove note after animation completes
    setTimeout(() => {
      setFallingNotes(prev => prev.filter(n => n.id !== noteId));
    }, 4000);
  }, []);

  const startSong = useCallback(() => {
    setIsPlaying(true);
    setScore(0);
    setCurrentNoteIndex(0);
    setFallingNotes([]);
    
    // Spawn notes with timing based on tempo
    const noteInterval = (60 / tempo) * 1000; // Convert BPM to milliseconds
    
    songPattern.forEach((note, index) => {
      setTimeout(() => {
        spawnNote(note);
        setHighlightedKeys([note]);
      }, index * noteInterval);
    });
    
    // Stop after song completes
    setTimeout(() => {
      setIsPlaying(false);
      setHighlightedKeys([]);
    }, songPattern.length * noteInterval + 2000);
  }, [spawnNote, tempo]);

  const handleKeyPress = useCallback((pressedNote: string) => {
    if (!isPlaying) return;
    
    const expectedNote = songPattern[currentNoteIndex];
    
    if (pressedNote === expectedNote) {
      setScore(prev => prev + 10);
      setCurrentNoteIndex(prev => prev + 1);
      console.log(`Correct! Score: ${score + 10}`);
      
      // Check if song is complete
      if (currentNoteIndex + 1 >= songPattern.length) {
        setIsPlaying(false);
        setHighlightedKeys([]);
        console.log('Song completed!');
      }
    } else {
      console.log(`Wrong note! Expected: ${expectedNote}, Got: ${pressedNote}`);
    }
  }, [isPlaying, currentNoteIndex, songPattern, score]);

  // Update falling notes animation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setFallingNotes(prev => 
        prev.map(note => ({
          ...note,
          position: Math.min(100, ((Date.now() - note.startTime) / 4000) * 100)
        }))
      );
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Falling Notes Animation */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {fallingNotes.map((note) => (
          <div
            key={note.id}
            className="absolute w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full shadow-lg animate-pulse"
            style={{
              left: `${50 + Math.sin(note.startTime) * 20}%`,
              top: `${note.position}%`,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)'
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {note.note.replace(/[0-9]/g, '')}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={onBack}
            variant="outline"
            className="glass-effect border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-slate-900"
          >
            ← Back to Menu
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Learn Mode
            </h1>
            <p className="text-gray-400">{currentSong}</p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-neon-blue">Score: {score}</div>
            <div className="text-sm text-gray-400">Note: {currentNoteIndex + 1}/{songPattern.length}</div>
          </div>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card className="glass-effect border-white/20 p-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={startSong}
                disabled={isPlaying}
                className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink"
              >
                <CirclePlay className="w-4 h-4 mr-2" />
                {isPlaying ? 'Playing...' : 'Start Song'}
              </Button>
              <div className="text-sm text-gray-400">
                Follow the falling notes!
              </div>
            </div>
          </Card>

          <Card className="glass-effect border-white/20 p-4">
            <Metronome 
              enabled={metronomeEnabled}
              tempo={tempo}
              onToggle={setMetronomeEnabled}
              onTempoChange={setTempo}
            />
          </Card>

          <Card className="glass-effect border-white/20 p-4">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-neon-purple" />
              <div>
                <div className="font-medium text-white">Learning Progress</div>
                <div className="text-sm text-gray-400">
                  {Math.round((currentNoteIndex / songPattern.length) * 100)}% Complete
                </div>
              </div>
            </div>
          </Card>
        </div>

        <PianoKeyboard 
          onKeyPress={handleKeyPress}
          highlightedKeys={highlightedKeys}
        />

        <div className="mt-6 text-center">
          <Card className="glass-effect border-white/20 p-4 max-w-2xl mx-auto">
            <p className="text-gray-300 mb-2">
              🎵 Watch the falling notes and tap the highlighted keys at the right moment!
            </p>
            <p className="text-sm text-gray-400">
              Tip: Use the metronome to keep perfect timing
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearnMode;
