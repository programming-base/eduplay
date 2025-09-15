import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = null, userName = '', isAuthenticated = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('eduplay-language', language);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('eduplay-auth');
    localStorage.removeItem('eduplay-user-role');
    navigate('/public-landing-page');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const getNavigationItems = () => {
    if (!isAuthenticated) {
      return [
        { path: '/public-landing-page', label: currentLanguage === 'en' ? 'Home' : 'Inicio', icon: 'Home' },
        { path: '/teacher-login', label: currentLanguage === 'en' ? 'Teacher Login' : 'Acceso Docente', icon: 'GraduationCap' },
        { path: '/student-login', label: currentLanguage === 'en' ? 'Student Login' : 'Acceso Estudiante', icon: 'BookOpen' }
      ];
    }

    if (userRole === 'teacher') {
      return [
        { path: '/teacher-dashboard', label: currentLanguage === 'en' ? 'Dashboard' : 'Panel', icon: 'LayoutDashboard' },
        { path: '/analytics', label: currentLanguage === 'en' ? 'Analytics' : 'Análisis', icon: 'BarChart3' },
        { path: '/students', label: currentLanguage === 'en' ? 'Students' : 'Estudiantes', icon: 'Users' },
        { path: '/content', label: currentLanguage === 'en' ? 'Content' : 'Contenido', icon: 'FileText' }
      ];
    }

    if (userRole === 'student') {
      return [
        { path: '/student-dashboard', label: currentLanguage === 'en' ? 'Dashboard' : 'Panel', icon: 'LayoutDashboard' },
        { path: '/subject-chapter-selection', label: currentLanguage === 'en' ? 'Subjects' : 'Materias', icon: 'BookOpen' },
        { path: '/progress', label: currentLanguage === 'en' ? 'Progress' : 'Progreso', icon: 'TrendingUp' },
        { path: '/achievements', label: currentLanguage === 'en' ? 'Achievements' : 'Logros', icon: 'Award' }
      ];
    }

    return [];
  };

  const navigationItems = getNavigationItems();
  const isCurrentPath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => handleNavigation(isAuthenticated ? (userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard') : '/public-landing-page')}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-primary">EduPlay</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.slice(0, 4)?.map((item) => (
            <Button
              key={item?.path}
              variant={isCurrentPath(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              className="px-4 py-2"
            >
              {item?.label}
            </Button>
          ))}
          
          {navigationItems?.length > 4 && (
            <div className="relative group">
              <Button variant="ghost" iconName="MoreHorizontal" iconSize={18}>
                {currentLanguage === 'en' ? 'More' : 'Más'}
              </Button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navigationItems?.slice(4)?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2 first:rounded-t-md last:rounded-b-md"
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <div className="relative group">
            <Button variant="ghost" size="sm" iconName="Globe" iconSize={18}>
              <span className="hidden sm:inline ml-1">
                {currentLanguage === 'en' ? 'EN' : 'ES'}
              </span>
            </Button>
            <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-muted first:rounded-t-md ${currentLanguage === 'en' ? 'bg-muted' : ''}`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-muted last:rounded-b-md ${currentLanguage === 'es' ? 'bg-muted' : ''}`}
              >
                Español
              </button>
            </div>
          </div>

          {/* User Menu */}
          {isAuthenticated && (
            <div className="relative group">
              <Button variant="ghost" size="sm" iconName="User" iconSize={18}>
                <span className="hidden sm:inline ml-1">{userName || (userRole === 'teacher' ? 'Teacher' : 'Student')}</span>
              </Button>
              <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2 first:rounded-t-md"
                >
                  <Icon name="Settings" size={16} />
                  <span>{currentLanguage === 'en' ? 'Settings' : 'Configuración'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2 last:rounded-b-md text-error"
                >
                  <Icon name="LogOut" size={16} />
                  <span>{currentLanguage === 'en' ? 'Logout' : 'Cerrar Sesión'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors duration-150 ${
                  isCurrentPath(item?.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
            
            {isAuthenticated && (
              <>
                <div className="border-t border-border my-2"></div>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left hover:bg-muted"
                >
                  <Icon name="Settings" size={20} />
                  <span className="font-medium">{currentLanguage === 'en' ? 'Settings' : 'Configuración'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left hover:bg-muted text-error"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="font-medium">{currentLanguage === 'en' ? 'Logout' : 'Cerrar Sesión'}</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;