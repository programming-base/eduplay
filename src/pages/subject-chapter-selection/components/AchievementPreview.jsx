import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementPreview = ({ subjectName, completedChapters, totalChapters }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const achievements = [
    {
      id: 'first_chapter',
      title: currentLanguage === 'en' ? 'First Steps' : 'Primeros Pasos',
      description: currentLanguage === 'en' ? 'Complete your first chapter' : 'Completa tu primer capítulo',
      icon: 'Play',
      requirement: 1,
      xpReward: 50,
      unlocked: completedChapters >= 1
    },
    {
      id: 'quarter_complete',
      title: currentLanguage === 'en' ? 'Getting Started' : 'Comenzando',
      description: currentLanguage === 'en' ? 'Complete 25% of chapters' : 'Completa el 25% de los capítulos',
      icon: 'TrendingUp',
      requirement: Math.ceil(totalChapters * 0.25),
      xpReward: 100,
      unlocked: completedChapters >= Math.ceil(totalChapters * 0.25)
    },
    {
      id: 'half_complete',
      title: currentLanguage === 'en' ? 'Halfway Hero' : 'Héroe a Medio Camino',
      description: currentLanguage === 'en' ? 'Complete 50% of chapters' : 'Completa el 50% de los capítulos',
      icon: 'Award',
      requirement: Math.ceil(totalChapters * 0.5),
      xpReward: 200,
      unlocked: completedChapters >= Math.ceil(totalChapters * 0.5)
    },
    {
      id: 'three_quarter_complete',
      title: currentLanguage === 'en' ? 'Almost There' : 'Casi Ahí',
      description: currentLanguage === 'en' ? 'Complete 75% of chapters' : 'Completa el 75% de los capítulos',
      icon: 'Target',
      requirement: Math.ceil(totalChapters * 0.75),
      xpReward: 300,
      unlocked: completedChapters >= Math.ceil(totalChapters * 0.75)
    },
    {
      id: 'subject_master',
      title: currentLanguage === 'en' ? `${subjectName} Master` : `Maestro de ${subjectName}`,
      description: currentLanguage === 'en' ? 'Complete all chapters' : 'Completa todos los capítulos',
      icon: 'Crown',
      requirement: totalChapters,
      xpReward: 500,
      unlocked: completedChapters >= totalChapters
    },
    {
      id: 'speed_learner',
      title: currentLanguage === 'en' ? 'Speed Learner' : 'Aprendiz Rápido',
      description: currentLanguage === 'en' ? 'Complete 3 chapters in one day' : 'Completa 3 capítulos en un día',
      icon: 'Zap',
      requirement: 3,
      xpReward: 150,
      unlocked: false // This would be based on daily progress tracking
    }
  ];

  const unlockedAchievements = achievements?.filter(a => a?.unlocked);
  const nextAchievement = achievements?.find(a => !a?.unlocked);

  const getAchievementColor = (achievement) => {
    if (achievement?.unlocked) {
      return 'from-yellow-400 to-yellow-600';
    }
    return 'from-gray-300 to-gray-400';
  };

  const getProgressToNext = () => {
    if (!nextAchievement) return 100;
    return Math.min((completedChapters / nextAchievement?.requirement) * 100, 100);
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
            <Icon name="Trophy" size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Achievements' : 'Logros'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {unlockedAchievements?.length}/{achievements?.length} {currentLanguage === 'en' ? 'unlocked' : 'desbloqueados'}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          {isExpanded 
            ? (currentLanguage === 'en' ? 'Show Less' : 'Mostrar Menos')
            : (currentLanguage === 'en' ? 'View All' : 'Ver Todos')
          }
        </Button>
      </div>
      {/* Achievement Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {currentLanguage === 'en' ? 'Achievement Progress' : 'Progreso de Logros'}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((unlockedAchievements?.length / achievements?.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
            style={{ width: `${(unlockedAchievements?.length / achievements?.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {achievements?.slice(0, isExpanded ? achievements?.length : 4)?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative p-3 rounded-lg border transition-all duration-200 ${
              achievement?.unlocked 
                ? 'bg-yellow-50 border-yellow-200 shadow-sm' 
                : 'bg-muted/50 border-border'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAchievementColor(achievement)} flex items-center justify-center shadow-sm`}>
                <Icon 
                  name={achievement?.icon} 
                  size={20} 
                  color="white"
                />
              </div>
              <div>
                <div className={`text-sm font-medium ${achievement?.unlocked ? 'text-yellow-800' : 'text-muted-foreground'}`}>
                  {achievement?.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {achievement?.xpReward} XP
                </div>
              </div>
              
              {achievement?.unlocked && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Next Achievement */}
      {nextAchievement && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name={nextAchievement?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {currentLanguage === 'en' ? 'Next Achievement' : 'Próximo Logro'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {nextAchievement?.title}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-primary">
                {nextAchievement?.xpReward} XP
              </div>
              <div className="text-xs text-muted-foreground">
                {completedChapters}/{nextAchievement?.requirement}
              </div>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{nextAchievement?.description}</span>
              <span>{Math.round(getProgressToNext())}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${getProgressToNext()}%` }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Total XP from Achievements */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-yellow-500" />
          <span className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ? 'Achievement XP:' : 'XP de Logros:'}
          </span>
        </div>
        <div className="text-sm font-bold text-yellow-600">
          {unlockedAchievements?.reduce((total, achievement) => total + achievement?.xpReward, 0)} XP
        </div>
      </div>
    </div>
  );
};

export default AchievementPreview;