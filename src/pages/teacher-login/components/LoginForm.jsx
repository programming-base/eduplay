import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onLogin }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    teacherId: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const mockCredentials = {
    'TEACH001': { password: 'teacher123', name: 'Sarah Johnson' },
    'TEACH002': { password: 'educator456', name: 'Michael Chen' },
    'TEACH003': { password: 'school789', name: 'Emily Rodriguez' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.teacherId?.trim()) {
      newErrors.teacherId = currentLanguage === 'en' ? 'Teacher ID is required' : 'शिक्षक आईडी आवश्यक है';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = currentLanguage === 'en' ? 'Password is required' : 'पासवर्ड आवश्यक है';
    } else if (formData?.password?.length < 6) {
      newErrors.password = currentLanguage === 'en' ? 'Password must be at least 6 characters' : 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const teacher = mockCredentials?.[formData?.teacherId?.toUpperCase()];
    
    if (teacher && teacher?.password === formData?.password) {
      // Successful login
      const userData = {
        id: formData?.teacherId?.toUpperCase(),
        name: teacher?.name,
        role: 'teacher'
      };

      onLogin('teacher', userData);
    } else {
      // Failed login
      setErrors({
        general: currentLanguage === 'en' ? 'Invalid Teacher ID or password. Please try: TEACH001 / teacher123' : 'अमान्य शिक्षक आईडी या पासवर्ड। कृपया प्रयास करें: TEACH001 / teacher123'
      });
    }

    setIsLoading(false);
  };

  const handleForgotPassword = () => {
  alert(currentLanguage === 'en' ? 'Please contact your school administrator for password reset.' : 'पासवर्ड रीसेट के लिए कृपया अपने स्कूल प्रशासक से संपर्क करें।');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {currentLanguage === 'en' ? 'Teacher Login' : 'शिक्षक लॉगिन'}
          </h1>
          <p className="text-muted-foreground">
            {currentLanguage === 'en' ? 'Access your classroom dashboard' : 'अपने कक्षा डैशबोर्ड तक पहुँचें'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-error font-medium">
                  {errors?.general}
                </p>
                <p className="text-xs text-error/80 mt-1">
                  {currentLanguage === 'en' ?'Demo credentials: TEACH001, TEACH002, TEACH003' :'डेमो क्रेडेंशियल्स: TEACH001, TEACH002, TEACH003'}
                </p>
              </div>
            </div>
          )}

          {/* Teacher ID Input */}
          <Input
            label={currentLanguage === 'en' ? 'Teacher ID' : 'शिक्षक आईडी'}
            type="text"
            name="teacherId"
            value={formData?.teacherId}
            onChange={handleInputChange}
            placeholder={currentLanguage === 'en' ? 'Enter your Teacher ID' : 'अपना शिक्षक आईडी दर्ज करें'}
            error={errors?.teacherId}
            required
            className="text-base"
          />

          {/* Password Input */}
          <div className="relative">
            <Input
              label={currentLanguage === 'en' ? 'Password' : 'पासवर्ड'}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder={currentLanguage === 'en' ? 'Enter your password' : 'अपना पासवर्ड दर्ज करें'}
              error={errors?.password}
              required
              className="text-base pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
            className="text-base font-semibold"
          >
            {isLoading 
              ? (currentLanguage === 'en' ? 'Signing In...' : 'साइन इन हो रहा है...') 
              : (currentLanguage === 'en' ? 'Sign In' : 'साइन इन करें')}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-colors duration-150 font-medium"
            >
              {currentLanguage === 'en' ? 'Forgot Password?' : 'पासवर्ड भूल गए?'}
            </button>
          </div>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground mb-1">
                {currentLanguage === 'en' ? 'Demo Credentials:' : 'डेमो क्रेडेंशियल्स:'}
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>TEACH001 / teacher123</div>
                <div>TEACH002 / educator456</div>
                <div>TEACH003 / school789</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;