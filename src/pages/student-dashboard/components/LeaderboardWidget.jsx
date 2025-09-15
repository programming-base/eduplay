import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeaderboardWidget = ({ leaderboardData, currentStudent, className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [viewType, setViewType] = useState('class');

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

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return 'Crown';
      case 2: return 'Medal';
      case 3: return 'Award';
      default: return 'User';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-600 to-amber-800';
      default: return 'bg-muted';
    }
  };

  const currentData = leaderboardData?.[viewType] || [];
  const topStudents = currentData?.slice(0, 5);

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Trophy" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {currentLanguage === 'en' ? 'Leaderboard' : 'Tabla de Posiciones'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {viewType === 'class' 
                ? (currentLanguage === 'en' ? 'Your class ranking' : 'Ranking de tu clase')
                : (currentLanguage === 'en' ? 'School-wide ranking' : 'Ranking escolar')
              }
            </p>
          </div>
        </div>
      </div>
      {/* View Toggle */}
      <div className="flex items-center space-x-2 mb-6">
        <Button
          variant={viewType === 'class' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewType('class')}
          iconName="Users"
          iconSize={16}
        >
          {currentLanguage === 'en' ? 'Class' : 'Clase'}
        </Button>
        <Button
          variant={viewType === 'school' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewType('school')}
          iconName="School"
          iconSize={16}
        >
          {currentLanguage === 'en' ? 'School' : 'Escuela'}
        </Button>
      </div>
      {/* Top 3 Podium */}
      <div className="flex items-end justify-center space-x-4 mb-6">
        {topStudents?.slice(0, 3)?.map((student, index) => {
          const actualRank = index + 1;
          const podiumOrder = [1, 0, 2]; // Second, First, Third
          const podiumIndex = podiumOrder?.indexOf(index);
          const heights = ['h-16', 'h-20', 'h-12'];
          
          return (
            <div key={student?.id} className={`flex flex-col items-center ${podiumIndex !== -1 ? 'order-' + podiumIndex : ''}`}>
              <div className={`w-12 h-12 ${getRankBadgeColor(actualRank)} rounded-full flex items-center justify-center mb-2 shadow-lg`}>
                <Icon name={getRankIcon(actualRank)} size={20} color="white" />
              </div>
              <div className={`w-16 ${heights?.[index]} bg-gradient-to-t ${getRankBadgeColor(actualRank)} rounded-t-lg flex items-end justify-center pb-2`}>
                <span className="text-white font-bold text-sm">{actualRank}</span>
              </div>
              <p className="text-xs font-medium text-foreground mt-2 text-center max-w-16 truncate">
                {student?.name}
              </p>
              <p className="text-xs text-muted-foreground">{student?.xp} XP</p>
            </div>
          );
        })}
      </div>
      {/* Detailed Rankings */}
      <div className="space-y-2">
        {topStudents?.map((student, index) => {
          const rank = index + 1;
          const isCurrentStudent = student?.id === currentStudent?.id;
          
          return (
            <div 
              key={student?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isCurrentStudent ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
              }`}
            >
              <div className={`w-8 h-8 ${getRankBadgeColor(rank)} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-sm">{rank}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`font-medium truncate ${isCurrentStudent ? 'text-primary' : 'text-foreground'}`}>
                    {student?.name} {isCurrentStudent && `(${currentLanguage === 'en' ? 'You' : 'Tú'})`}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Zap" size={14} />
                    <span className="font-medium">{student?.xp?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                  <span>{currentLanguage === 'en' ? 'Level' : 'Nivel'} {student?.level}</span>
                  <span>{student?.badges} {currentLanguage === 'en' ? 'badges' : 'insignias'}</span>
                  <span>{student?.streak} {currentLanguage === 'en' ? 'day streak' : 'días seguidos'}</span>
                </div>
              </div>
              {isCurrentStudent && (
                <div className="flex-shrink-0">
                  <Icon name="Star" size={16} className="text-primary" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Current Student Position (if not in top 5) */}
      {!topStudents?.find(s => s?.id === currentStudent?.id) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{currentStudent?.rank}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-primary truncate">
                  {currentStudent?.name} ({currentLanguage === 'en' ? 'You' : 'Tú'})
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Zap" size={14} />
                  <span className="font-medium">{currentStudent?.xp?.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                <span>{currentLanguage === 'en' ? 'Level' : 'Nivel'} {currentStudent?.level}</span>
                <span>{currentStudent?.badges} {currentLanguage === 'en' ? 'badges' : 'insignias'}</span>
                <span>{currentStudent?.streak} {currentLanguage === 'en' ? 'day streak' : 'días seguidos'}</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Icon name="Star" size={16} className="text-primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardWidget;