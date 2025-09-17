import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginStepIndicator = ({ currentStep, totalSteps, currentLanguage }) => {
  const steps = [
    {
      id: 1,
  title: currentLanguage === 'en' ? 'Select Class' : 'कक्षा चुनें',
      icon: 'Users'
    },
    {
      id: 2,
  title: currentLanguage === 'en' ? 'Enter Roll Number' : 'रोल नंबर दर्ज करें',
      icon: 'User'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-center">
            {/* Step Circle */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              currentStep >= step?.id
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-background border-border text-muted-foreground'
            }`}>
              {currentStep > step?.id ? (
                <Icon name="Check" size={20} />
              ) : (
                <Icon name={step?.icon} size={20} />
              )}
            </div>

            {/* Step Label */}
            <div className="ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${
                currentStep >= step?.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step?.title}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                currentStep > step?.id ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
      {/* Mobile Step Labels */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-primary">
          {steps?.find(step => step?.id === currentStep)?.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {currentLanguage === 'en' ? 'Step' : 'चरण'} {currentStep} {currentLanguage === 'en' ? 'of' : 'का'} {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default LoginStepIndicator;