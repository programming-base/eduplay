import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
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

  const handleTrySampleCourse = () => {
    // Navigate to sample course without authentication
    navigate('/subject-chapter-selection');
  };

  const handleSchoolLogin = () => {
    navigate('/teacher-login');
  };

  const content = {
    en: {
      title: "Transform Learning into an Adventure",
      subtitle: "Gamified education platform that makes K-12 learning engaging through points, badges, and interactive challenges",
      description: "Join thousands of students who are already leveling up their education with EduPlay\'s innovative approach to classroom learning.",
      trySample: "Try Sample Course",
      schoolLogin: "School Login",
      features: [
        "Interactive Quizzes & Games",
        "Real-time Progress Tracking",
        "Achievement Badges & Rewards",
        "Multilingual Support"
      ]
    },
    es: {
      title: "Transforma el Aprendizaje en una Aventura",
      subtitle: "Plataforma educativa gamificada que hace el aprendizaje K-12 atractivo a través de puntos, insignias y desafíos interactivos",
      description: "Únete a miles de estudiantes que ya están mejorando su educación con el enfoque innovador de EduPlay para el aprendizaje en el aula.",
      trySample: "Probar Curso de Muestra",
      schoolLogin: "Acceso Escolar",
      features: [
        "Cuestionarios y Juegos Interactivos",
        "Seguimiento de Progreso en Tiempo Real",
        "Insignias y Recompensas de Logros",
        "Soporte Multiidioma"
      ]
    }
  };

  const currentContent = content?.[currentLanguage];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-accent rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-success rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {currentContent?.title}
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                {currentContent?.subtitle}
              </p>
              <p className="text-lg text-muted-foreground">
                {currentContent?.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {currentContent?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center shrink-0">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleTrySampleCourse}
                iconName="Play"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                {currentContent?.trySample}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSchoolLogin}
                iconName="School"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                {currentContent?.schoolLogin}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Students' : 'Estudiantes'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Schools' : 'Escuelas'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Satisfaction' : 'Satisfacción'}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop"
                alt="Students learning with EduPlay platform"
                className="w-full h-80 lg:h-96 object-cover rounded-2xl"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={20} />
                  <span className="font-bold">+100 XP</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={20} />
                  <span className="font-bold">Level Up!</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;