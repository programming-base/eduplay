import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageSwitcher = ({ className = '', size = 'sm', variant = 'ghost' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: 'US' },
    { code: 'hi', name: 'हिन्दी', flag: 'IN' }
  ];

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('eduplay-language', languageCode);
    setIsOpen(false);
    
    // Dispatch custom event for other components to listen to language changes
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: languageCode } 
    }));
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  const getOtherLanguages = () => {
    return languages?.filter(lang => lang?.code !== currentLanguage);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        iconName="Globe"
        iconSize={18}
        className="relative"
      >
        <span className="hidden sm:inline ml-1 font-medium">
          {getCurrentLanguage()?.code?.toUpperCase()}
        </span>
        <span className="sm:hidden ml-1">
          {getCurrentLanguage()?.flag}
        </span>
      </Button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-md shadow-lg z-20 animate-fade-in">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageChange(language?.code)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 flex items-center space-x-2 first:rounded-t-md last:rounded-b-md ${
                  currentLanguage === language?.code ? 'bg-muted text-primary font-medium' : 'text-foreground'
                }`}
              >
                <span className="text-base">{language?.flag}</span>
                <span>{language?.name}</span>
                {currentLanguage === language?.code && (
                  <Icon name="Check" size={16} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};  

export default LanguageSwitcher;
