
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LessonDetail from "./LessonDetail";
import { ArrowLeft, Lock, CheckCircle, Play, Star } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  isLocked: boolean;
  stars: number;
  duration: string;
  concepts: string[];
}

interface LessonsViewProps {
  onBack: () => void;
  userProgress: any;
  setUserProgress: (progress: any) => void;
}

const LessonsView = ({ onBack, userProgress, setUserProgress }: LessonsViewProps) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const lessons: Lesson[] = [
    // Beginner Lessons
    { id: 1, title: "Welcome to Piano", description: "Learn the basics: where to place your hands and how to sit", level: 'beginner', isCompleted: true, isLocked: false, stars: 3, duration: "5 min", concepts: ["Hand position", "Posture"] },
    { id: 2, title: "The Piano Keys", description: "Learn the names of white and black keys", level: 'beginner', isCompleted: true, isLocked: false, stars: 3, duration: "8 min", concepts: ["Key names", "Layout"] },
    { id: 3, title: "Playing Your First Note", description: "Press middle C and make your first sound!", level: 'beginner', isCompleted: true, isLocked: false, stars: 2, duration: "6 min", concepts: ["Middle C", "Touch"] },
    { id: 4, title: "Right Hand Notes", description: "Learn C-D-E with your right hand", level: 'beginner', isCompleted: false, isLocked: false, stars: 0, duration: "10 min", concepts: ["C-D-E", "Right hand"] },
    { id: 5, title: "Left Hand Notes", description: "Learn C-B-A with your left hand", level: 'beginner', isCompleted: false, isLocked: true, stars: 0, duration: "10 min", concepts: ["C-B-A", "Left hand"] },
    { id: 6, title: "Both Hands Together", description: "Coordinate both hands playing simple notes", level: 'beginner', isCompleted: false, isLocked: true, stars: 0, duration: "12 min", concepts: ["Coordination", "Both hands"] },
    { id: 7, title: "Simple Melody", description: "Play 'Twinkle Twinkle Little Star'", level: 'beginner', isCompleted: false, isLocked: true, stars: 0, duration: "15 min", concepts: ["Melody", "Song"] },
    { id: 8, title: "Basic Rhythm", description: "Learn quarter notes and timing", level: 'beginner', isCompleted: false, isLocked: true, stars: 0, duration: "12 min", concepts: ["Rhythm", "Timing"] },

    // Intermediate Lessons
    { id: 9, title: "Introduction to Chords", description: "Learn what chords are and how to play C major", level: 'intermediate', isCompleted: false, isLocked: true, stars: 0, duration: "15 min", concepts: ["Chords", "C major"] },
    { id: 10, title: "More Basic Chords", description: "Learn F major and G major chords", level: 'intermediate', isCompleted: false, isLocked: true, stars: 0, duration: "18 min", concepts: ["F major", "G major"] },
    { id: 11, title: "Chord Progressions", description: "Play simple chord progressions", level: 'intermediate', isCompleted: false, isLocked: true, stars: 0, duration: "20 min", concepts: ["Progressions", "Changes"] },
    { id: 12, title: "Scales", description: "Learn the C major scale", level: 'intermediate', isCompleted: false, isLocked: true, stars: 0, duration: "16 min", concepts: ["Scales", "Practice"] },

    // Advanced Lessons
    { id: 13, title: "Advanced Techniques", description: "Learn more complex playing techniques", level: 'advanced', isCompleted: false, isLocked: true, stars: 0, duration: "25 min", concepts: ["Techniques", "Advanced"] },
    { id: 14, title: "Jazz Basics", description: "Introduction to jazz piano", level: 'advanced', isCompleted: false, isLocked: true, stars: 0, duration: "30 min", concepts: ["Jazz", "Style"] },
  ];

  const currentLessons = lessons.filter(lesson => lesson.level === currentLevel);
  const levelProgress = (currentLessons.filter(l => l.isCompleted).length / currentLessons.length) * 100;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'neon-green';
      case 'intermediate': return 'neon-blue';
      case 'advanced': return 'neon-purple';
      default: return 'neon-blue';
    }
  };

  if (selectedLesson) {
    return (
      <LessonDetail 
        lesson={selectedLesson} 
        onBack={() => setSelectedLesson(null)}
        onComplete={() => {
          // Mark lesson as completed and update progress
          setUserProgress({
            ...userProgress,
            completedLessons: userProgress.completedLessons + 1,
            totalStars: userProgress.totalStars + 3
          });
          setSelectedLesson(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
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
            Piano Lessons
          </h1>
          <div className="text-right">
            <div className="text-sm text-gray-400">Your Level</div>
            <div className="text-lg font-bold text-white capitalize">{currentLevel}</div>
          </div>
        </div>

        {/* Level Selector */}
        <Card className="glass-effect border-white/20 p-4 mb-6">
          <div className="flex gap-2 mb-4">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <Button
                key={level}
                onClick={() => setCurrentLevel(level as any)}
                variant={currentLevel === level ? "default" : "outline"}
                className={`flex-1 ${currentLevel === level 
                  ? `bg-gradient-to-r from-${getLevelColor(level)} to-${getLevelColor(level)}/80 text-slate-900` 
                  : 'glass-effect border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Level Progress</span>
              <span className={`text-${getLevelColor(currentLevel)}`}>
                {currentLessons.filter(l => l.isCompleted).length}/{currentLessons.length} lessons
              </span>
            </div>
            <Progress value={levelProgress} className="h-2" />
          </div>
        </Card>

        {/* Lessons Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {currentLessons.map((lesson) => (
            <Card 
              key={lesson.id}
              className={`glass-effect p-6 transition-all duration-300 cursor-pointer ${
                lesson.isLocked 
                  ? 'border-gray-600 opacity-60' 
                  : lesson.isCompleted
                    ? 'border-neon-green/50 hover:border-neon-green'
                    : 'border-white/20 hover:border-neon-blue'
              }`}
              onClick={() => !lesson.isLocked && setSelectedLesson(lesson)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {lesson.isLocked ? (
                    <Lock className="w-6 h-6 text-gray-500" />
                  ) : lesson.isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-neon-green" />
                  ) : (
                    <Play className="w-6 h-6 text-neon-blue" />
                  )}
                  <div>
                    <h3 className="font-bold text-white text-lg">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.duration}</p>
                  </div>
                </div>
                {lesson.isCompleted && (
                  <div className="flex items-center gap-1">
                    {[...Array(lesson.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-neon-yellow fill-current" />
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-gray-300 mb-4">{lesson.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {lesson.concepts.map((concept, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="glass-effect border-white/20 p-4 mt-6">
          <p className="text-center text-gray-300 text-sm">
            💡 <strong>Tip:</strong> Complete lessons in order to unlock the next ones. Take your time and practice!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LessonsView;
