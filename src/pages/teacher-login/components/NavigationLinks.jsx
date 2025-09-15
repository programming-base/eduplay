import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const NavigationLinks = () => {
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

  const navigationOptions = [
    {
      path: '/public-landing-page',
      label: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio',
      icon: 'Home',
      variant: 'ghost'
    },
    {
      path: '/student-login',
      label: currentLanguage === 'en' ? 'Student Login' : 'Acceso de Estudiante',
      icon: 'BookOpen',
      variant: 'outline'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {navigationOptions?.map((option) => (
          <Button
            key={option?.path}
            variant={option?.variant}
            size="default"
            onClick={() => handleNavigation(option?.path)}
            iconName={option?.icon}
            iconPosition="left"
            iconSize={18}
            className="flex-1 justify-center"
          >
            {option?.label}
          </Button>
        ))}
      </div>
      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {currentLanguage === 'en' ?'New to EduPlay? Contact your school administrator.' :'¿Nuevo en EduPlay? Contacta al administrador de tu escuela.'}
        </p>
      </div>
    </div>
  );
};

export default NavigationLinks;