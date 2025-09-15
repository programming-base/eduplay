import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChapterCard = ({ chapter, isLocked, isPracticeMode, subjectName }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const getStatusIcon = () => {
    if (isLocked) return 'Lock';
    if (chapter?.status === 'completed') return 'CheckCircle';
    if (chapter?.status === 'in-progress') return 'Clock';
    return 'Play';
  };

  const getStatusColor = () => {
    if (isLocked) return 'text-muted-foreground';
    if (chapter?.status === 'completed') return 'text-success';
    if (chapter?.status === 'in-progress') return 'text-warning';
    return 'text-primary';
  };

  const getDifficultyColor = (difficulty) => {
    const colorMap = {
      'Easy': 'bg-green-100 text-green-800 border-green-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Hard': 'bg-red-100 text-red-800 border-red-200',
      'Fácil': 'bg-green-100 text-green-800 border-green-200',
      'Medio': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Difícil': 'bg-red-100 text-red-800 border-red-200'
    };
    return colorMap?.[difficulty] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleChapterClick = () => {
    if (isLocked) return;
    
    // Navigate to chapter content
    const chapterSlug = chapter?.title?.toLowerCase()?.replace(/\s+/g, '-');
    const subjectSlug = subjectName?.toLowerCase()?.replace(/\s+/g, '-');
    navigate(`/subject/${subjectSlug}/chapter/${chapterSlug}`);
  };

  const handlePreviewClick = (e) => {
    e?.stopPropagation();
    // Handle preview functionality
    console.log('Preview chapter:', chapter?.id);
  };

  return (
    <div 
      className={`bg-surface border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-200 ${
        isLocked 
          ? 'opacity-60 cursor-not-allowed' :'hover:shadow-md hover:border-primary/20 cursor-pointer'
      } ${chapter?.status === 'completed' && !isPracticeMode ? 'ring-2 ring-success/20' : ''}`}
      onClick={handleChapterClick}
    >
      {/* Chapter Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={chapter?.thumbnail}
          alt={currentLanguage === 'en' ? chapter?.title : chapter?.titleEs}
          className="w-full h-full object-cover"
        />
        
        {/* Status Overlay */}
        <div className="absolute top-3 left-3">
          <div className={`w-8 h-8 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center ${getStatusColor()}`}>
            <Icon name={getStatusIcon()} size={18} />
          </div>
        </div>

        {/* XP Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Icon name="Zap" size={12} />
            <span>{chapter?.xpReward} XP</span>
          </div>
        </div>

        {/* Progress Bar for In-Progress Chapters */}
        {chapter?.status === 'in-progress' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-warning transition-all duration-300"
              style={{ width: `${chapter?.progress || 0}%` }}
            />
          </div>
        )}

        {/* Completion Badge */}
        {chapter?.status === 'completed' && !isPracticeMode && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-success/90 backdrop-blur-sm text-success-foreground p-1 rounded-full">
              <Icon name="CheckCircle" size={16} />
            </div>
          </div>
        )}
      </div>
      {/* Chapter Content */}
      <div className="p-4">
        {/* Chapter Number and Title */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {currentLanguage === 'en' ? 'Chapter' : 'Capítulo'} {chapter?.chapterNumber}
            </span>
            <div className={`text-xs font-medium px-2 py-1 rounded-full border ${getDifficultyColor(currentLanguage === 'en' ? chapter?.difficulty : chapter?.difficultyEs)}`}>
              {currentLanguage === 'en' ? chapter?.difficulty : chapter?.difficultyEs}
            </div>
          </div>
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {currentLanguage === 'en' ? chapter?.title : chapter?.titleEs}
          </h3>
        </div>

        {/* Chapter Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {currentLanguage === 'en' ? chapter?.description : chapter?.descriptionEs}
        </p>

        {/* Chapter Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{chapter?.estimatedTime} {currentLanguage === 'en' ? 'min' : 'min'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>{chapter?.lessonCount} {currentLanguage === 'en' ? 'lessons' : 'lecciones'}</span>
            </div>
          </div>
          {chapter?.hasQuiz && (
            <div className="flex items-center space-x-1 text-accent">
              <Icon name="HelpCircle" size={14} />
              <span>{currentLanguage === 'en' ? 'Quiz' : 'Cuestionario'}</span>
            </div>
          )}
        </div>

        {/* Prerequisites */}
        {chapter?.prerequisites && chapter?.prerequisites?.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">
              {currentLanguage === 'en' ? 'Prerequisites:' : 'Prerrequisitos:'}
            </div>
            <div className="flex flex-wrap gap-1">
              {chapter?.prerequisites?.map((prereq, index) => (
                <span 
                  key={index}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                >
                  {currentLanguage === 'en' ? `Ch. ${prereq}` : `Cap. ${prereq}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {!isLocked ? (
            <>
              <Button
                variant={chapter?.status === 'completed' && isPracticeMode ? "outline" : "default"}
                size="sm"
                fullWidth
                iconName={chapter?.status === 'completed' && isPracticeMode ? "RotateCcw" : "Play"}
                iconPosition="left"
                iconSize={16}
              >
                {chapter?.status === 'completed' && isPracticeMode 
                  ? (currentLanguage === 'en' ? 'Practice' : 'Practicar')
                  : chapter?.status === 'completed' 
                    ? (currentLanguage === 'en' ? 'Review' : 'Revisar')
                    : chapter?.status === 'in-progress'
                      ? (currentLanguage === 'en' ? 'Continue' : 'Continuar')
                      : (currentLanguage === 'en' ? 'Start' : 'Comenzar')
                }
              </Button>
              
              {chapter?.hasPreview && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviewClick}
                  iconName="Eye"
                  iconSize={16}
                />
              )}
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              disabled
              iconName="Lock"
              iconPosition="left"
              iconSize={16}
            >
              {currentLanguage === 'en' ? 'Locked' : 'Bloqueado'}
            </Button>
          )}
        </div>

        {/* Unlock Requirements */}
        {isLocked && chapter?.unlockRequirements && (
          <div className="mt-3 p-2 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'To unlock:' : 'Para desbloquear:'}
            </div>
            <div className="text-xs text-foreground mt-1">
              {currentLanguage === 'en' ? chapter?.unlockRequirements : chapter?.unlockRequirementsEs}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterCard;