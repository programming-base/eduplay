import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TopStudentLeaderboard = () => {
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

  const topStudents = [
    {
      id: 1,
      name: "Emma Rodriguez",
      school: "Lincoln Elementary",
      points: 2850,
      level: 15,
      badges: 12,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCdVsYxqeQrI8zqhyntFtclBKM281ZQ7-A4w&s?w=150&h=150&fit=crop&crop=face",
      streak: 28,
      rank: 1
    },
    {
      id: 2,
      name: "Marcus Chen",
      school: "Roosevelt Middle School",
      points: 2720,
      level: 14,
      badges: 11,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      streak: 25,
      rank: 2
    },
    {
      id: 3,
      name: "Sophia Williams",
      school: "Washington High",
      points: 2650,
      level: 14,
      badges: 10,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      streak: 22,
      rank: 3
    },
    {
      id: 4,
      name: "Aiden Johnson",
      school: "Jefferson Academy",
      points: 2580,
      level: 13,
      badges: 9,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      streak: 20,
      rank: 4
    },
    {
      id: 5,
      name: "Isabella Garcia",
      school: "Madison Elementary",
      points: 2510,
      level: 13,
      badges: 8,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      streak: 18,
      rank: 5
    }
  ];

  const content = {
    en: {
      title: "Top Student Champions",
      subtitle: "Celebrating our most dedicated learners this month",
      points: "Points",
      level: "Level",
      badges: "Badges",
      streak: "Day Streak",
      viewAll: "View Full Leaderboard"
    },
    es: {
      title: "Campeones Estudiantes",
      subtitle: "Celebrando a nuestros estudiantes más dedicados este mes",
      points: "Puntos",
      level: "Nivel",
      badges: "Insignias",
      streak: "Racha de Días",
      viewAll: "Ver Tabla Completa"
    }
  };

  const currentContent = content?.[currentLanguage];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return { icon: "Crown", color: "text-yellow-500" };
      case 2:
        return { icon: "Medal", color: "text-gray-400" };
      case 3:
        return { icon: "Award", color: "text-amber-600" };
      default:
        return { icon: "Star", color: "text-primary" };
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600";
      default:
        return "bg-gradient-to-r from-primary to-secondary";
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {currentContent?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Top 3 Podium - Desktop */}
        <div className="hidden lg:flex justify-center items-end space-x-8 mb-12">
          {/* Second Place */}
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-24 h-32 bg-gradient-to-t from-gray-300 to-gray-500 rounded-t-lg flex items-end justify-center pb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <Image
                    src={topStudents?.[1]?.avatar}
                    alt={topStudents?.[1]?.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                    <Icon name="Medal" size={14} color="white" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-bold text-foreground">{topStudents?.[1]?.name}</h3>
            <p className="text-sm text-muted-foreground">{topStudents?.[1]?.points} pts</p>
          </div>

          {/* First Place */}
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-24 h-40 bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-t-lg flex items-end justify-center pb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <Image
                    src={topStudents?.[0]?.avatar}
                    alt={topStudents?.[0]?.name}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Icon name="Crown" size={16} color="white" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-bold text-foreground">{topStudents?.[0]?.name}</h3>
            <p className="text-sm text-muted-foreground">{topStudents?.[0]?.points} pts</p>
          </div>

          {/* Third Place */}
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-24 h-28 bg-gradient-to-t from-amber-400 to-amber-600 rounded-t-lg flex items-end justify-center pb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <Image
                    src={topStudents?.[2]?.avatar}
                    alt={topStudents?.[2]?.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={14} color="white" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-bold text-foreground">{topStudents?.[2]?.name}</h3>
            <p className="text-sm text-muted-foreground">{topStudents?.[2]?.points} pts</p>
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="grid gap-4 max-w-4xl mx-auto">
          {topStudents?.map((student, index) => {
            const rankInfo = getRankIcon(student?.rank);
            const rankBadge = getRankBadge(student?.rank);
            
            return (
              <div
                key={student?.id}
                className={`bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
                  student?.rank <= 3 ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className={`w-12 h-12 ${rankBadge} rounded-full flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-lg">{student?.rank}</span>
                  </div>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <Image
                      src={student?.avatar}
                      alt={student?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                    <div className={`absolute -top-1 -right-1 w-6 h-6 ${rankBadge} rounded-full flex items-center justify-center`}>
                      <Icon name={rankInfo?.icon} size={12} color="white" />
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-lg">{student?.name}</h3>
                    <p className="text-muted-foreground text-sm">{student?.school}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{student?.points?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{currentContent?.points}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary">{student?.level}</div>
                      <div className="text-xs text-muted-foreground">{currentContent?.level}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent">{student?.badges}</div>
                      <div className="text-xs text-muted-foreground">{currentContent?.badges}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-success">{student?.streak}</div>
                      <div className="text-xs text-muted-foreground">{currentContent?.streak}</div>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="sm:hidden flex flex-col items-end space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Zap" size={16} className="text-primary" />
                      <span className="font-bold text-primary">{student?.points?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="TrendingUp" size={16} className="text-secondary" />
                      <span className="font-bold text-secondary">L{student?.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
            <Icon name="Trophy" size={20} />
            <span className="font-medium">{currentContent?.viewAll}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopStudentLeaderboard;