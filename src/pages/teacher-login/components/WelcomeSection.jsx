import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
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

  const features = [
    {
      icon: 'Users',
      title: currentLanguage === 'en' ? 'Class Management' : 'Gestión de Clases',
      description: currentLanguage === 'en' ?'Organize students and track their progress' :'Organiza estudiantes y rastrea su progreso'
    },
    {
      icon: 'BarChart3',
      title: currentLanguage === 'en' ? 'Analytics Dashboard' : 'Panel de Análisis',
      description: currentLanguage === 'en' ?'View detailed performance insights' :'Ve información detallada del rendimiento'
    },
    {
      icon: 'Upload',
      title: currentLanguage === 'en' ? 'Content Upload' : 'Subida de Contenido',
      description: currentLanguage === 'en' ?'Upload syllabus and assignments easily' :'Sube plan de estudios y tareas fácilmente'
    },
    {
      icon: 'Award',
      title: currentLanguage === 'en' ? 'Badge System' : 'Sistema de Insignias',
      description: currentLanguage === 'en' ?'Award achievements to motivate students' :'Otorga logros para motivar estudiantes'
    }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-12 flex-col justify-center">
      <div className="max-w-lg">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {currentLanguage === 'en' ?'Welcome Back, Educator!' :'¡Bienvenido de vuelta, Educador!'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {currentLanguage === 'en' ?'Access your comprehensive teaching dashboard to manage classes, track student progress, and create engaging educational content.' :'Accede a tu panel integral de enseñanza para gestionar clases, rastrear el progreso de los estudiantes y crear contenido educativo atractivo.'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shrink-0">
                <Icon name={feature?.icon} size={24} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card/30 rounded-lg border border-border/30">
            <div className="text-2xl font-bold text-primary mb-1">500+</div>
            <div className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Teachers' : 'Maestros'}
            </div>
          </div>
          <div className="text-center p-4 bg-card/30 rounded-lg border border-border/30">
            <div className="text-2xl font-bold text-secondary mb-1">15K+</div>
            <div className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Students' : 'Estudiantes'}
            </div>
          </div>
          <div className="text-center p-4 bg-card/30 rounded-lg border border-border/30">
            <div className="text-2xl font-bold text-accent mb-1">98%</div>
            <div className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Satisfaction' : 'Satisfacción'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;