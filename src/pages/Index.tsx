
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LessonsView from "@/components/LessonsView";
import PracticeMode from "@/components/PracticeMode";
import ProgressView from "@/components/ProgressView";
import { GraduationCap, Music, Award, ArrowLeft } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'lessons' | 'practice' | 'progress'>('home');
  const [userProgress, setUserProgress] = useState({
    currentLevel: 'beginner',
    completedLessons: 3,
    totalLessons: 24,
    streakDays: 5,
    totalStars: 12
  });

  if (currentView === 'lessons') {
    return <LessonsView onBack={() => setCurrentView('home')} userProgress={userProgress} setUserProgress={setUserProgress} />;
  }

  if (currentView === 'practice') {
    return <PracticeMode onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'progress') {
    return <ProgressView onBack={() => setCurrentView('home')} userProgress={userProgress} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 animate-glow-pulse">
            <GraduationCap className="w-20 h-20 mx-auto text-neon-blue mb-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
              Piano Academy
            </h1>
            <p className="text-lg text-gray-300">
              Learn piano step by step • From beginner to expert
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="glass-effect border-neon-blue/30 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Your Progress</h3>
              <p className="text-gray-400">Level: {userProgress.currentLevel.charAt(0).toUpperCase() + userProgress.currentLevel.slice(1)}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-neon-yellow">⭐ {userProgress.totalStars}</div>
              <div className="text-sm text-gray-400">{userProgress.streakDays} day streak 🔥</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Lessons Completed</span>
              <span className="text-neon-blue">{userProgress.completedLessons}/{userProgress.totalLessons}</span>
            </div>
            <Progress 
              value={(userProgress.completedLessons / userProgress.totalLessons) * 100} 
              className="h-3"
            />
          </div>
        </Card>

        {/* Main Navigation */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Lessons */}
          <Card 
            className="glass-effect border-neon-blue/30 p-8 hover:border-neon-blue transition-all duration-300 cursor-pointer group" 
            onClick={() => setCurrentView('lessons')}
          >
            <GraduationCap className="w-16 h-16 text-neon-blue mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Learn</h2>
            <p className="text-gray-400 text-center mb-4">
              Step-by-step lessons from basics to advanced
            </p>
            <div className="text-center">
              <div className="text-sm text-neon-blue font-medium">Next: Lesson {userProgress.completedLessons + 1}</div>
              <div className="text-xs text-gray-500">Basic Chords</div>
            </div>
          </Card>

          {/* Practice */}
          <Card 
            className="glass-effect border-neon-purple/30 p-8 hover:border-neon-purple transition-all duration-300 cursor-pointer group"
            onClick={() => setCurrentView('practice')}
          >
            <Music className="w-16 h-16 text-neon-purple mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Practice</h2>
            <p className="text-gray-400 text-center mb-4">
              Free play with your virtual piano keyboard
            </p>
            <div className="text-center">
              <div className="text-sm text-neon-purple font-medium">Piano Keyboard</div>
              <div className="text-xs text-gray-500">With feedback & guidance</div>
            </div>
          </Card>

          {/* Progress */}
          <Card 
            className="glass-effect border-neon-pink/30 p-8 hover:border-neon-pink transition-all duration-300 cursor-pointer group"
            onClick={() => setCurrentView('progress')}
          >
            <Award className="w-16 h-16 text-neon-pink mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Progress</h2>
            <p className="text-gray-400 text-center mb-4">
              Track your achievements and growth
            </p>
            <div className="text-center">
              <div className="text-sm text-neon-pink font-medium">Badges & Stats</div>
              <div className="text-xs text-gray-500">See how you're improving</div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-blue">{userProgress.completedLessons}</div>
            <div className="text-xs text-gray-400">Lessons Done</div>
          </Card>
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-green">{userProgress.streakDays}</div>
            <div className="text-xs text-gray-400">Day Streak</div>
          </Card>
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-yellow">{userProgress.totalStars}</div>
            <div className="text-xs text-gray-400">Stars Earned</div>
          </Card>
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-purple">
              {Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}%
            </div>
            <div className="text-xs text-gray-400">Complete</div>
          </Card>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            🎹 "Every expert was once a beginner" 🎹
          </p>
          <p className="text-xs text-gray-500">
            Practice 10 minutes daily to maintain your streak!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
