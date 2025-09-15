import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AchievementGallery = ({ achievements, className = '' }) => {
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

  const getBadgeGradient = (type) => {
    switch (type) {
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'diamond': return 'from-blue-400 to-purple-600';
      default: return 'from-primary to-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'es-ES', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-success to-emerald-400 rounded-lg flex items-center justify-center">
            <Icon name="Award" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {currentLanguage === 'en' ? 'Achievement Gallery' : 'Galería de Logros'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {achievements?.filter(a => a?.earned)?.length}/{achievements?.length} {currentLanguage === 'en' ? 'unlocked' : 'desbloqueados'}
            </p>
          </div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          {currentLanguage === 'en' ? 'Recently Earned' : 'Ganados Recientemente'}
        </h4>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {achievements?.filter(achievement => achievement?.earned && achievement?.isRecent)?.slice(0, 5)?.map((achievement) => (
              <div key={achievement?.id} className="flex-shrink-0 group cursor-pointer">
                <div className={`w-16 h-16 bg-gradient-to-r ${getBadgeGradient(achievement?.type)} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={achievement?.icon} size={24} color="white" />
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground max-w-16 truncate">
                  {currentLanguage === 'en' ? achievement?.name : achievement?.nameEs}
                </p>
              </div>
            ))}
        </div>
      </div>
      {/* All Achievements Grid */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          {currentLanguage === 'en' ? 'All Achievements' : 'Todos los Logros'}
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {achievements?.map((achievement) => (
            <div key={achievement?.id} className="group cursor-pointer" title={currentLanguage === 'en' ? achievement?.description : achievement?.descriptionEs}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 ${
                achievement?.earned 
                  ? `bg-gradient-to-r ${getBadgeGradient(achievement?.type)}` 
                  : 'bg-muted border-2 border-dashed border-border'
              }`}>
                <Icon 
                  name={achievement?.icon} 
                  size={20} 
                  color={achievement?.earned ? "white" : "var(--color-muted-foreground)"} 
                />
              </div>
              {achievement?.earned && achievement?.earnedDate && (
                <p className="text-xs text-center mt-1 text-muted-foreground">
                  {formatDate(achievement?.earnedDate)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {currentLanguage === 'en' ? 'Collection Progress' : 'Progreso de Colección'}
          </span>
          <span className="text-sm font-bold text-primary">
            {Math.round((achievements?.filter(a => a?.earned)?.length / achievements?.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-success to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${(achievements?.filter(a => a?.earned)?.length / achievements?.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AchievementGallery;