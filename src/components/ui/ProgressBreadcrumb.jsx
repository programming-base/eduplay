import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ProgressBreadcrumb = ({ currentSubject = '', currentChapter = '', showBackButton = true }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getBreadcrumbItems = () => {
    const items = [
      {
        label: currentLanguage === 'en' ? 'Dashboard' : 'Panel',
        path: '/student-dashboard',
        icon: 'Home'
      }
    ];

    if (location?.pathname === '/subject-chapter-selection' || currentSubject) {
      items?.push({
        label: currentLanguage === 'en' ? 'Subjects' : 'Materias',
        path: '/subject-chapter-selection',
        icon: 'BookOpen'
      });
    }

    if (currentSubject) {
      items?.push({
        label: currentSubject,
        path: `/subject/${currentSubject?.toLowerCase()?.replace(/\s+/g, '-')}`,
        icon: 'Book'
      });
    }

    if (currentChapter) {
      items?.push({
        label: currentChapter,
        path: `/subject/${currentSubject?.toLowerCase()?.replace(/\s+/g, '-')}/chapter/${currentChapter?.toLowerCase()?.replace(/\s+/g, '-')}`,
        icon: 'FileText',
        isActive: true
      });
    }

    return items;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBackNavigation = () => {
    if (currentChapter && currentSubject) {
      navigate(`/subject/${currentSubject?.toLowerCase()?.replace(/\s+/g, '-')}`);
    } else if (currentSubject) {
      navigate('/');
    } else {
      navigate('/student-dashboard');
    }
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (location?.pathname === '/student-dashboard') {
    return null;
  }

  return (
    <div className="bg-surface border-b border-border px-4 lg:px-6 py-3">
      <div className="flex items-center space-x-4">
        {/* Back Button */}
        {showBackButton && breadcrumbItems?.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackNavigation}
            iconName="ArrowLeft"
            iconSize={18}
            className="shrink-0"
          >
            <span className="hidden sm:inline ml-1">
              {currentLanguage === 'en' ? 'Back' : 'Atrás'}
            </span>
          </Button>
        )}

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 overflow-x-auto scrollbar-hide min-w-0">
          {breadcrumbItems?.map((item, index) => (
            <div key={item?.path} className="flex items-center space-x-2 shrink-0">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground shrink-0" 
                />
              )}
              
              <button
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-2 py-1 rounded-md transition-colors duration-150 ${
                  item?.isActive 
                    ? 'bg-primary/10 text-primary cursor-default' :'hover:bg-muted text-foreground'
                } ${index === 0 ? 'text-muted-foreground' : ''}`}
                disabled={item?.isActive}
              >
                <Icon name={item?.icon} size={16} className="shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {item?.label}
                </span>
              </button>
            </div>
          ))}
        </nav>

        {/* Progress Indicator */}
        {currentSubject && currentChapter && (
          <div className="hidden lg:flex items-center space-x-2 ml-auto">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>
                {currentLanguage === 'en' ? 'Chapter Progress' : 'Progreso del Capítulo'}
              </span>
            </div>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-accent transition-all duration-300"
                style={{ width: '65%' }}
              />
            </div>
            <span className="text-sm font-medium text-success">65%</span>
          </div>
        )}
      </div>
      {/* Mobile Progress Indicator */}
      {currentSubject && currentChapter && (
        <div className="lg:hidden mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>
              {currentLanguage === 'en' ? 'Progress' : 'Progreso'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-accent transition-all duration-300"
                style={{ width: '65%' }}
              />
            </div>
            <span className="text-sm font-medium text-success">65%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBreadcrumb;