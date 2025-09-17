import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsSection = ({ recommendations, className = '' }) => {
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

  const handleRecommendationClick = (recommendation) => {
    if (recommendation?.type === 'subject') {
      navigate('/subject-chapter-selection', { 
        state: { selectedSubject: recommendation?.subject } 
      });
    } else if (recommendation?.type === 'game') {
      // Navigate to games section
      console.log('Navigate to game:', recommendation?.gameType);
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'practice': return 'BookOpen';
      case 'review': return 'RotateCcw';
      case 'challenge': return 'Target';
      case 'game': return 'Gamepad2';
      default: return 'Lightbulb';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'practice': return 'from-primary to-indigo-400';
      case 'review': return 'from-accent to-yellow-400';
      case 'challenge': return 'from-error to-red-400';
      case 'game': return 'from-success to-emerald-400';
      default: return 'from-secondary to-blue-400';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'bg-error text-white',
          text: currentLanguage === 'en' ? 'High Priority' : 'उच्च प्राथमिकता'
        };
      case 'medium':
        return {
          color: 'bg-accent text-white',
          text: currentLanguage === 'en' ? 'Medium Priority' : 'मध्यम प्राथमिकता'
        };
      case 'low':
        return {
          color: 'bg-success text-white',
          text: currentLanguage === 'en' ? 'Low Priority' : 'निम्न प्राथमिकता'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          text: currentLanguage === 'en' ? 'Suggested' : 'सुझावित'
        };
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-accent to-warning rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {currentLanguage === 'en' ? 'Recommended for You' : 'आपके लिए अनुशंसित'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en' ? 'Based on your performance' : 'आपके प्रदर्शन के आधार पर'}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((recommendation) => {
          const priorityBadge = getPriorityBadge(recommendation?.priority);
          
          return (
            <div 
              key={recommendation?.id}
              className="group cursor-pointer"
              onClick={() => handleRecommendationClick(recommendation)}
            >
              <div className="bg-muted/50 hover:bg-muted border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${getRecommendationColor(recommendation?.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={getRecommendationIcon(recommendation?.type)} size={20} color="white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {currentLanguage === 'en' ? recommendation?.title : recommendation?.titleEs}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityBadge?.color} flex-shrink-0 ml-2`}>
                        {priorityBadge?.text}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {currentLanguage === 'en' ? recommendation?.description : recommendation?.descriptionEs}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{recommendation?.estimatedTime} {currentLanguage === 'en' ? 'min' : 'min'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Zap" size={14} />
                          <span>{recommendation?.xpReward} XP</span>
                        </div>
                        {recommendation?.difficulty && (
                          <div className="flex items-center space-x-1">
                            <Icon name="BarChart3" size={14} />
                            <span>
                              {currentLanguage === 'en' ? recommendation?.difficulty : 
                                recommendation?.difficulty === 'Easy' ? 'आसान' :
                                recommendation?.difficulty === 'Medium' ? 'मध्यम' : 'कठिन'}
                            </span>
                          </div>
                        )}
                      </div>

                      <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right" iconSize={14}>
                        {currentLanguage === 'en' ? 'Start' : 'शुरू करें'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <Button variant="outline" iconName="Plus" iconPosition="left" iconSize={16}>
          {currentLanguage === 'en' ? 'View All Recommendations' : 'सभी अनुशंसाएँ देखें'}
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsSection;