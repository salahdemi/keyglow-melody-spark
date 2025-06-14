
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PianoKeyboard from "./PianoKeyboard";
import Metronome from "./Metronome";
import { ArrowLeft, Music, Volume2, Target, Clock } from "lucide-react";

interface PracticeModeProps {
  onBack: () => void;
}

const PracticeMode = ({ onBack }: PracticeModeProps) => {
  const [currentMode, setCurrentMode] = useState<'free' | 'guided' | 'feedback'>('free');
  const [selectedSong, setSelectedSong] = useState('twinkle');
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [practiceStats, setPracticeStats] = useState({
    correctNotes: 0,
    totalNotes: 0,
    accuracy: 0,
    streak: 0
  });

  const songs = [
    { id: 'twinkle', name: 'Twinkle Twinkle Little Star', difficulty: 'Beginner', notes: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4'] },
    { id: 'happy', name: 'Happy Birthday', difficulty: 'Beginner', notes: ['C4', 'C4', 'D4', 'C4', 'F4', 'E4'] },
    { id: 'mary', name: 'Mary Had a Little Lamb', difficulty: 'Beginner', notes: ['E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4'] },
  ];

  const handleKeyPress = (note: string) => {
    if (currentMode === 'feedback') {
      const currentSong = songs.find(s => s.id === selectedSong);
      if (currentSong && currentSong.notes.length > 0) {
        const expectedNote = currentSong.notes[practiceStats.totalNotes % currentSong.notes.length];
        const isCorrect = note === expectedNote;
        
        setPracticeStats(prev => ({
          correctNotes: prev.correctNotes + (isCorrect ? 1 : 0),
          totalNotes: prev.totalNotes + 1,
          accuracy: Math.round(((prev.correctNotes + (isCorrect ? 1 : 0)) / (prev.totalNotes + 1)) * 100),
          streak: isCorrect ? prev.streak + 1 : 0
        }));

        console.log(`${isCorrect ? 'Correct!' : 'Try again!'} Expected: ${expectedNote}, Played: ${note}`);
      }
    }
  };

  const getHighlightedKeys = () => {
    if (currentMode === 'guided' || currentMode === 'feedback') {
      const currentSong = songs.find(s => s.id === selectedSong);
      if (currentSong) {
        if (currentMode === 'guided') {
          return currentSong.notes;
        } else {
          // For feedback mode, highlight the next expected note
          const nextNoteIndex = practiceStats.totalNotes % currentSong.notes.length;
          return [currentSong.notes[nextNoteIndex]];
        }
      }
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={onBack}
            variant="outline"
            className="glass-effect border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Academy
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Practice Mode
          </h1>
          <div className="text-right">
            <div className="text-sm text-gray-400">Mode</div>
            <div className="text-lg font-bold text-white capitalize">{currentMode.replace('_', ' ')}</div>
          </div>
        </div>

        {/* Mode Selection */}
        <Card className="glass-effect border-white/20 p-4 mb-6">
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => setCurrentMode('free')}
              variant={currentMode === 'free' ? "default" : "outline"}
              className={`${currentMode === 'free' 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-slate-900' 
                : 'glass-effect border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Music className="w-4 h-4 mr-2" />
              Free Play
            </Button>
            <Button
              onClick={() => setCurrentMode('guided')}
              variant={currentMode === 'guided' ? "default" : "outline"}
              className={`${currentMode === 'guided' 
                ? 'bg-gradient-to-r from-neon-green to-neon-blue text-slate-900' 
                : 'glass-effect border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Target className="w-4 h-4 mr-2" />
              Guided Practice
            </Button>
            <Button
              onClick={() => setCurrentMode('feedback')}
              variant={currentMode === 'feedback' ? "default" : "outline"}
              className={`${currentMode === 'feedback' 
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-slate-900' 
                : 'glass-effect border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              With Feedback
            </Button>
          </div>
        </Card>

        {/* Practice Settings */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Song Selection (for guided/feedback modes) */}
          {(currentMode === 'guided' || currentMode === 'feedback') && (
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Choose a Song</h3>
              <div className="space-y-2">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setSelectedSong(song.id);
                      setPracticeStats({ correctNotes: 0, totalNotes: 0, accuracy: 0, streak: 0 });
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedSong === song.id
                        ? 'bg-neon-blue/20 border border-neon-blue text-white'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium">{song.name}</div>
                    <div className="text-sm text-gray-400">{song.difficulty}</div>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Practice Stats (for feedback mode) */}
          {currentMode === 'feedback' && (
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Practice Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-green">{practiceStats.accuracy}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue">{practiceStats.streak}</div>
                  <div className="text-sm text-gray-400">Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-yellow">{practiceStats.correctNotes}</div>
                  <div className="text-sm text-gray-400">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{practiceStats.totalNotes}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>
              <Button
                onClick={() => setPracticeStats({ correctNotes: 0, totalNotes: 0, accuracy: 0, streak: 0 })}
                variant="outline"
                className="w-full mt-4 glass-effect border-white/20 text-white hover:bg-white/10"
              >
                Reset Stats
              </Button>
            </Card>
          )}

          {/* Metronome & Controls */}
          <Card className="glass-effect border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Practice Tools</h3>
            <div className="space-y-4">
              <Metronome 
                enabled={metronomeEnabled}
                tempo={tempo}
                onToggle={setMetronomeEnabled}
                onTempoChange={setTempo}
              />
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Practice Tip: Start slow and gradually increase tempo!
                </div>
              </div>
            </div>
          </Card>

          {/* Mode Instructions */}
          <Card className="glass-effect border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">How to Practice</h3>
            {currentMode === 'free' && (
              <div className="text-gray-300">
                <p className="mb-2">🎹 <strong>Free Play Mode</strong></p>
                <p>Play any keys you want! Perfect for experimenting and creating your own music.</p>
              </div>
            )}
            {currentMode === 'guided' && (
              <div className="text-gray-300">
                <p className="mb-2">🎯 <strong>Guided Practice Mode</strong></p>
                <p>Follow the highlighted keys to learn songs. All the notes for the selected song will be highlighted.</p>
              </div>
            )}
            {currentMode === 'feedback' && (
              <div className="text-gray-300">
                <p className="mb-2">📊 <strong>Feedback Mode</strong></p>
                <p>Play the highlighted keys in order. The app will track your accuracy and give you feedback!</p>
              </div>
            )}
          </Card>
        </div>

        {/* Piano Keyboard */}
        <PianoKeyboard 
          onKeyPress={handleKeyPress}
          highlightedKeys={getHighlightedKeys()}
          instrument="piano"
        />

        {/* Quick Tips */}
        <Card className="glass-effect border-white/20 p-4 mt-6">
          <p className="text-center text-gray-300 text-sm">
            💡 <strong>Practice Tips:</strong> Practice regularly, start slow, and don't worry about mistakes - they help you learn!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PracticeMode;
