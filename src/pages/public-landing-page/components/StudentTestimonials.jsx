import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StudentTestimonials = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const testimonials = {
    en: [
      {
        id: 1,
        name: "Sarah Johnson",
        age: 14,
        school: "Riverside High School",
        grade: "9th Grade",
        avatar: "https://img.freepik.com/premium-photo/photo-young-indian-woman-her-mid-20s-college-student-holding-book-her-chest_878783-7115.jpg?w=150&h=150&fit=crop&crop=face",
        quote: "EduPlay made math so much fun! I never thought I'd enjoy solving equations, but the game elements and badges keep me motivated. My grades improved from C to A in just one semester!",
        subject: "Mathematics",
        improvement: "+2 Grade Levels",
        badges: 15
      },
      {
        id: 2,
        name: "Miguel Rodriguez",
        age: 12,
        school: "Lincoln Middle School",
        grade: "7th Grade",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        quote: "The science experiments in EduPlay are amazing! I can do virtual labs and see how things work. It's like having a real laboratory at home. My friends and I compete to see who can get more points.",
        subject: "Science",
        improvement: "95% Quiz Average",
        badges: 12
      },
      {
        id: 3,
        name: "Emily Chen",
        age: 16,
        school: "Washington Academy",
        grade: "11th Grade",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        quote: "Learning English literature became so engaging with EduPlay's interactive stories and character analysis games. The text-to-speech feature helps me understand difficult passages better.",
        subject: "English Literature",
        improvement: "Honor Roll",
        badges: 18
      },
      {
        id: 4,
        name: "David Kim",
        age: 13,
        school: "Jefferson Elementary",
        grade: "8th Grade",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        quote: "History was my least favorite subject until I started using EduPlay. The timeline games and historical character quests make learning about the past feel like an adventure!",
        subject: "History",
        improvement: "From D to B+",
        badges: 10
      }
    ],
    es: [
      {
        id: 1,
        name: "Sarah Johnson",
        age: 14,
        school: "Escuela Secundaria Riverside",
        grade: "9° Grado",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        quote: "¡EduPlay hizo que las matemáticas fueran muy divertidas! Nunca pensé que disfrutaría resolviendo ecuaciones, pero los elementos del juego y las insignias me mantienen motivada. ¡Mis calificaciones mejoraron de C a A en solo un semestre!",
        subject: "Matemáticas",
        improvement: "+2 Niveles de Grado",
        badges: 15
      },
      {
        id: 2,
        name: "Miguel Rodriguez",
        age: 12,
        school: "Escuela Secundaria Lincoln",
        grade: "7° Grado",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        quote: "¡Los experimentos de ciencias en EduPlay son increíbles! Puedo hacer laboratorios virtuales y ver cómo funcionan las cosas. Es como tener un laboratorio real en casa. Mis amigos y yo competimos para ver quién puede obtener más puntos.",
        subject: "Ciencias",
        improvement: "95% Promedio de Exámenes",
        badges: 12
      },
      {
        id: 3,
        name: "Emily Chen",
        age: 16,
        school: "Academia Washington",
        grade: "11° Grado",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        quote: "Aprender literatura inglesa se volvió muy atractivo con las historias interactivas y los juegos de análisis de personajes de EduPlay. La función de texto a voz me ayuda a entender mejor los pasajes difíciles.",
        subject: "Literatura Inglesa",
        improvement: "Cuadro de Honor",
        badges: 18
      },
      {
        id: 4,
        name: "David Kim",
        age: 13,
        school: "Escuela Primaria Jefferson",
        grade: "8° Grado",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        quote: "La historia era mi materia menos favorita hasta que comencé a usar EduPlay. ¡Los juegos de línea de tiempo y las misiones de personajes históricos hacen que aprender sobre el pasado se sienta como una aventura!",
        subject: "Historia",
        improvement: "De D a B+",
        badges: 10
      }
    ]
  };

  const content = {
    en: {
      title: "What Students Say",
      subtitle: "Real stories from students who transformed their learning journey",
      readMore: "Read More",
      studentVoice: "Student Voice"
    },
    es: {
      title: "Lo Que Dicen Los Estudiantes",
      subtitle: "Historias reales de estudiantes que transformaron su viaje de aprendizaje",
      readMore: "Leer Más",
      studentVoice: "Voz Estudiantil"
    }
  };

  const currentContent = content?.[currentLanguage];
  const currentTestimonials = testimonials?.[currentLanguage];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % currentTestimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTestimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % currentTestimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + currentTestimonials?.length) % currentTestimonials?.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Icon name="MessageCircle" size={20} />
            <span className="font-medium">{currentContent?.studentVoice}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {currentContent?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-lg">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
            >
              <Icon name="ChevronLeft" size={20} className="text-primary" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
            >
              <Icon name="ChevronRight" size={20} className="text-primary" />
            </button>

            {/* Testimonial Content */}
            <div className="text-center space-y-6">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Quote" size={32} className="text-primary" />
              </div>

              {/* Quote */}
              <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed font-medium">
                "{currentTestimonials?.[currentTestimonial]?.quote}"
              </blockquote>

              {/* Student Info */}
              <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
                {/* Avatar and Basic Info */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={currentTestimonials?.[currentTestimonial]?.avatar}
                    alt={currentTestimonials?.[currentTestimonial]?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-foreground text-lg">
                      {currentTestimonials?.[currentTestimonial]?.name}
                    </h4>
                    <p className="text-muted-foreground">
                      {currentTestimonials?.[currentTestimonial]?.grade} • {currentTestimonials?.[currentTestimonial]?.school}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="TrendingUp" size={20} className="text-success" />
                    </div>
                    <div className="text-sm font-medium text-success">
                      {currentTestimonials?.[currentTestimonial]?.improvement}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="Award" size={20} className="text-accent" />
                    </div>
                    <div className="text-sm font-medium text-accent">
                      {currentTestimonials?.[currentTestimonial]?.badges} {currentLanguage === 'en' ? 'Badges' : 'Insignias'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon name="BookOpen" size={20} className="text-secondary" />
                    </div>
                    <div className="text-sm font-medium text-secondary">
                      {currentTestimonials?.[currentTestimonial]?.subject}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {currentTestimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid - Mobile */}
        <div className="lg:hidden mt-12 grid gap-6">
          {currentTestimonials?.slice(0, 2)?.map((testimonial, index) => (
            <div
              key={testimonial?.id}
              className="bg-card border border-border rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start space-x-4">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{testimonial?.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial?.grade}</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    "{testimonial?.quote?.substring(0, 120)}..."
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Award" size={14} className="text-accent" />
                      <span className="text-xs text-accent">{testimonial?.badges}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={14} className="text-success" />
                      <span className="text-xs text-success">{testimonial?.improvement}</span>
                    </div>
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

export default StudentTestimonials;