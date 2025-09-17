import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ClassSelectionGrid from './components/ClassSelectionGrid';
import RollNumberInput from './components/RollNumberInput';
import LoginStepIndicator from './components/LoginStepIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentLogin = ({ login }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setCurrentStep(2);
  };

  const handleBackToClassSelection = () => {
    setCurrentStep(1);
    setSelectedClass(null);
  };

  const handleStudentLogin = (studentData) => {
    // Use the login function passed from AuthenticationRouter
    if (login) {
      login('student', studentData);
    } else {
      // Fallback navigation if login function is not available
      navigate('/student-dashboard');
    }
  };

  const handleNavigateToTeacherLogin = () => {
    navigate('/teacher-login');
  };

  const handleNavigateToHome = () => {
    navigate('/public-landing-page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header 
        isAuthenticated={false}
        currentLanguage={currentLanguage}
      />

      <main className="pt-20 pb-12 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="GraduationCap" size={32} color="white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {currentLanguage === 'en' ? 'Student Login' : 'छात्र लॉगिन'}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  {currentLanguage === 'en' ? 'Welcome back! Ready to learn and play?' : 'फिर से स्वागत है! क्या आप सीखने और खेलने के लिए तैयार हैं?'}
                </p>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNavigateToHome}
                iconName="Home"
                iconPosition="left"
                iconSize={16}
              >
                {currentLanguage === 'en' ? 'Home' : 'मुखपृष्ठ'}
              </Button>
              <div className="w-px h-6 bg-border" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNavigateToTeacherLogin}
                iconName="User"
                iconPosition="left"
                iconSize={16}
              >
                {currentLanguage === 'en' ? 'Teacher Login' : 'शिक्षक लॉगिन'}
              </Button>
            </div>
          </div>

          {/* Step Indicator */}
          <LoginStepIndicator 
            currentStep={currentStep}
            totalSteps={2}
            currentLanguage={currentLanguage}
          />

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-6 lg:p-8">
            {currentStep === 1 && (
              <ClassSelectionGrid
                onClassSelect={handleClassSelect}
                currentLanguage={currentLanguage}
              />
            )}

            {currentStep === 2 && selectedClass && (
              <RollNumberInput
                selectedClass={selectedClass}
                onLogin={handleStudentLogin}
                onBack={handleBackToClassSelection}
                currentLanguage={currentLanguage}
              />
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="bg-card border border-border rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Icon name="Shield" size={24} className="text-success" />
                <Icon name="Heart" size={24} className="text-error" />
                <Icon name="Star" size={24} className="text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {currentLanguage === 'en' ? 'Safe & Fun Learning Environment' : 'सुरक्षित और मज़ेदार शिक्षण वातावरण'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'EduPlay provides a secure, engaging platform where students can learn through interactive games, earn achievements, and track their progress in a supportive environment.' : 'EduPlay एक सुरक्षित, आकर्षक मंच प्रदान करता है जहाँ छात्र इंटरैक्टिव खेलों के माध्यम से सीख सकते हैं, उपलब्धियाँ प्राप्त कर सकते हैं और सहायक वातावरण में अपनी प्रगति को ट्रैक कर सकते हैं।'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentLogin;