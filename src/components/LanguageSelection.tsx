
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { Language } from "@/contexts/LanguageContext";

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void;
}

const LanguageSelection = ({ onLanguageSelect }: LanguageSelectionProps) => {
  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="glass-effect border-neon-blue/30 p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <Languages className="w-16 h-16 mx-auto text-neon-blue mb-4 animate-glow-pulse" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Select Your Language
          </h1>
          <p className="text-gray-400 text-sm">
            Choose your preferred language to continue
          </p>
        </div>

        <div className="space-y-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className="w-full h-16 text-lg font-medium glass-effect border-white/20 hover:border-neon-blue/50 hover:bg-neon-blue/10 transition-all duration-300"
              variant="outline"
            >
              <span className="text-2xl mr-3">{lang.flag}</span>
              <span className="text-white">{lang.name}</span>
            </Button>
          ))}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          You can change this later in settings
        </div>
      </Card>
    </div>
  );
};

export default LanguageSelection;
