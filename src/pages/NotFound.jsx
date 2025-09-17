import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const currentLanguage = localStorage.getItem('eduplay-language') || 'en';
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">
          {currentLanguage === 'en' ? 'Page Not Found' : 'पृष्ठ नहीं मिला'}
        </h2>
        <p className="text-onBackground/70 mb-8">
          {currentLanguage === 'en'
            ? "The page you're looking for doesn't exist. Let's get you back!"
            : 'आप जिस पृष्ठ को ढूंढ रहे हैं वह मौजूद नहीं है। चलिए आपको वापस ले चलते हैं!'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            icon={<Icon name="ArrowLeft" />}
            iconPosition="left"
            onClick={() => window.history?.back()}
          >
            {currentLanguage === 'en' ? 'Go Back' : 'वापस जाएं'}
          </Button>

          <Button
            variant="outline"
            icon={<Icon name="Home" />}
            iconPosition="left"
            onClick={handleGoHome}
          >
            {currentLanguage === 'en' ? 'Back to Home' : 'मुखपृष्ठ पर जाएं'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
