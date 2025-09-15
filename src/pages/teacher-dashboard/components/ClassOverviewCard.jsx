import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassOverviewCard = ({ classData, onViewDetails, onQuickAction }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-accent';
    if (percentage >= 40) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{classData?.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classData?.status)}`}>
              {currentLanguage === 'en' ? classData?.status : 
                classData?.status === 'active' ? 'Activo' : 
                classData?.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{classData?.subject}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                {classData?.totalStudents} {currentLanguage === 'en' ? 'Students' : 'Estudiantes'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} className="text-secondary" />
              <span className="text-sm text-foreground">
                {classData?.completedLessons}/{classData?.totalLessons} {currentLanguage === 'en' ? 'Lessons' : 'Lecciones'}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'Class Progress' : 'Progreso de Clase'}
              </span>
              <span className="text-sm font-medium text-foreground">{classData?.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${getProgressColor(classData?.progress)}`}
                style={{ width: `${classData?.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{currentLanguage === 'en' ? 'Last activity' : 'Última actividad'}: {classData?.lastActivity}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">+{classData?.weeklyGrowth}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(classData?.id)}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            {currentLanguage === 'en' ? 'View Details' : 'Ver Detalles'}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onQuickAction('quiz', classData?.id)}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            {currentLanguage === 'en' ? 'Create Quiz' : 'Crear Quiz'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassOverviewCard;