import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RollNumberInput = ({ selectedClass, onLogin, onBack, currentLanguage }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNumericKeypad, setShowNumericKeypad] = useState(false);

  // Mock valid roll numbers for demonstration
  const validRollNumbers = ['001', '002', '003', '004', '005', '010', '015', '020', '025', '030'];

  useEffect(() => {
    // Show numeric keypad on mobile devices
    const isMobile = window.innerWidth < 768;
    setShowNumericKeypad(isMobile);
  }, []);

  const handleRollNumberChange = (value) => {
    // Only allow numeric input and limit to 3 digits
    const numericValue = value?.replace(/\D/g, '')?.slice(0, 3);
    setRollNumber(numericValue);
    setError('');
  };

  const handleNumericKeypadClick = (digit) => {
    if (rollNumber?.length < 3) {
      handleRollNumberChange(rollNumber + digit);
    }
  };

  const handleBackspace = () => {
    setRollNumber(rollNumber?.slice(0, -1));
    setError('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!rollNumber) {
      setError(currentLanguage === 'en' ?'Please enter your roll number' :'Por favor ingresa tu número de lista');
      return;
    }

    if (rollNumber?.length < 3) {
      setError(currentLanguage === 'en' ?'Roll number must be 3 digits' :'El número de lista debe tener 3 dígitos');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (validRollNumbers?.includes(rollNumber)) {
        const studentData = {
          rollNumber,
          className: selectedClass?.name,
          name: currentLanguage === 'en' 
            ? `Student ${rollNumber}` 
            : `Estudiante ${rollNumber}`,
          class: selectedClass
        };
        onLogin(studentData);
      } else {
        setError(currentLanguage === 'en' 
          ? `Invalid roll number. Try: ${validRollNumbers?.slice(0, 3)?.join(', ')}` 
          : `Número de lista inválido. Prueba: ${validRollNumbers?.slice(0, 3)?.join(', ')}`);
      }
      setIsLoading(false);
    }, 1500);
  };

  const numericKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0']
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Class Info Header */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${selectedClass?.color} rounded-lg flex items-center justify-center`}>
            <Icon name={selectedClass?.icon} size={24} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{selectedClass?.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedClass?.teacher}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            iconName="ArrowLeft"
            iconSize={18}
          >
            {currentLanguage === 'en' ? 'Back' : 'Atrás'}
          </Button>
        </div>
      </div>
      {/* Login Form */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="User" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {currentLanguage === 'en' ? 'Enter Roll Number' : 'Ingresa tu Número de Lista'}
          </h2>
          <p className="text-muted-foreground">
            {currentLanguage === 'en' ?'Please enter your 3-digit roll number' :'Por favor ingresa tu número de lista de 3 dígitos'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Roll Number Input */}
          <div>
            <Input
              type="text"
              label={currentLanguage === 'en' ? 'Roll Number' : 'Número de Lista'}
              placeholder={currentLanguage === 'en' ? 'Enter 3-digit roll number' : 'Ingresa número de 3 dígitos'}
              value={rollNumber}
              onChange={(e) => handleRollNumberChange(e?.target?.value)}
              error={error}
              className="text-center text-2xl font-bold"
              maxLength={3}
              required
            />
          </div>

          {/* Numeric Keypad for Mobile */}
          {showNumericKeypad && (
            <div className="bg-muted rounded-xl p-4">
              <div className="grid gap-3">
                {numericKeys?.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-3">
                    {row?.map((digit) => (
                      <Button
                        key={digit}
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => handleNumericKeypadClick(digit)}
                        className="w-16 h-16 text-xl font-bold"
                        disabled={rollNumber?.length >= 3}
                      >
                        {digit}
                      </Button>
                    ))}
                  </div>
                ))}
                
                {/* Backspace Button */}
                <div className="flex justify-center mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={handleBackspace}
                    iconName="Delete"
                    iconSize={20}
                    className="w-16 h-16"
                    disabled={rollNumber?.length === 0}
                  >
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            iconName="LogIn"
            iconPosition="right"
            className="w-full"
            disabled={rollNumber?.length < 3}
          >
            {isLoading 
              ? (currentLanguage === 'en' ? 'Logging in...' : 'लॉग इन हो रहा है...') 
              : (currentLanguage === 'en' ? 'Login to Dashboard' : 'Iniciar Sesión al Panel')}
          </Button>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {currentLanguage === 'en' ? 'Need Help?' : '¿Necesitas Ayuda?'}
              </h4>
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'en' 
                  ? `Valid roll numbers for demo: ${validRollNumbers?.slice(0, 5)?.join(', ')}`
                  : `Números de lista válidos para demo: ${validRollNumbers?.slice(0, 5)?.join(', ')}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollNumberInput;