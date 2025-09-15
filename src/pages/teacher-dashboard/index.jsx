import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ClassOverviewCard from './components/ClassOverviewCard';
import ContentManagementPanel from './components/ContentManagementPanel';
import AnalyticsPanel from './components/AnalyticsPanel';
import StudentProgressTable from './components/StudentProgressTable';
import BadgeAwardingSystem from './components/BadgeAwardingSystem';
import QuickActionPanel from './components/QuickActionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check authentication
    const authData = localStorage.getItem('eduplay-auth');
    const userRole = localStorage.getItem('eduplay-user-role');
    
    if (!authData || userRole !== 'teacher') {
      navigate('/teacher-login');
      return;
    }

    try {
      const parsedAuth = JSON.parse(authData);
      if (parsedAuth?.expiresAt <= Date.now()) {
        localStorage.removeItem('eduplay-auth');
        localStorage.removeItem('eduplay-user-role');
        navigate('/teacher-login');
        return;
      }
      setUserName(parsedAuth?.user?.name || 'Teacher');
    } catch (error) {
      navigate('/teacher-login');
    }

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [navigate]);

  const classesData = [
    {
      id: 1,
      name: "Mathematics - Grade 8A",
      subject: "Mathematics",
      totalStudents: 28,
      completedLessons: 15,
      totalLessons: 20,
      progress: 85,
      status: "active",
      lastActivity: "2 hours ago",
      weeklyGrowth: 12
    },
    {
      id: 2,
      name: "Science - Grade 8B",
      subject: "Science",
      totalStudents: 25,
      completedLessons: 12,
      totalLessons: 18,
      progress: 72,
      status: "active",
      lastActivity: "4 hours ago",
      weeklyGrowth: 8
    },
    {
      id: 3,
      name: "Mathematics - Grade 7A",
      subject: "Mathematics",
      totalStudents: 30,
      completedLessons: 8,
      totalLessons: 16,
      progress: 58,
      status: "pending",
      lastActivity: "1 day ago",
      weeklyGrowth: 5
    }
  ];

  const tabs = [
    { id: 'overview', label: currentLanguage === 'en' ? 'Overview' : 'Resumen', icon: 'LayoutDashboard' },
    { id: 'content', label: currentLanguage === 'en' ? 'Content' : 'Contenido', icon: 'FileText' },
    { id: 'analytics', label: currentLanguage === 'en' ? 'Analytics' : 'Análisis', icon: 'BarChart3' },
    { id: 'students', label: currentLanguage === 'en' ? 'Students' : 'Estudiantes', icon: 'Users' },
    { id: 'badges', label: currentLanguage === 'en' ? 'Badges' : 'Insignias', icon: 'Award' }
  ];

  const handleViewClassDetails = (classId) => {
    console.log('Viewing class details for:', classId);
  };

  const handleQuickAction = (action, classId = null) => {
    console.log('Quick action:', action, 'for class:', classId);
    switch (action) {
      case 'quiz': case'create-quiz': console.log('Creating quiz...');
        break;
      case 'upload-content': console.log('Uploading content...');
        break;
      case 'student-analysis': console.log('Viewing student analysis...');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleUpload = (type) => {
    console.log('Uploading:', type);
  };

  const handleCreateQuiz = () => {
    console.log('Creating new quiz...');
  };

  const handleManageContent = () => {
    console.log('Managing all content...');
  };

  const handleExportReport = (format) => {
    console.log('Exporting report in format:', format);
  };

  const handleViewDetailedAnalytics = () => {
    console.log('Viewing detailed analytics...');
  };

  const handleViewStudent = (studentId) => {
    console.log('Viewing student:', studentId);
  };

  const handleAwardBadge = (data) => {
    console.log('Awarding badge:', data);
  };

  const handleSendMessage = (studentId) => {
    console.log('Sending message to student:', studentId);
  };

  const handleCreateCustomBadge = () => {
    console.log('Creating custom badge...');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Class Overview Cards */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {currentLanguage === 'en' ? 'My Classes' : 'Mis Clases'}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {classesData?.map((classData) => (
                    <ClassOverviewCard
                      key={classData?.id}
                      classData={classData}
                      onViewDetails={handleViewClassDetails}
                      onQuickAction={handleQuickAction}
                    />
                  ))}
                </div>
              </div>
              
              {/* Analytics Panel */}
              <AnalyticsPanel
                onExportReport={handleExportReport}
                onViewDetailedAnalytics={handleViewDetailedAnalytics}
              />
            </div>
            {/* Quick Actions Sidebar */}
            <div className="xl:col-span-1">
              <QuickActionPanel onQuickAction={handleQuickAction} />
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <ContentManagementPanel
              onUpload={handleUpload}
              onCreateQuiz={handleCreateQuiz}
              onManageContent={handleManageContent}
            />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <AnalyticsPanel
              onExportReport={handleExportReport}
              onViewDetailedAnalytics={handleViewDetailedAnalytics}
            />
          </div>
        );

      case 'students':
        return (
          <div className="space-y-6">
            <StudentProgressTable
              onViewStudent={handleViewStudent}
              onAwardBadge={handleAwardBadge}
              onSendMessage={handleSendMessage}
            />
          </div>
        );

      case 'badges':
        return (
          <div className="space-y-6">
            <BadgeAwardingSystem
              onAwardBadge={handleAwardBadge}
              onCreateCustomBadge={handleCreateCustomBadge}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="teacher" 
        userName={userName}
        isAuthenticated={isAuthenticated}
      />
      <div className="pt-16">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="px-4 lg:px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {currentLanguage === 'en' ? `Welcome back, ${userName}!` : `¡Bienvenido de vuelta, ${userName}!`}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {currentLanguage === 'en' ? 'Manage your classes and track student progress' : 'Gestiona tus clases y rastrea el progreso de los estudiantes'}
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{classesData?.length}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentLanguage === 'en' ? 'Active Classes' : 'Clases Activas'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {classesData?.reduce((acc, cls) => acc + cls?.totalStudents, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentLanguage === 'en' ? 'Total Students' : 'Total Estudiantes'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    {Math.round(classesData?.reduce((acc, cls) => acc + cls?.progress, 0) / classesData?.length)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentLanguage === 'en' ? 'Avg. Progress' : 'Progreso Promedio'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-surface border-b border-border sticky top-16 z-40">
          <div className="px-4 lg:px-6">
            <nav className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 border-b-2 ${
                    activeTab === tab?.id
                      ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-4 lg:px-6 py-6">
          {renderTabContent()}
        </main>

        {/* Mobile Quick Actions FAB */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <Button
            variant="default"
            size="lg"
            onClick={() => handleQuickAction('create-quiz')}
            iconName="Plus"
            iconSize={24}
            className="w-14 h-14 rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;