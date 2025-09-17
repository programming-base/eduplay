import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TopStudentLeaderboard from './components/TopStudentLeaderboard';
import StudentTestimonials from './components/StudentTestimonials';
import FeatureShowcase from './components/FeatureShowcase';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PublicLandingPage = () => {
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

const content = {
  en: {
    footer: {
      description: "EduPlay transforms K-12 education through gamified learning experiences that engage students and empower teachers.",
      quickLinks: "Quick Links",
      forEducators: "For Educators",
      forStudents: "For Students",
      support: "Support",
      legal: "Legal",
      links: {
        about: "About Us",
        features: "Features",
        pricing: "Pricing",
        contact: "Contact",
        teacherLogin: "Teacher Login",
        teacherDashboard: "Teacher Dashboard",
        analytics: "Analytics",
        resources: "Resources",
        studentLogin: "Student Login",
        subjects: "Subjects",
        achievements: "Achievements",
        leaderboard: "Leaderboard",
        helpCenter: "Help Center",
        tutorials: "Tutorials",
        faq: "FAQ",
        community: "Community",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Policy"
      },
      newsletter: {
        title: "Stay Updated",
        description: "Get the latest updates on new features and educational insights.",
        placeholder: "Enter your email",
        subscribe: "Subscribe"
      },
      copyright: "All rights reserved.",
      madeWith: "Made with",
      forEducation: "for education"
    }
  },
  hi: {
    footer: {
      description: "EduPlay कक्षा 1 से 12 तक की शिक्षा को गेमिफाइड लर्निंग अनुभवों के माध्यम से बदलता है, जो छात्रों को जोड़ता है और शिक्षकों को सशक्त बनाता है।",
      quickLinks: "त्वरित लिंक",
      forEducators: "शिक्षकों के लिए",
      forStudents: "छात्रों के लिए",
      support: "सहायता",
      legal: "कानूनी",
      links: {
        about: "हमारे बारे में",
        features: "विशेषताएँ",
        pricing: "मूल्य निर्धारण",
        contact: "संपर्क",
        teacherLogin: "शिक्षक लॉगिन",
        teacherDashboard: "शिक्षक डैशबोर्ड",
        analytics: "विश्लेषण",
        resources: "संसाधन",
        studentLogin: "छात्र लॉगिन",
        subjects: "विषय",
        achievements: "उपलब्धियाँ",
        leaderboard: "लीडरबोर्ड",
        helpCenter: "सहायता केंद्र",
        tutorials: "ट्यूटोरियल",
        faq: "अक्सर पूछे जाने वाले प्रश्न",
        community: "समुदाय",
        privacy: "गोपनीयता नीति",
        terms: "सेवा की शर्तें",
        cookies: "कुकी नीति"
      },
      newsletter: {
        title: "अपडेट प्राप्त करें",
        description: "नई विशेषताओं और शैक्षिक जानकारी पर नवीनतम अपडेट प्राप्त करें।",
        placeholder: "अपना ईमेल दर्ज करें",
        subscribe: "सदस्यता लें"
      },
      copyright: "सभी अधिकार सुरक्षित।",
      madeWith: "बनाया गया",
      forEducation: "शिक्षा के लिए"
    }
  }
};


  const currentContent = content?.[currentLanguage];
  const currentYear = new Date()?.getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleNewsletterSubmit = (e) => {
    e?.preventDefault();
    // Mock newsletter subscription
  alert(currentLanguage === 'en' ? 'Thank you for subscribing!' : 'सदस्यता लेने के लिए धन्यवाद!');
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
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Top Student Leaderboard */}
        <TopStudentLeaderboard />

        {/* Student Testimonials */}
        <StudentTestimonials />

        {/* Call to Action Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 lg:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                {currentLanguage === 'en' ? 'Ready to Transform Your Classroom?' : 'क्या आप अपनी कक्षा को बदलने के लिए तैयार हैं?'}
              </h2>
              <p className="text-xl text-white/90">
                {currentLanguage === 'en' ?'Join thousands of educators and students who are already experiencing the future of learning.' :'हजारों शिक्षकों और छात्रों से जुड़ें जो पहले से ही सीखने के भविष्य का अनुभव कर रहे हैं।'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => handleNavigation('/teacher-login')}
                  iconName="GraduationCap"
                  iconPosition="left"
                  className="text-lg px-8 py-4"
                >
                  {currentLanguage === 'en' ? 'Start as Teacher' : 'शिक्षक के रूप में शुरू करें'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleNavigation('/student-login')}
                  iconName="BookOpen"
                  iconPosition="left"
                  className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {currentLanguage === 'en' ? 'Start as Student' : 'छात्र के रूप में शुरू करें'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-primary">EduPlay</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {currentContent?.footer?.description}
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Icon name="Facebook" size={20} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Icon name="Twitter" size={20} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Icon name="Instagram" size={20} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Icon name="Linkedin" size={20} className="text-primary" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">{currentContent?.footer?.quickLinks}</h4>
              <div className="space-y-2">
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.about}
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.features}
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.pricing}
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.contact}
                </button>
              </div>
            </div>

            {/* For Educators */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">{currentContent?.footer?.forEducators}</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigation('/teacher-login')}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {currentContent?.footer?.links?.teacherLogin}
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.analytics}
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.resources}
                </button>
              </div>
            </div>

            {/* For Students */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">{currentContent?.footer?.forStudents}</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigation('/student-login')}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {currentContent?.footer?.links?.studentLogin}
                </button>
                <button 
                  onClick={() => handleNavigation('/subject-chapter-selection')}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {currentContent?.footer?.links?.subjects}
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.achievements}
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                  {currentContent?.footer?.links?.leaderboard}
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-border mt-12 pt-8">
            <div className="max-w-md mx-auto text-center space-y-4">
              <h4 className="font-bold text-foreground">{currentContent?.footer?.newsletter?.title}</h4>
              <p className="text-muted-foreground text-sm">
                {currentContent?.footer?.newsletter?.description}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder={currentContent?.footer?.newsletter?.placeholder}
                  className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <Button type="submit" variant="default" size="sm">
                  {currentContent?.footer?.newsletter?.subscribe}
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} EduPlay. {currentContent?.footer?.copyright}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button className="text-muted-foreground hover:text-primary transition-colors duration-200">
                {currentContent?.footer?.links?.privacy}
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-200">
                {currentContent?.footer?.links?.terms}
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-200">
                {currentContent?.footer?.links?.cookies}
              </button>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>{currentContent?.footer?.madeWith}</span>
              <Icon name="Heart" size={16} className="text-red-500" />
              <span>{currentContent?.footer?.forEducation}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLandingPage;