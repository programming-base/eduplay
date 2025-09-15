import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PerformancePanel = ({ studentData, className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

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

  const getXPProgressPercentage = () => {
    const currentLevelXP = studentData?.totalXP % 1000;
    return (currentLevelXP / 1000) * 100;
  };

  const getNextLevelXP = () => {
    return 1000 - (studentData?.totalXP % 1000);
  };

  return (
    <div className={`bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {currentLanguage === 'en' ? `Hi, ${studentData?.name}!` : `¡Hola, ${studentData?.name}!`}
          </h2>
          <p className="text-primary-foreground/80">
            {currentLanguage === 'en' ? 'Ready to learn today?' : '¿Listo para aprender hoy?'}
          </p>
        </div>
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="User" size={32} color="white" />
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total XP */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={20} color="white" />
            <span className="text-sm font-medium">
              {currentLanguage === 'en' ? 'Total XP' : 'XP Total'}
            </span>
          </div>
          <p className="text-2xl font-bold">{studentData?.totalXP?.toLocaleString()}</p>
        </div>

        {/* Current Level */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Trophy" size={20} color="white" />
            <span className="text-sm font-medium">
              {currentLanguage === 'en' ? 'Level' : 'Nivel'}
            </span>
          </div>
          <p className="text-2xl font-bold">{studentData?.currentLevel}</p>
        </div>

        {/* Badges Earned */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={20} color="white" />
            <span className="text-sm font-medium">
              {currentLanguage === 'en' ? 'Badges' : 'Insignias'}
            </span>
          </div>
          <p className="text-2xl font-bold">{studentData?.totalBadges}</p>
        </div>

        {/* Current Streak */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Flame" size={20} color="white" />
            <span className="text-sm font-medium">
              {currentLanguage === 'en' ? 'Streak' : 'Racha'}
            </span>
          </div>
          <p className="text-2xl font-bold">{studentData?.currentStreak}</p>
        </div>
      </div>
      {/* Level Progress */}
      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">
            {currentLanguage === 'en' ? 'Progress to Next Level' : 'Progreso al Siguiente Nivel'}
          </span>
          <span className="text-sm">
            {getNextLevelXP()} XP {currentLanguage === 'en' ? 'to go' : 'restantes'}
          </span>
        </div>
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-warning transition-all duration-500 rounded-full"
            style={{ width: `${getXPProgressPercentage()}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PerformancePanel;