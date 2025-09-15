import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationRouter = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  useEffect(() => {
    handleRouteProtection();
  }, [isAuthenticated, userRole, location?.pathname]);

  const checkAuthenticationStatus = () => {
    try {
      const authData = localStorage.getItem('eduplay-auth');
      const savedUserRole = localStorage.getItem('eduplay-user-role');
      
      if (authData && savedUserRole) {
        const parsedAuth = JSON.parse(authData);
        if (parsedAuth?.token && parsedAuth?.expiresAt > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(savedUserRole);
        } else {
          clearAuthenticationData();
        }
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      clearAuthenticationData();
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuthenticationData = () => {
    localStorage.removeItem('eduplay-auth');
    localStorage.removeItem('eduplay-user-role');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleRouteProtection = () => {
    if (isLoading) return;

    const currentPath = location?.pathname;
    const publicRoutes = ['/public-landing-page', '/teacher-login', '/student-login'];
    const teacherRoutes = ['/teacher-dashboard'];
    const studentRoutes = ['/student-dashboard', '/subject-chapter-selection'];

    // Redirect to landing page if on root
    if (currentPath === '/') {
      navigate('/public-landing-page', { replace: true });
      return;
    }

    // Handle public routes
    if (publicRoutes?.includes(currentPath)) {
      // If authenticated user tries to access login pages, redirect to their dashboard
      if (isAuthenticated && (currentPath === '/teacher-login' || currentPath === '/student-login')) {
        const dashboardPath = userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard';
        navigate(dashboardPath, { replace: true });
      }
      return;
    }

    // Handle protected routes
    if (!isAuthenticated) {
      // Redirect unauthenticated users to landing page
      navigate('/public-landing-page', { replace: true });
      return;
    }

    // Handle role-based route protection
    if (teacherRoutes?.some(route => currentPath?.startsWith(route))) {
      if (userRole !== 'teacher') {
        navigate('/student-dashboard', { replace: true });
      }
    } else if (studentRoutes?.some(route => currentPath?.startsWith(route))) {
      if (userRole !== 'student') {
        navigate('/teacher-dashboard', { replace: true });
      }
    }
  };

  const login = (role, userData) => {
    const authData = {
      token: `eduplay_${role}_${Date.now()}`,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      user: userData
    };

    localStorage.setItem('eduplay-auth', JSON.stringify(authData));
    localStorage.setItem('eduplay-user-role', role);
    
    setIsAuthenticated(true);
    setUserRole(role);

    // Navigate to appropriate dashboard
    const dashboardPath = role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard';
    navigate(dashboardPath, { replace: true });
  };

  const logout = () => {
    clearAuthenticationData();
    navigate('/public-landing-page', { replace: true });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
          <div className="text-lg font-semibold text-foreground">Loading EduPlay...</div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Provide authentication context to children
  return React.cloneElement(children, {
    isAuthenticated,
    userRole,
    login,
    logout,
    checkAuthenticationStatus
  });
};

export default AuthenticationRouter;