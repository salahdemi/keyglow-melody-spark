
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PianoKeyboard from "./PianoKeyboard";
import { ArrowLeft, Play, Pause, CheckCircle, Star } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  concepts: string[];
}

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
}

const LessonDetail = ({ lesson, onBack, onComplete }: LessonDetailProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedKeys, setHighlightedKeys] = useState<string[]>([]);
  const [userStars, setUserStars] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  // Sample lesson content based on lesson ID
  const getLessonSteps = () => {
    switch (lesson.id) {
      case 1:
        return [
          {
            title: "Welcome to Piano!",
            instruction: "Let's start your piano journey! First, let's learn proper posture.",
            explanation: "Sit up straight with your feet flat on the floor. Your hands should be curved as if holding a small ball.",
            highlightKeys: [],
            practiceTask: "No keys to press yet - just get comfortable!"
          },
          {
            title: "Hand Position",
            instruction: "Place your hands on the keyboard in the correct position.",
            explanation: "Your right hand thumb should be on middle C. Keep your wrists relaxed and fingers curved.",
            highlightKeys: ["C4"],
            practiceTask: "Find and gently rest your right thumb on the middle C key (highlighted in blue)."
          }
        ];
      case 4:
        return [
          {
            title: "Right Hand Notes: C",
            instruction: "Let's start with the note C using your right thumb.",
            explanation: "Middle C is your home base. Press it gently with your right thumb.",
            highlightKeys: ["C4"],
            practiceTask: "Press the highlighted C key 5 times with your right thumb."
          },
          {
            title: "Right Hand Notes: D",
            instruction: "Now let's learn the note D with your index finger.",
            explanation: "D is right next to C. Use your index finger (finger 2) to press it.",
            highlightKeys: ["D4"],
            practiceTask: "Press the highlighted D key 5 times with your index finger."
          },
          {
            title: "Right Hand Notes: E",
            instruction: "Finally, let's learn E with your middle finger.",
            explanation: "E is next to D. Use your middle finger (finger 3) to press it.",
            highlightKeys: ["E4"],
            practiceTask: "Press the highlighted E key 5 times with your middle finger."
          },
          {
            title: "Play C-D-E",
            instruction: "Now play all three notes in order: C-D-E",
            explanation: "Play slowly and deliberately. Thumb on C, index on D, middle finger on E.",
            highlightKeys: ["C4", "D4", "E4"],
            practiceTask: "Play C-D-E slowly, three times in a row."
          }
        ];
      default:
        return [
          {
            title: lesson.title,
            instruction: "This is a practice lesson.",
            explanation: "Follow the highlighted keys and practice playing them.",
            highlightKeys: ["C4", "D4", "E4"],
            practiceTask: "Practice the highlighted keys."
          }
        ];
    }
  };

  const steps = getLessonSteps();
  const currentStepData = steps[currentStep];

  const handleKeyPress = (note: string) => {
    if (currentStepData.highlightKeys.includes(note)) {
      // Correct key pressed
      console.log(`Correct! Played ${note}`);
      // Award points or mark progress
    }
  };

  const completeStep = () => {
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setHighlightedKeys(steps[currentStep + 1].highlightKeys);
    } else {
      // Lesson completed!
      setUserStars(3);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps[stepIndex - 1]) {
      setCurrentStep(stepIndex);
      setHighlightedKeys(steps[stepIndex].highlightKeys);
    }
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
            Back to Lessons
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              {lesson.title}
            </h1>
            <p className="text-gray-400">Step {currentStep + 1} of {steps.length}</p>
          </div>
          <div className="text-right">
            {userStars > 0 && (
              <div className="flex items-center gap-1">
                {[...Array(userStars)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-neon-yellow fill-current" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="glass-effect border-white/20 p-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => goToStep(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    index === currentStep
                      ? 'bg-neon-blue text-slate-900'
                      : completedSteps[index]
                        ? 'bg-neon-green text-slate-900'
                        : index < currentStep
                          ? 'bg-gray-600 text-white cursor-pointer hover:bg-gray-500'
                          : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {completedSteps[index] ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 ${completedSteps[index] ? 'bg-neon-green' : 'bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Lesson Content */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Instructions */}
          <Card className="glass-effect border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{currentStepData.title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neon-blue mb-2">What to do:</h3>
                <p className="text-gray-300">{currentStepData.instruction}</p>
              </div>
              <div>
                <h3 className="font-semibold text-neon-purple mb-2">How to do it:</h3>
                <p className="text-gray-300">{currentStepData.explanation}</p>
              </div>
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <h3 className="font-semibold text-neon-blue mb-2">🎯 Practice Task:</h3>
                <p className="text-white">{currentStepData.practiceTask}</p>
              </div>
            </div>
          </Card>

          {/* Progress & Actions */}
          <Card className="glass-effect border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Step Progress</span>
                <span className="text-neon-blue">{currentStep + 1}/{steps.length}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="space-y-2 mt-6">
                <Button
                  onClick={completeStep}
                  className="w-full bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple"
                >
                  {currentStep === steps.length - 1 ? 'Complete Lesson!' : 'Mark Step Complete'}
                </Button>
                
                {currentStep > 0 && (
                  <Button
                    onClick={() => goToStep(currentStep - 1)}
                    variant="outline"
                    className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
                  >
                    Previous Step
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Piano Practice */}
        <PianoKeyboard 
          onKeyPress={handleKeyPress}
          highlightedKeys={currentStepData.highlightKeys}
          instrument="piano"
        />

        {/* Success Animation */}
        {userStars > 0 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <Card className="glass-effect border-neon-yellow/50 p-8 text-center animate-scale-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">Lesson Complete!</h2>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(userStars)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-neon-yellow fill-current animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <p className="text-gray-300">Great job! You've earned {userStars} stars!</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
