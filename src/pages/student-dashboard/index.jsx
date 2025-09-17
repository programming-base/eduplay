import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressBreadcrumb from '../../components/ui/ProgressBreadcrumb';
import SubjectCard from './components/SubjectCard';
import PerformancePanel from './components/PerformancePanel';
import AchievementGallery from './components/AchievementGallery';
import ProgressChart from './components/ProgressChart';
import RecommendationsSection from './components/RecommendationsSection';
import LeaderboardWidget from './components/LeaderboardWidget';
import QuickGamesSection from './components/QuickGamesSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('student');
  const [userName, setUserName] = useState('Alex Johnson');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('eduplay-language') || 'en';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Mock student data
  const studentData = {
    id: 'student_001',
    name: 'Alex Johnson',
    totalXP: 12450,
    currentLevel: 8,
    totalBadges: 23,
    currentStreak: 7,
    rank: 3
  };

  // Mock subjects data
  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
  nameEs: 'गणित',
      icon: 'Calculator',
      bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      progress: 75,
      level: 6,
      chaptersCompleted: 8,
      totalChapters: 12,
      xpPoints: 850,
      streak: 5,
      hasNewContent: true,
      badges: [
        { icon: 'Award', type: 'gold' },
        { icon: 'Star', type: 'silver' },
        { icon: 'Trophy', type: 'bronze' }
      ]
    },
    {
      id: 'science',
      name: 'Science',
  nameEs: 'विज्ञान',
      icon: 'Atom',
      bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      progress: 60,
      level: 5,
      chaptersCompleted: 6,
      totalChapters: 10,
      xpPoints: 720,
      streak: 3,
      hasNewContent: false,
      badges: [
        { icon: 'Zap', type: 'gold' },
        { icon: 'Target', type: 'silver' }
      ]
    },
    {
      id: 'english',
      name: 'English',
  nameEs: 'अंग्रेज़ी',
      icon: 'BookOpen',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      progress: 85,
      level: 7,
      chaptersCompleted: 10,
      totalChapters: 12,
      xpPoints: 950,
      streak: 7,
      hasNewContent: true,
      badges: [
        { icon: 'Crown', type: 'diamond' },
        { icon: 'Medal', type: 'gold' },
        { icon: 'Award', type: 'silver' }
      ]
    },
    {
      id: 'history',
      name: 'History',
  nameEs: 'इतिहास',
      icon: 'Scroll',
      bgColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      progress: 45,
      level: 4,
      chaptersCompleted: 4,
      totalChapters: 9,
      xpPoints: 480,
      streak: 2,
      hasNewContent: false,
      badges: [
        { icon: 'Shield', type: 'bronze' }
      ]
    },
    {
      id: 'geography',
      name: 'Geography',
  nameEs: 'भूगोल',
      icon: 'Globe',
      bgColor: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      progress: 30,
      level: 3,
      chaptersCompleted: 3,
      totalChapters: 8,
      xpPoints: 320,
      streak: 1,
      hasNewContent: true,
      badges: [
        { icon: 'MapPin', type: 'bronze' }
      ]
    },
    {
      id: 'art',
      name: 'Art & Craft',
  nameEs: 'कला और शिल्प',
      icon: 'Palette',
      bgColor: 'bg-gradient-to-r from-rose-500 to-pink-500',
      progress: 90,
      level: 9,
      chaptersCompleted: 9,
      totalChapters: 10,
      xpPoints: 1200,
      streak: 4,
      hasNewContent: false,
      badges: [
        { icon: 'Sparkles', type: 'diamond' },
        { icon: 'Heart', type: 'gold' },
        { icon: 'Star', type: 'gold' }
      ]
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 'first_login',
      name: 'Welcome Aboard',
        nameEs: 'स्वागत है',
        descriptionEs: 'अपना पहला लॉगिन पूरा करें',
      icon: 'LogIn',
      type: 'bronze',
      earned: true,
      earnedDate: '2024-09-01',
      isRecent: false
    },
    {
      id: 'streak_7',
      name: 'Week Warrior',
        nameEs: 'सप्ताह योद्धा',
        descriptionEs: '7 दिन की सीखने की स्ट्रीक बनाए रखें',
      icon: 'Flame',
      type: 'gold',
      earned: true,
      earnedDate: '2024-09-14',
      isRecent: true
    },
    {
      id: 'math_master',
      name: 'Math Master',
        nameEs: 'गणित मास्टर',
        descriptionEs: 'सभी गणित अध्याय 90%+ अंक के साथ पूरे करें',
      icon: 'Calculator',
      type: 'diamond',
      earned: false,
      earnedDate: null,
      isRecent: false
    },
    {
      id: 'quiz_champion',
      name: 'Quiz Champion',
        nameEs: 'क्विज़ चैंपियन',
        descriptionEs: '10 क्विज़ में पूर्ण अंक प्राप्त करें',
      icon: 'Trophy',
      type: 'gold',
      earned: true,
      earnedDate: '2024-09-12',
      isRecent: true
    },
    {
      id: 'early_bird',
      name: 'Early Bird',
        nameEs: 'अर्ली बर्ड',
        descriptionEs: '5 दिनों तक सुबह 8 बजे से पहले पढ़ाई करें',
      icon: 'Sunrise',
      type: 'silver',
      earned: true,
      earnedDate: '2024-09-10',
      isRecent: false
    },
    {
      id: 'social_learner',
      name: 'Social Learner',
        nameEs: 'सामाजिक शिक्षार्थी',
        descriptionEs: '5 सहपाठियों की पढ़ाई में मदद करें',
      icon: 'Users',
      type: 'silver',
      earned: false,
      earnedDate: null,
      isRecent: false
    }
  ];

  // Mock progress data
  const progressData = [
    { day: 'Mon', xp: 120, progress: 15 },
    { day: 'Tue', xp: 180, progress: 25 },
    { day: 'Wed', xp: 150, progress: 20 },
    { day: 'Thu', xp: 220, progress: 35 },
    { day: 'Fri', xp: 200, progress: 30 },
    { day: 'Sat', xp: 160, progress: 22 },
    { day: 'Sun', xp: 190, progress: 28 }
  ];

  // Mock recommendations data
  const recommendations = [
    {
      id: 'rec_1',
      type: 'practice',
      title: 'Practice Algebra Basics',
          titleEs: 'बीजगणित की मूल बातें अभ्यास करें',
      description: 'You struggled with quadratic equations. Let\'s practice more!',
          descriptionEs: 'आपको द्विघात समीकरणों में कठिनाई हुई। चलिए और अभ्यास करें!',
      subject: 'Mathematics',
      priority: 'high',
      estimatedTime: 15,
      xpReward: 150,
      difficulty: 'Medium'
    },
    {
      id: 'rec_2',
      type: 'review',
      title: 'Review Cell Structure',
          titleEs: 'कोशिका संरचना की समीक्षा करें',
      description: 'Refresh your knowledge on plant and animal cells',
          descriptionEs: 'पौधों और जानवरों की कोशिकाओं का ज्ञान ताज़ा करें',
      subject: 'Science',
      priority: 'medium',
      estimatedTime: 10,
      xpReward: 100,
      difficulty: 'Easy'
    },
    {
      id: 'rec_3',
      type: 'challenge',
      title: 'Grammar Challenge',
          titleEs: 'व्याकरण चुनौती',
      description: 'Test your understanding of complex sentence structures',
          descriptionEs: 'जटिल वाक्य संरचनाओं की अपनी समझ का परीक्षण करें',
      subject: 'English',
      priority: 'low',
      estimatedTime: 20,
      xpReward: 250,
      difficulty: 'Hard'
    },
    {
      id: 'rec_4',
      type: 'game',
      title: 'Geography Quiz Game',
          titleEs: 'भूगोल क्विज़ गेम',
      description: 'Fun interactive game to learn world capitals',
          descriptionEs: 'दुनिया की राजधानियों को सीखने के लिए मज़ेदार इंटरैक्टिव गेम',
      subject: 'Geography',
      gameType: 'quiz',
      priority: 'medium',
      estimatedTime: 12,
      xpReward: 180,
      difficulty: 'Medium'
    }
  ];

  // Mock leaderboard data
  const leaderboardData = {
    class: [
      { id: 'student_002', name: 'Emma Wilson', xp: 15200, level: 9, badges: 28, streak: 12, rank: 1 },
      { id: 'student_003', name: 'Liam Chen', xp: 13800, level: 8, badges: 25, streak: 8, rank: 2 },
      { id: 'student_001', name: 'Alex Johnson', xp: 12450, level: 8, badges: 23, streak: 7, rank: 3 },
      { id: 'student_004', name: 'Sophia Davis', xp: 11900, level: 7, badges: 21, streak: 5, rank: 4 },
      { id: 'student_005', name: 'Noah Martinez', xp: 11200, level: 7, badges: 19, streak: 9, rank: 5 }
    ],
    school: [
      { id: 'student_006', name: 'Olivia Brown', xp: 18500, level: 11, badges: 35, streak: 15, rank: 1 },
      { id: 'student_007', name: 'Ethan Taylor', xp: 17200, level: 10, badges: 32, streak: 11, rank: 2 },
      { id: 'student_002', name: 'Emma Wilson', xp: 15200, level: 9, badges: 28, streak: 12, rank: 3 },
      { id: 'student_003', name: 'Liam Chen', xp: 13800, level: 8, badges: 25, streak: 8, rank: 4 },
      { id: 'student_001', name: 'Alex Johnson', xp: 12450, level: 8, badges: 23, streak: 7, rank: 5 }
    ]
  };

  // Mock games data
  const games = [
    {
      id: 'game_1',
      type: 'aptitude',
      title: 'Logic Puzzles',
          titleEs: 'तार्किक पहेलियाँ',
      description: 'Solve challenging logic problems to boost your reasoning skills',
          descriptionEs: 'अपनी तर्क क्षमता बढ़ाने के लिए चुनौतीपूर्ण पहेलियाँ हल करें',
      icon: 'Brain',
      duration: 10,
      xpReward: 200,
      difficulty: 'Medium',
      bestScore: 85,
      isNew: false
    },
    {
      id: 'game_2',
      type: 'vocabulary',
      title: 'Word Builder',
          titleEs: 'शब्द निर्माता',
      description: 'Build words from letters and expand your vocabulary',
          descriptionEs: 'अक्षरों से शब्द बनाएं और अपना शब्दकोश बढ़ाएं',
      icon: 'Type',
      duration: 8,
      xpReward: 150,
      difficulty: 'Easy',
      bestScore: 92,
      isNew: false
    },
    {
      id: 'game_3',
      type: 'math',
      title: 'Number Ninja',
          titleEs: 'संख्या निंजा',
      description: 'Fast-paced math challenges to sharpen your calculation skills',
          descriptionEs: 'तेज़ गणित चुनौतियाँ अपनी गणना क्षमता तेज़ करें',
      icon: 'Zap',
      duration: 5,
      xpReward: 100,
      difficulty: 'Hard',
      bestScore: 78,
      isNew: true
    },
    {
      id: 'game_4',
      type: 'memory',
      title: 'Memory Palace',
          titleEs: 'मेमोरी पैलेस',
      description: 'Train your memory with pattern recognition games',
          descriptionEs: 'पैटर्न पहचान खेलों से अपनी याददाश्त को प्रशिक्षित करें',
      icon: 'Eye',
      duration: 12,
      xpReward: 180,
      difficulty: 'Medium',
      isNew: false
    },
    {
      id: 'game_5',
      type: 'puzzle',
      title: 'Shape Shifter',
          titleEs: 'आकार परिवर्तक',
      description: 'Solve geometric puzzles and spatial reasoning challenges',
          descriptionEs: 'ज्यामितीय पहेलियाँ और स्थानिक तर्क चुनौतियाँ हल करें',
      icon: 'Shapes',
      duration: 15,
      xpReward: 220,
      difficulty: 'Hard',
      isNew: true
    },
    {
      id: 'game_6',
      type: 'aptitude',
      title: 'Pattern Master',
          titleEs: 'पैटर्न मास्टर',
      description: 'Identify and complete complex patterns',
          descriptionEs: 'जटिल पैटर्न पहचानें और पूरा करें',
      icon: 'Grid3x3',
      duration: 7,
      xpReward: 130,
      difficulty: 'Easy',
      bestScore: 96,
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        userName={userName}
        isAuthenticated={isAuthenticated}
      />
      <ProgressBreadcrumb showBackButton={false} />
      <main className="pt-16 pb-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <PerformancePanel studentData={studentData} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Subjects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subjects Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Icon name="BookOpen" size={20} color="white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                            {currentLanguage === 'en' ? 'Your Subjects' : 'आपके विषय'}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                            {currentLanguage === 'en' ? 'Continue your learning journey' : 'अपनी सीखने की यात्रा जारी रखें'}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/subject-chapter-selection')}
                    iconName="ArrowRight" 
                    iconPosition="right" 
                    iconSize={16}
                  >
                        {currentLanguage === 'en' ? 'View All' : 'सभी देखें'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subjects?.slice(0, 4)?.map((subject) => (
                    <SubjectCard key={subject?.id} subject={subject} />
                  ))}
                </div>
              </div>

              {/* Progress Chart */}
              <ProgressChart progressData={progressData} />

              {/* Quick Games */}
              <QuickGamesSection games={games} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Achievement Gallery */}
              <AchievementGallery achievements={achievements} />

              {/* Leaderboard */}
              <LeaderboardWidget 
                leaderboardData={leaderboardData}
                currentStudent={studentData}
              />

              {/* Recommendations */}
              <RecommendationsSection recommendations={recommendations} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">
                  {currentLanguage === 'en' ? 'Quick Actions' : 'त्वरित क्रियाएँ'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/subject-chapter-selection')}
              >
                <Icon name="BookOpen" size={24} />
                <span className="text-sm">
                      {currentLanguage === 'en' ? 'Browse Subjects' : 'विषय ब्राउज़ करें'}
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => console.log('View progress')}
              >
                <Icon name="TrendingUp" size={24} />
                <span className="text-sm">
                      {currentLanguage === 'en' ? 'View Progress' : 'प्रगति देखें'}
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => console.log('Take quiz')}
              >
                <Icon name="HelpCircle" size={24} />
                <span className="text-sm">
                      {currentLanguage === 'en' ? 'Take Quiz' : 'क्विज़ दें'}
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => console.log('View achievements')}
              >
                <Icon name="Award" size={24} />
                <span className="text-sm">
                      {currentLanguage === 'en' ? 'Achievements' : 'उपलब्धियाँ'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;