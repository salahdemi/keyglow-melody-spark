
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import LanguageSelection from "@/components/LanguageSelection";
import LessonsView from "@/components/LessonsView";
import PracticeMode from "@/components/PracticeMode";
import ProgressView from "@/components/ProgressView";
import { GraduationCap, Music, Award, Settings } from "lucide-react";

const Index = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'lessons' | 'practice' | 'progress' | 'settings'>('home');
  const [userProgress, setUserProgress] = useState({
    currentLevel: 'beginner',
    completedLessons: 3,
    totalLessons: 24,
    streakDays: 5,
    totalStars: 12
  });

  useEffect(() => {
    // Check if user has selected a language before
    const hasSelectedLanguage = localStorage.getItem('selectedLanguage');
    if (!hasSelectedLanguage) {
      setShowLanguageSelection(true);
    }
  }, []);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setShowLanguageSelection(false);
  };

  const handleChangeLanguage = () => {
    setShowLanguageSelection(true);
  };

  if (showLanguageSelection) {
    return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
  }

  if (currentView === 'lessons') {
    return <LessonsView onBack={() => setCurrentView('home')} userProgress={userProgress} setUserProgress={setUserProgress} />;
  }

  if (currentView === 'practice') {
    return <PracticeMode onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'progress') {
    return <ProgressView onBack={() => setCurrentView('home')} userProgress={userProgress} />;
  }

  if (currentView === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={() => setCurrentView('home')}
              variant="outline"
              className="glass-effect border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-slate-900"
            >
              ← {t('progress.back')}
            </Button>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <div></div>
          </div>

          <Card className="glass-effect border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Language Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Current Language</span>
                <span className="text-neon-blue capitalize">{language === 'en' ? 'English' : language === 'ar' ? 'العربية' : language === 'fr' ? 'Français' : 'Español'}</span>
              </div>
              <Button 
                onClick={handleChangeLanguage}
                className="w-full glass-effect border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-slate-900"
                variant="outline"
              >
                {t('language.change')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 animate-glow-pulse">
            <GraduationCap className="w-20 h-20 mx-auto text-neon-blue mb-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
              {t('home.title')}
            </h1>
            <p className="text-lg text-gray-300">
              {t('home.subtitle')}
            </p>
          </div>
          
          {/* Settings Button */}
          <div className="absolute top-4 right-4">
            <Button
              onClick={() => setCurrentView('settings')}
              variant="outline"
              size="icon"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="glass-effect border-neon-blue/30 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{t('home.progress')}</h3>
              <p className="text-gray-400">{t('home.level')}: {userProgress.currentLevel.charAt(0).toUpperCase() + userProgress.currentLevel.slice(1)}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-neon-yellow">⭐ {userProgress.totalStars}</div>
              <div className="text-sm text-gray-400">{userProgress.streakDays} {t('home.streak')} 🔥</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">{t('lessons.title')}</span>
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
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{t('home.learn')}</h2>
            <p className="text-gray-400 text-center mb-4">
              {t('home.lessons_subtitle')}
            </p>
            <div className="text-center">
              <div className="text-sm text-neon-blue font-medium">{t('home.next_lesson')} {userProgress.completedLessons + 1}</div>
              <div className="text-xs text-gray-500">{t('home.basic_chords')}</div>
            </div>
          </Card>

          {/* Practice */}
          <Card 
            className="glass-effect border-neon-purple/30 p-8 hover:border-neon-purple transition-all duration-300 cursor-pointer group"
            onClick={() => setCurrentView('practice')}
          >
            <Music className="w-16 h-16 text-neon-purple mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{t('home.practice')}</h2>
            <p className="text-gray-400 text-center mb-4">
              {t('home.practice_subtitle')}
            </p>
            <div className="text-center">
              <div className="text-sm text-neon-purple font-medium">{t('home.piano_keyboard')}</div>
              <div className="text-xs text-gray-500">{t('home.feedback_guidance')}</div>
            </div>
          </Card>

          {/* Progress */}
          <Card 
            className="glass-effect border-neon-pink/30 p-8 hover:border-neon-pink transition-all duration-300 cursor-pointer group"
            onClick={() => setCurrentView('progress')}
          >
            <Award className="w-16 h-16 text-neon-pink mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{t('home.progress_section')}</h2>
            <p className="text-gray-400 text-center mb-4">
              {t('home.progress_subtitle')}
            </p>
            <div className="text-center">
              <div className="text-sm text-neon-pink font-medium">{t('home.badges_stats')}</div>
              <div className="text-xs text-gray-500">{t('home.improving')}</div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-blue">{userProgress.completedLessons}</div>
            <div className="text-xs text-gray-400">{t('home.lessons_done')}</div>
          </Card>
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-green">{userProgress.streakDays}</div>
            <div className="text-xs text-gray-400">{t('home.day_streak')}</div>
          </Card>
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-yellow">{userProgress.totalStars}</div>
            <div className="text-xs text-gray-400">{t('home.stars_earned')}</div>
          </Card>
          <Card className="glass-effect border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-neon-purple">
              {Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}%
            </div>
            <div className="text-xs text-gray-400">{t('home.complete')}</div>
          </Card>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            🎹 "{t('home.quote')}" 🎹
          </p>
          <p className="text-xs text-gray-500">
            {t('home.practice_tip')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
