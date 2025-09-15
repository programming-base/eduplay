import React, { useState, useEffect } from 'react';
import ChapterCard from './ChapterCard';
import Icon from '../../../components/AppIcon';

const ChapterGrid = ({ 
  chapters, 
  filteredChapters, 
  activeFilter, 
  searchQuery, 
  isPracticeMode, 
  subjectName 
}) => {
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

  const isChapterLocked = (chapter) => {
    if (!chapter?.prerequisites || chapter?.prerequisites?.length === 0) {
      return false;
    }

    // Check if all prerequisites are completed
    return chapter?.prerequisites?.some(prereqId => {
      const prereqChapter = chapters?.find(ch => ch?.chapterNumber === prereqId);
      return !prereqChapter || prereqChapter?.status !== 'completed';
    });
  };

  const getEmptyStateMessage = () => {
    if (searchQuery) {
      return {
        icon: 'Search',
        title: currentLanguage === 'en' ? 'No chapters found' : 'No se encontraron capítulos',
        description: currentLanguage === 'en' 
          ? `No chapters match your search for "${searchQuery}"`
          : `No hay capítulos que coincidan con tu búsqueda de "${searchQuery}"`
      };
    }

    const messages = {
      'available': {
        icon: 'Play',
        title: currentLanguage === 'en' ? 'No available chapters' : 'No hay capítulos disponibles',
        description: currentLanguage === 'en' ?'Complete prerequisite chapters to unlock more content' :'Completa los capítulos prerrequisito para desbloquear más contenido'
      },
      'in-progress': {
        icon: 'Clock',
        title: currentLanguage === 'en' ? 'No chapters in progress' : 'No hay capítulos en progreso',
        description: currentLanguage === 'en' ?'Start a new chapter to see it here' :'Comienza un nuevo capítulo para verlo aquí'
      },
      'completed': {
        icon: 'CheckCircle',
        title: currentLanguage === 'en' ? 'No completed chapters' : 'No hay capítulos completados',
        description: currentLanguage === 'en' ?'Complete chapters to see your achievements' :'Completa capítulos para ver tus logros'
      },
      'locked': {
        icon: 'Lock',
        title: currentLanguage === 'en' ? 'No locked chapters' : 'No hay capítulos bloqueados',
        description: currentLanguage === 'en' ?'All chapters are available for you to start' :'Todos los capítulos están disponibles para comenzar'
      }
    };

    return messages?.[activeFilter] || {
      icon: 'BookOpen',
      title: currentLanguage === 'en' ? 'No chapters available' : 'No hay capítulos disponibles',
      description: currentLanguage === 'en' ?'Check back later for new content' :'Vuelve más tarde para ver nuevo contenido'
    };
  };

  if (filteredChapters?.length === 0) {
    const emptyState = getEmptyStateMessage();
    
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name={emptyState?.icon} size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {emptyState?.title}
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          {emptyState?.description}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {currentLanguage === 'en' 
            ? `Showing ${filteredChapters?.length} of ${chapters?.length} chapters`
            : `Mostrando ${filteredChapters?.length} de ${chapters?.length} capítulos`
          }
        </div>
        
        {isPracticeMode && (
          <div className="flex items-center space-x-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
            <Icon name="RotateCcw" size={16} />
            <span>
              {currentLanguage === 'en' ? 'Practice Mode Active' : 'Modo Práctica Activo'}
            </span>
          </div>
        )}
      </div>
      {/* Chapter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredChapters?.map((chapter) => (
          <ChapterCard
            key={chapter?.id}
            chapter={chapter}
            isLocked={isChapterLocked(chapter)}
            isPracticeMode={isPracticeMode}
            subjectName={subjectName}
          />
        ))}
      </div>
      {/* Learning Path Visualization for Mobile */}
      <div className="lg:hidden mt-8">
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Route" size={20} />
            <span>
              {currentLanguage === 'en' ? 'Learning Path' : 'Ruta de Aprendizaje'}
            </span>
          </h3>
          
          <div className="space-y-3">
            {chapters?.slice(0, 5)?.map((chapter, index) => (
              <div key={chapter?.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  chapter?.status === 'completed' 
                    ? 'bg-success text-success-foreground'
                    : chapter?.status === 'in-progress' ?'bg-warning text-warning-foreground'
                      : isChapterLocked(chapter)
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary text-primary-foreground'
                }`}>
                  {chapter?.chapterNumber}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {currentLanguage === 'en' ? chapter?.title : chapter?.titleEs}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {chapter?.estimatedTime} {currentLanguage === 'en' ? 'min' : 'min'} • {chapter?.xpReward} XP
                  </div>
                </div>
                
                <Icon 
                  name={
                    chapter?.status === 'completed' ? 'CheckCircle' :
                    chapter?.status === 'in-progress'? 'Clock' : isChapterLocked(chapter) ?'Lock' : 'Play'
                  }
                  size={16}
                  className={
                    chapter?.status === 'completed' ? 'text-success' :
                    chapter?.status === 'in-progress'? 'text-warning' : isChapterLocked(chapter) ?'text-muted-foreground' : 'text-primary'
                  }
                />
                
                {index < 4 && (
                  <div className="absolute left-4 mt-8 w-0.5 h-6 bg-border"></div>
                )}
              </div>
            ))}
            
            {chapters?.length > 5 && (
              <div className="text-center pt-2">
                <span className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' 
                    ? `+${chapters?.length - 5} more chapters`
                    : `+${chapters?.length - 5} capítulos más`
                  }
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterGrid;