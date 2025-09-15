import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressBreadcrumb from '../../components/ui/ProgressBreadcrumb';
import SubjectHeader from './components/SubjectHeader';
import ChapterFilters from './components/ChapterFilters';
import ChapterGrid from './components/ChapterGrid';
import AchievementPreview from './components/AchievementPreview';

const SubjectChapterSelection = () => {
  const { subjectId } = useParams();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceMode, setPracticeMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check authentication status
    const authData = localStorage.getItem('eduplay-auth');
    const savedUserRole = localStorage.getItem('eduplay-user-role');
    
    if (authData && savedUserRole) {
      try {
        const parsedAuth = JSON.parse(authData);
        if (parsedAuth?.token && parsedAuth?.expiresAt > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(savedUserRole);
          setUserName(parsedAuth?.user?.name || '');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    }

    // Load language preference
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Mock subject data
  const mockSubject = {
    id: 'mathematics',
    name: 'Mathematics',
    nameEs: 'Matemáticas',
    description: 'Master fundamental mathematical concepts and problem-solving skills',
    descriptionEs: 'Domina conceptos matemáticos fundamentales y habilidades de resolución de problemas',
    estimatedHours: 45,
    totalChapters: 12,
    completedChapters: 4,
    totalXP: 2400,
    currentXP: 850
  };

  // Mock chapters data
  const mockChapters = [
    {
      id: 'ch1',
      chapterNumber: 1,
      title: 'Introduction to Numbers',
      titleEs: 'Introducción a los Números',
      description: 'Learn about natural numbers, integers, and basic operations',
      descriptionEs: 'Aprende sobre números naturales, enteros y operaciones básicas',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      status: 'completed',
      progress: 100,
      difficulty: 'Easy',
      difficultyEs: 'Fácil',
      estimatedTime: 25,
      lessonCount: 4,
      xpReward: 100,
      hasQuiz: true,
      hasPreview: true,
      prerequisites: [],
      unlockRequirements: null,
      unlockRequirementsEs: null
    },
    {
      id: 'ch2',
      chapterNumber: 2,
      title: 'Basic Arithmetic Operations',
      titleEs: 'Operaciones Aritméticas Básicas',
      description: 'Addition, subtraction, multiplication, and division fundamentals',
      descriptionEs: 'Fundamentos de suma, resta, multiplicación y división',
      thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop',
      status: 'completed',
      progress: 100,
      difficulty: 'Easy',
      difficultyEs: 'Fácil',
      estimatedTime: 30,
      lessonCount: 5,
      xpReward: 120,
      hasQuiz: true,
      hasPreview: true,
      prerequisites: [1],
      unlockRequirements: null,
      unlockRequirementsEs: null
    },
    {
      id: 'ch3',
      chapterNumber: 3,
      title: 'Fractions and Decimals',
      titleEs: 'Fracciones y Decimales',
      description: 'Understanding fractions, decimals, and their conversions',
      descriptionEs: 'Comprensión de fracciones, decimales y sus conversiones',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
      status: 'completed',
      progress: 100,
      difficulty: 'Medium',
      difficultyEs: 'Medio',
      estimatedTime: 35,
      lessonCount: 6,
      xpReward: 150,
      hasQuiz: true,
      hasPreview: true,
      prerequisites: [1, 2],
      unlockRequirements: null,
      unlockRequirementsEs: null
    },
    {
      id: 'ch4',
      chapterNumber: 4,
      title: 'Percentages and Ratios',
      titleEs: 'Porcentajes y Proporciones',
      description: 'Learn to work with percentages, ratios, and proportions',
      descriptionEs: 'Aprende a trabajar con porcentajes, razones y proporciones',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      status: 'in-progress',
      progress: 65,
      difficulty: 'Medium',
      difficultyEs: 'Medio',
      estimatedTime: 40,
      lessonCount: 7,
      xpReward: 180,
      hasQuiz: true,
      hasPreview: true,
      prerequisites: [2, 3],
      unlockRequirements: null,
      unlockRequirementsEs: null
    },
    {
      id: 'ch5',
      chapterNumber: 5,
      title: 'Basic Algebra',
      titleEs: 'Álgebra Básica',
      description: 'Introduction to variables, expressions, and simple equations',
      descriptionEs: 'Introducción a variables, expresiones y ecuaciones simples',
      thumbnail: 'https://images.unsplash.com/photo-1635070041409-e63e783ce3d1?w=400&h=300&fit=crop',
      status: 'available',
      progress: 0,
      difficulty: 'Medium',
      difficultyEs: 'Medio',
      estimatedTime: 45,
      lessonCount: 8,
      xpReward: 200,
      hasQuiz: true,
      hasPreview: true,
      prerequisites: [3, 4],
      unlockRequirements: null,
      unlockRequirementsEs: null
    },
    {
      id: 'ch6',
      chapterNumber: 6,
      title: 'Linear Equations',
      titleEs: 'Ecuaciones Lineales',
      description: 'Solving linear equations and understanding their graphs',
      descriptionEs: 'Resolver ecuaciones lineales y comprender sus gráficas',
      thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop',
      status: 'locked',
      progress: 0,
      difficulty: 'Hard',
      difficultyEs: 'Difícil',
      estimatedTime: 50,
      lessonCount: 9,
      xpReward: 250,
      hasQuiz: true,
      hasPreview: false,
      prerequisites: [4, 5],
      unlockRequirements: 'Complete Chapter 4: Percentages and Ratios',
      unlockRequirementsEs: 'Completa el Capítulo 4: Porcentajes y Proporciones'
    },
    {
      id: 'ch7',
      chapterNumber: 7,
      title: 'Geometry Basics',
      titleEs: 'Fundamentos de Geometría',
      description: 'Points, lines, angles, and basic geometric shapes',
      descriptionEs: 'Puntos, líneas, ángulos y formas geométricas básicas',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
      status: 'locked',
      progress: 0,
      difficulty: 'Medium',
      difficultyEs: 'Medio',
      estimatedTime: 40,
      lessonCount: 7,
      xpReward: 180,
      hasQuiz: true,
      hasPreview: false,
      prerequisites: [3],
      unlockRequirements: 'Complete Chapter 3: Fractions and Decimals',
      unlockRequirementsEs: 'Completa el Capítulo 3: Fracciones y Decimales'
    },
    {
      id: 'ch8',
      chapterNumber: 8,
      title: 'Area and Perimeter',
      titleEs: 'Área y Perímetro',
      description: 'Calculate area and perimeter of various shapes',
      descriptionEs: 'Calcula el área y perímetro de varias formas',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      status: 'locked',
      progress: 0,
      difficulty: 'Medium',
      difficultyEs: 'Medio',
      estimatedTime: 35,
      lessonCount: 6,
      xpReward: 160,
      hasQuiz: true,
      hasPreview: false,
      prerequisites: [7],
      unlockRequirements: 'Complete Chapter 7: Geometry Basics',
      unlockRequirementsEs: 'Completa el Capítulo 7: Fundamentos de Geometría'
    },
    {
      id: 'ch9',
      chapterNumber: 9,
      title: 'Data and Statistics',
      titleEs: 'Datos y Estadísticas',
      description: 'Introduction to data collection, analysis, and basic statistics',
      descriptionEs: 'Introducción a la recolección de datos, análisis y estadísticas básicas',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      status: 'locked',
      progress: 0,
      difficulty: 'Hard',
      difficultyEs: 'Difícil',
      estimatedTime: 45,
      lessonCount: 8,
      xpReward: 220,
      hasQuiz: true,
      hasPreview: false,
      prerequisites: [4],
      unlockRequirements: 'Complete Chapter 4: Percentages and Ratios',
      unlockRequirementsEs: 'Completa el Capítulo 4: Porcentajes y Proporciones'
    },
    {
      id: 'ch10',
      chapterNumber: 10,
      title: 'Probability',
      titleEs: 'Probabilidad',
      description: 'Basic concepts of probability and chance',
      descriptionEs: 'Conceptos básicos de probabilidad y azar',
      thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop',
      status: 'locked',
      progress: 0,
      difficulty: 'Hard',
      difficultyEs: 'Difícil',
      estimatedTime: 40,
      lessonCount: 7,
      xpReward: 200,
      hasQuiz: true,
      hasPreview: false,
      prerequisites: [9],
      unlockRequirements: 'Complete Chapter 9: Data and Statistics',
      unlockRequirementsEs: 'Completa el Capítulo 9: Datos y Estadísticas'
    },
    {
      id: 'ch11',
      chapterNumber: 11,
      title: 'Advanced Problem Solving',
      titleEs: 'Resolución Avanzada de Problemas',
      description: 'Apply mathematical concepts to solve complex problems',
      descriptionEs: 'Aplica conceptos matemáticos para resolver problemas complejos',
      thumbnail: 'https://images.unsplash.com/photo-1635070041409-e63e783ce3d1?w=400&h=300&fit=crop',
      status: 'locked',
      progress: 0,
      difficulty: 'Hard',
      difficultyEs: 'Difícil',
      estimatedTime: 55,
      lessonCount: 10,
      xpReward: 300,
      hasQuiz: true,
      hasPreview: false,
      prerequisites: [6, 8, 10],
      unlockRequirements: 'Complete Chapters 6, 8, and 10',
      unlockRequirementsEs: 'Completa los Capítulos 6, 8 y 10'
    },
    {
      id: 'ch12',
      chapterNumber: 12,
      title: 'Final Assessment',
      titleEs: 'Evaluación Final',
      description: 'Comprehensive test covering all mathematical concepts',
      descriptionEs: 'Prueba integral que cubre todos los conceptos matemáticos',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
      status: 'locked',
      progress: 0,
      difficulty: 'Hard',
      difficultyEs: 'Difícil',
      estimatedTime: 60,
      lessonCount: 1,
      xpReward: 400,
      hasQuiz: true,
      hasPreview: false,
      prerequisites: [11],
      unlockRequirements: 'Complete Chapter 11: Advanced Problem Solving',
      unlockRequirementsEs: 'Completa el Capítulo 11: Resolución Avanzada de Problemas'
    }
  ];

  const getFilteredChapters = () => {
    let filtered = mockChapters;

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered?.filter(chapter => {
        const isLocked = chapter?.prerequisites && chapter?.prerequisites?.length > 0 && 
          chapter?.prerequisites?.some(prereqId => {
            const prereqChapter = mockChapters?.find(ch => ch?.chapterNumber === prereqId);
            return !prereqChapter || prereqChapter?.status !== 'completed';
          });

        switch (activeFilter) {
          case 'available':
            return !isLocked && chapter?.status !== 'completed';
          case 'in-progress':
            return chapter?.status === 'in-progress';
          case 'completed':
            return chapter?.status === 'completed';
          case 'locked':
            return isLocked;
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(chapter => 
        (currentLanguage === 'en' ? chapter?.title : chapter?.titleEs)?.toLowerCase()?.includes(query) ||
        (currentLanguage === 'en' ? chapter?.description : chapter?.descriptionEs)?.toLowerCase()?.includes(query)
      );
    }

    return filtered;
  };

  const filteredChapters = getFilteredChapters();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        userName={userName}
        isAuthenticated={isAuthenticated}
      />
      <div className="pt-16">
        <ProgressBreadcrumb 
          currentSubject={currentLanguage === 'en' ? mockSubject?.name : mockSubject?.nameEs}
          showBackButton={true}
        />
        
        <main className="container mx-auto px-4 lg:px-6 py-6">
          <SubjectHeader
            subject={mockSubject}
            totalChapters={mockSubject?.totalChapters}
            completedChapters={mockSubject?.completedChapters}
            totalXP={mockSubject?.totalXP}
            currentXP={mockSubject?.currentXP}
          />

          <AchievementPreview
            subjectName={currentLanguage === 'en' ? mockSubject?.name : mockSubject?.nameEs}
            completedChapters={mockSubject?.completedChapters}
            totalChapters={mockSubject?.totalChapters}
          />

          <ChapterFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            practiceMode={practiceMode}
            onPracticeModeToggle={() => setPracticeMode(!practiceMode)}
            showSearch={true}
          />

          <ChapterGrid
            chapters={mockChapters}
            filteredChapters={filteredChapters}
            activeFilter={activeFilter}
            searchQuery={searchQuery}
            isPracticeMode={practiceMode}
            subjectName={currentLanguage === 'en' ? mockSubject?.name : mockSubject?.nameEs}
          />
        </main>
      </div>
    </div>
  );
};

export default SubjectChapterSelection;