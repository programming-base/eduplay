import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import LoginForm from './components/LoginForm';
import NavigationLinks from './components/NavigationLinks';
import WelcomeSection from './components/WelcomeSection';

const TeacherLogin = ({ login }) => {
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

  const handleLogin = (role, userData) => {
    if (login) {
      login(role, userData);
    } else {
      // Fallback navigation if login function not provided
      navigate('/teacher-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        isAuthenticated={false}
        userRole={null}
        userName=""
      />
      {/* Main Content */}
      <div className="pt-16 min-h-screen flex">
        {/* Welcome Section - Desktop Only */}
        <WelcomeSection />

        {/* Login Section */}
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center p-6 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Welcome Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {currentLanguage === 'en' ? 'Teacher Portal' : 'शिक्षक पोर्टल'}
              </h1>
              <p className="text-muted-foreground">
                {currentLanguage === 'en' ? 'Sign in to access your teaching dashboard' : 'अपने शिक्षण डैशबोर्ड तक पहुँचने के लिए साइन इन करें'}
              </p>
            </div>

            {/* Login Form */}
            <LoginForm onLogin={handleLogin} />

            {/* Navigation Links */}
            <NavigationLinks />

            {/* Language Switcher - Mobile */}
            <div className="lg:hidden flex justify-center mt-8">
              <LanguageSwitcher size="sm" variant="outline" />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} EduPlay. {currentLanguage === 'en' ? 'All rights reserved.' : 'सभी अधिकार सुरक्षित।'}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'Need help?' : 'मदद चाहिए?'}
              </span>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150">
                {currentLanguage === 'en' ? 'Contact Support' : 'सहायता से संपर्क करें'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeacherLogin;