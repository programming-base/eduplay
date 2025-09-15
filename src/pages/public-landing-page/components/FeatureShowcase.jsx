import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeatureShowcase = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const features = {
    en: [
      {
        id: 1,
        title: "Interactive Quizzes & Games",
        description: "Transform boring tests into exciting challenges with our gamified quiz system. Students earn points, unlock achievements, and compete with classmates.",
        icon: "Gamepad2",
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop",
        benefits: [
          "Multiple question types (MCQ, Short Answer, Descriptive)",
          "Real-time feedback and explanations",
          "Adaptive difficulty based on performance",
          "Collaborative team challenges"
        ]
      },
      {
        id: 2,
        title: "Progress Tracking & Analytics",
        description: "Comprehensive analytics dashboard for teachers and students to monitor learning progress, identify weak areas, and celebrate achievements.",
        icon: "BarChart3",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        benefits: [
          "Individual student performance analysis",
          "Class-wide progress visualization",
          "Weak concept identification",
          "PDF/Excel report generation"
        ]
      },
      {
        id: 3,
        title: "Gamification System",
        description: "Motivate students with XP points, achievement badges, leaderboards, and level progression that makes learning addictive and fun.",
        icon: "Trophy",
        image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop",
        benefits: [
          "XP points and leveling system",
          "Achievement badges and streaks",
          "School-wide and class leaderboards",
          "Personalized learning paths"
        ]
      },
      {
        id: 4,
        title: "Multilingual Support",
        description: "Break language barriers with comprehensive multilingual support including text-to-speech functionality for enhanced accessibility.",
        icon: "Globe",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        benefits: [
          "English and regional language support",
          "Text-to-speech for all content",
          "Localized interface elements",
          "Cultural adaptation features"
        ]
      }
    ],
    es: [
      {
        id: 1,
        title: "Cuestionarios y Juegos Interactivos",
        description: "Transforma las pruebas aburridas en desafíos emocionantes con nuestro sistema de cuestionarios gamificados. Los estudiantes ganan puntos, desbloquean logros y compiten con compañeros.",
        icon: "Gamepad2",
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop",
        benefits: [
          "Múltiples tipos de preguntas (Opción múltiple, Respuesta corta, Descriptiva)",
          "Retroalimentación en tiempo real y explicaciones",
          "Dificultad adaptativa basada en el rendimiento",
          "Desafíos colaborativos en equipo"
        ]
      },
      {
        id: 2,
        title: "Seguimiento de Progreso y Análisis",
        description: "Panel de análisis integral para maestros y estudiantes para monitorear el progreso de aprendizaje, identificar áreas débiles y celebrar logros.",
        icon: "BarChart3",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        benefits: [
          "Análisis de rendimiento individual del estudiante",
          "Visualización del progreso de toda la clase",
          "Identificación de conceptos débiles",
          "Generación de informes PDF/Excel"
        ]
      },
      {
        id: 3,
        title: "Sistema de Gamificación",
        description: "Motiva a los estudiantes con puntos XP, insignias de logros, tablas de clasificación y progresión de niveles que hace que el aprendizaje sea adictivo y divertido.",
        icon: "Trophy",
        image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop",
        benefits: [
          "Sistema de puntos XP y niveles",
          "Insignias de logros y rachas",
          "Tablas de clasificación escolares y de clase",
          "Rutas de aprendizaje personalizadas"
        ]
      },
      {
        id: 4,
        title: "Soporte Multiidioma",
        description: "Rompe las barreras del idioma con soporte multiidioma integral que incluye funcionalidad de texto a voz para mayor accesibilidad.",
        icon: "Globe",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        benefits: [
          "Soporte en inglés e idioma regional",
          "Texto a voz para todo el contenido",
          "Elementos de interfaz localizados",
          "Características de adaptación cultural"
        ]
      }
    ]
  };

  const content = {
    en: {
      title: "Powerful Features for Modern Learning",
      subtitle: "Discover how EduPlay transforms traditional education into an engaging, interactive experience"
    },
    es: {
      title: "Características Poderosas para el Aprendizaje Moderno",
      subtitle: "Descubre cómo EduPlay transforma la educación tradicional en una experiencia atractiva e interactiva"
    }
  };

  const currentContent = content?.[currentLanguage];
  const currentFeatures = features?.[currentLanguage];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % currentFeatures?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentFeatures?.length]);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {currentContent?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {currentFeatures?.map((feature, index) => (
            <button
              key={feature?.id}
              onClick={() => setActiveFeature(index)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeFeature === index
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={feature?.icon} size={20} />
              <span className="font-medium hidden sm:inline">{feature?.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name={currentFeatures?.[activeFeature]?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {currentFeatures?.[activeFeature]?.title}
                </h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {currentFeatures?.[activeFeature]?.description}
              </p>

              {/* Benefits List */}
              <div className="space-y-3">
                {currentFeatures?.[activeFeature]?.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="Check" size={14} className="text-success" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="flex space-x-2 pt-4">
                {currentFeatures?.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeFeature ? 'w-8 bg-primary' : 'w-2 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Feature Image */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 shadow-xl">
                <Image
                  src={currentFeatures?.[activeFeature]?.image}
                  alt={currentFeatures?.[activeFeature]?.title}
                  className="w-full h-80 lg:h-96 object-cover rounded-xl"
                />
                
                {/* Floating UI Elements */}
                <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-2 rounded-lg shadow-lg animate-bounce">
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} />
                    <span className="text-sm font-bold">+50 XP</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-3 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Trophy" size={16} />
                    <span className="text-sm font-bold">Achievement!</span>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards - Mobile */}
        <div className="lg:hidden mt-12 grid gap-6">
          {currentFeatures?.map((feature, index) => (
            <div
              key={feature?.id}
              className={`bg-card border border-border rounded-xl p-6 transition-all duration-200 ${
                activeFeature === index ? 'ring-2 ring-primary/20 shadow-lg' : 'shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name={feature?.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-lg mb-2">{feature?.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature?.description}
                  </p>
                  <div className="mt-3 space-y-2">
                    {feature?.benefits?.slice(0, 2)?.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={14} className="text-success shrink-0" />
                        <span className="text-xs text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;