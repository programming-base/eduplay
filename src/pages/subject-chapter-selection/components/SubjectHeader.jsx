import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SubjectHeader = ({ subject, totalChapters, completedChapters, totalXP, currentXP }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const progressPercentage = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;
  const xpPercentage = totalXP > 0 ? (currentXP / totalXP) * 100 : 0;

  const getSubjectIcon = (subjectName) => {
    const iconMap = {
      'Mathematics': 'Calculator',
      'Science': 'Atom',
      'English': 'BookOpen',
      'History': 'Clock',
      'Geography': 'Globe',
      'Physics': 'Zap',
      'Chemistry': 'TestTube',
      'Biology': 'Leaf'
    };
    return iconMap?.[subjectName] || 'Book';
  };

  const getSubjectColor = (subjectName) => {
    const colorMap = {
      'Mathematics': 'from-blue-500 to-blue-600',
      'Science': 'from-green-500 to-green-600',
      'English': 'from-purple-500 to-purple-600',
      'History': 'from-amber-500 to-amber-600',
      'Geography': 'from-cyan-500 to-cyan-600',
      'Physics': 'from-yellow-500 to-yellow-600',
      'Chemistry': 'from-red-500 to-red-600',
      'Biology': 'from-emerald-500 to-emerald-600'
    };
    return colorMap?.[subjectName] || 'from-indigo-500 to-indigo-600';
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Subject Info */}
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${getSubjectColor(subject?.name)} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon name={getSubjectIcon(subject?.name)} size={32} color="white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{subject?.name}</h1>
            <p className="text-muted-foreground mt-1">
              {currentLanguage === 'en' ? subject?.description : subject?.descriptionEs}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="BookOpen" size={16} />
                <span>
                  {completedChapters}/{totalChapters} {currentLanguage === 'en' ? 'Chapters' : 'अध्याय'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>
                  {subject?.estimatedHours} {currentLanguage === 'en' ? 'hours' : 'घंटे'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {/* Chapter Progress */}
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{Math.round(progressPercentage)}%</div>
            <div className="text-sm text-muted-foreground mb-2">
              {currentLanguage === 'en' ? 'Progress' : 'प्रगति'}
            </div>
            <div className="w-20 h-2 bg-muted rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-accent transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* XP Progress */}
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{currentXP}</div>
            <div className="text-sm text-muted-foreground mb-2">
              {currentLanguage === 'en' ? 'XP Points' : 'XP अंक'}
            </div>
            <div className="w-20 h-2 bg-muted rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {currentLanguage === 'en' ? 'Overall Progress' : 'कुल प्रगति'}
          </span>
          <span className="text-sm text-muted-foreground">
            {completedChapters}/{totalChapters} {currentLanguage === 'en' ? 'completed' : 'पूर्ण'}
          </span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getSubjectColor(subject?.name)} transition-all duration-500`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader;