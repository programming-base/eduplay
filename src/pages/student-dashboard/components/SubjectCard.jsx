import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubjectCard = ({ subject, className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('eduplay-language') || 'en';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleSubjectClick = () => {
    navigate('/subject-chapter-selection', { 
      state: { selectedSubject: subject?.name } 
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-success to-emerald-400';
    if (progress >= 60) return 'from-accent to-yellow-400';
    if (progress >= 40) return 'from-secondary to-blue-400';
    return 'from-primary to-indigo-400';
  };

  const getLevelBadgeColor = (level) => {
    if (level >= 10) return 'bg-gradient-to-r from-purple-500 to-pink-500';
    if (level >= 7) return 'bg-gradient-to-r from-success to-emerald-500';
    if (level >= 4) return 'bg-gradient-to-r from-accent to-yellow-500';
    return 'bg-gradient-to-r from-primary to-secondary';
  };

  return (
    <div className={`group cursor-pointer ${className}`} onClick={handleSubjectClick}>
      <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent to-warning rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Header */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${subject?.bgColor}`}>
              <Icon name={subject?.icon} size={24} color="white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {currentLanguage === 'en' ? subject?.name : subject?.nameEs}
              </h3>
              <p className="text-sm text-muted-foreground">
                {subject?.chaptersCompleted}/{subject?.totalChapters} {currentLanguage === 'en' ? 'chapters' : 'अध्याय'}
              </p>
            </div>
          </div>

          {/* Level Badge */}
          <div className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getLevelBadgeColor(subject?.level)}`}>
            {currentLanguage === 'en' ? 'Level' : 'स्तर'} {subject?.level}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              {currentLanguage === 'en' ? 'Progress' : 'प्रगति'}
            </span>
            <span className="text-sm font-bold text-primary">{subject?.progress}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getProgressColor(subject?.progress)} transition-all duration-500 rounded-full`}
              style={{ width: `${subject?.progress}%` }}
            />
          </div>
        </div>

        {/* XP and Streak */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-warning rounded-full flex items-center justify-center">
              <Icon name="Zap" size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{subject?.xpPoints} XP</p>
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'en' ? 'Available' : 'उपलब्ध'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-error to-red-400 rounded-full flex items-center justify-center">
              <Icon name="Flame" size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{subject?.streak}</p>
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'en' ? 'day streak' : 'दिनों की स्ट्रीक'}
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {subject?.badges?.slice(0, 3)?.map((badge, index) => (
              <div key={index} className="w-8 h-8 bg-gradient-to-r from-success to-emerald-400 rounded-full flex items-center justify-center">
                <Icon name={badge?.icon} size={14} color="white" />
              </div>
            ))}
            {subject?.badges?.length > 3 && (
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">+{subject?.badges?.length - 3}</span>
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right" iconSize={16}>
            {currentLanguage === 'en' ? 'Continue' : 'जारी रखें'}
          </Button>
        </div>

        {/* New Content Indicator */}
        {subject?.hasNewContent && (
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;