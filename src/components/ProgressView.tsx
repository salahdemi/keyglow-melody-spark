import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, Target, Clock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProgressViewProps {
  onBack: () => void;
  userProgress: any;
}

const ProgressView = ({ onBack, userProgress }: ProgressViewProps) => {
  const { t } = useLanguage();
  
  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", icon: "🎹", earned: true },
    { id: 2, title: "Note Master", description: "Learn all basic notes", icon: "🎵", earned: true },
    { id: 3, title: "Practice Makes Perfect", description: "Practice for 3 days in a row", icon: "🔥", earned: true },
    { id: 4, title: "Chord Beginner", description: "Learn your first chord", icon: "🎶", earned: false },
    { id: 5, title: "Song Player", description: "Play a complete song", icon: "🎤", earned: false },
    { id: 6, title: "Speed Demon", description: "Play a song at full tempo", icon: "⚡", earned: false },
    { id: 7, title: "Star Collector", description: "Earn 50 stars", icon: "⭐", earned: false },
    { id: 8, title: "Piano Prodigy", description: "Complete all beginner lessons", icon: "🏆", earned: false },
  ];

  const weeklyProgress = [
    { day: 'Mon', minutes: 15, completed: true },
    { day: 'Tue', minutes: 20, completed: true },
    { day: 'Wed', minutes: 12, completed: true },
    { day: 'Thu', minutes: 18, completed: true },
    { day: 'Fri', minutes: 10, completed: true },
    { day: 'Sat', minutes: 0, completed: false },
    { day: 'Sun', minutes: 0, completed: false },
  ];

  const skillProgress = [
    { skill: 'Note Reading', progress: 75, level: 'Intermediate' },
    { skill: 'Hand Coordination', progress: 45, level: 'Beginner' },
    { skill: 'Rhythm & Timing', progress: 30, level: 'Beginner' },
    { skill: 'Chord Playing', progress: 15, level: 'Beginner' },
  ];

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
            {t('progress.back')}
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            {t('progress.title')}
          </h1>
          <div className="text-right">
            <div className="text-sm text-gray-400">{t('home.level')}</div>
            <div className="text-lg font-bold text-white capitalize">{userProgress.currentLevel}</div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-effect border-neon-blue/30 p-4 text-center">
            <Star className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userProgress.totalStars}</div>
            <div className="text-sm text-gray-400">{t('progress.stars_earned')}</div>
          </Card>
          <Card className="glass-effect border-neon-green/30 p-4 text-center">
            <Target className="w-8 h-8 text-neon-green mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userProgress.completedLessons}</div>
            <div className="text-sm text-gray-400">{t('progress.lessons_done')}</div>
          </Card>
          <Card className="glass-effect border-neon-purple/30 p-4 text-center">
            <Clock className="w-8 h-8 text-neon-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userProgress.streakDays}</div>
            <div className="text-sm text-gray-400">{t('progress.day_streak')}</div>
          </Card>
          <Card className="glass-effect border-neon-pink/30 p-4 text-center">
            <TrendingUp className="w-8 h-8 text-neon-pink mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}%</div>
            <div className="text-sm text-gray-400">{t('progress.progress_percent')}</div>
          </Card>
        </div>

        {/* Weekly Practice */}
        <Card className="glass-effect border-white/20 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">{t('progress.this_week')}</h2>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-400 mb-2">{day.day}</div>
                <div 
                  className={`h-20 rounded-lg flex items-end justify-center p-2 ${
                    day.completed ? 'bg-gradient-to-t from-neon-green to-neon-blue' : 'bg-gray-700'
                  }`}
                >
                  {day.completed && (
                    <div className="text-white text-xs font-bold">{day.minutes}m</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-sm">
              Total this week: {weeklyProgress.reduce((sum, day) => sum + day.minutes, 0)} minutes
            </p>
          </div>
        </Card>

        {/* Skill Progress */}
        <Card className="glass-effect border-white/20 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">{t('progress.skill_development')}</h2>
          <div className="space-y-4">
            {skillProgress.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{skill.skill}</span>
                  <span className="text-sm text-gray-400">{skill.level}</span>
                </div>
                <Progress value={skill.progress} className="h-3" />
                <div className="text-right text-sm text-gray-500 mt-1">{skill.progress}%</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="glass-effect border-white/20 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">{t('progress.achievements')}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  achievement.earned 
                    ? 'bg-neon-yellow/10 border-neon-yellow/30' 
                    : 'bg-gray-800/50 border-gray-600/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-4xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold ${achievement.earned ? 'text-neon-yellow' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-300">{achievement.description}</p>
                    {achievement.earned && (
                      <div className="text-xs text-neon-green mt-1">✓ Completed</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Motivational Message */}
        <Card className="glass-effect border-white/20 p-6 mt-6 text-center">
          <Trophy className="w-12 h-12 text-neon-yellow mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{t('progress.keep_going')}</h3>
          <p className="text-gray-300 mb-4">
            {t('progress.doing_great')} {userProgress.completedLessons > 0 ? 
              `You've completed ${userProgress.completedLessons} lessons and earned ${userProgress.totalStars} stars.` :
              "Start your first lesson to begin your piano journey!"
            }
          </p>
          <p className="text-sm text-gray-400">
            💡 Tip: Practice a little bit every day to keep your streak going!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ProgressView;
