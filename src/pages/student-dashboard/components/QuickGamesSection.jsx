import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickGamesSection = ({ games, className = '' }) => {
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

  const handleGameClick = (game) => {
    console.log('Starting game:', game?.type);
    // Navigate to game or show game modal
  };

  const getGameGradient = (type) => {
    switch (type) {
      case 'aptitude': return 'from-purple-500 to-pink-500';
      case 'vocabulary': return 'from-green-500 to-teal-500';
      case 'puzzle': return 'from-orange-500 to-red-500';
      case 'math': return 'from-blue-500 to-indigo-500';
      case 'memory': return 'from-yellow-500 to-orange-500';
      default: return 'from-primary to-secondary';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success/10';
      case 'Medium': return 'text-accent bg-accent/10';
      case 'Hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Icon name="Gamepad2" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {currentLanguage === 'en' ? 'Quick Games' : 'Juegos Rápidos'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en' ? 'Fun learning activities' : 'Actividades de aprendizaje divertidas'}
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left" iconSize={16}>
          {currentLanguage === 'en' ? 'View All' : 'Ver Todos'}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games?.map((game) => (
          <div 
            key={game?.id}
            className="group cursor-pointer"
            onClick={() => handleGameClick(game)}
          >
            <div className="bg-muted/30 hover:bg-muted/50 border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
              {/* Game Icon and Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${getGameGradient(game?.type)} rounded-lg flex items-center justify-center shadow-lg`}>
                  <Icon name={game?.icon} size={24} color="white" />
                </div>
                
                {game?.isNew && (
                  <span className="px-2 py-1 bg-error text-white text-xs font-medium rounded-full">
                    {currentLanguage === 'en' ? 'New' : 'Nuevo'}
                  </span>
                )}
              </div>

              {/* Game Title and Description */}
              <div className="mb-3">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {currentLanguage === 'en' ? game?.title : game?.titleEs}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {currentLanguage === 'en' ? game?.description : game?.descriptionEs}
                </p>
              </div>

              {/* Game Stats */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{game?.duration} {currentLanguage === 'en' ? 'min' : 'min'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={14} />
                    <span>{game?.xpReward} XP</span>
                  </div>
                </div>

                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game?.difficulty)}`}>
                  {currentLanguage === 'en' ? game?.difficulty : 
                    game?.difficulty === 'Easy' ? 'Fácil' :
                    game?.difficulty === 'Medium' ? 'Medio' : 'Difícil'}
                </span>
              </div>

              {/* Progress Bar (if played before) */}
              {game?.bestScore !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">
                      {currentLanguage === 'en' ? 'Best Score' : 'Mejor Puntuación'}
                    </span>
                    <span className="text-xs font-medium text-foreground">{game?.bestScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getGameGradient(game?.type)} transition-all duration-300 rounded-full`}
                      style={{ width: `${game?.bestScore}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Play Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                fullWidth
                iconName="Play" 
                iconPosition="left" 
                iconSize={16}
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                {game?.bestScore !== undefined 
                  ? (currentLanguage === 'en' ? 'Play Again' : 'Jugar de Nuevo')
                  : (currentLanguage === 'en' ? 'Play Now' : 'Jugar Ahora')
                }
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Game Banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Star" size={24} color="white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                {currentLanguage === 'en' ? 'Daily Challenge' : 'Desafío Diario'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'Complete today\'s challenge for bonus XP!' : '¡Completa el desafío de hoy para XP extra!'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-bold text-primary">+500 XP</p>
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'en' ? 'Bonus reward' : 'Recompensa extra'}
              </p>
            </div>
            <Button variant="default" size="sm" iconName="ArrowRight" iconPosition="right" iconSize={16}>
              {currentLanguage === 'en' ? 'Start' : 'Comenzar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGamesSection;