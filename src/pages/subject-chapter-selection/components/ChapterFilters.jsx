import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChapterFilters = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  practiceMode, 
  onPracticeModeToggle,
  showSearch = true 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const filterOptions = [
    {
      key: 'all',
  label: currentLanguage === 'en' ? 'All Chapters' : 'सभी अध्याय',
      icon: 'BookOpen',
      color: 'text-foreground'
    },
    {
      key: 'available',
  label: currentLanguage === 'en' ? 'Available' : 'उपलब्ध',
      icon: 'Play',
      color: 'text-success'
    },
    {
      key: 'in-progress',
  label: currentLanguage === 'en' ? 'In Progress' : 'प्रगति में',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      key: 'completed',
  label: currentLanguage === 'en' ? 'Completed' : 'पूर्ण',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      key: 'locked',
  label: currentLanguage === 'en' ? 'Locked' : 'लॉक किए गए',
      icon: 'Lock',
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((filter) => (
            <Button
              key={filter?.key}
              variant={activeFilter === filter?.key ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter?.key)}
              iconName={filter?.icon}
              iconPosition="left"
              iconSize={16}
              className={`${activeFilter !== filter?.key ? filter?.color : ''}`}
            >
              {filter?.label}
            </Button>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Practice Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPracticeModeToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                practiceMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  practiceMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-foreground">
              {currentLanguage === 'en' ? 'Practice Mode' : 'अभ्यास मोड'}
            </span>
            <div className="group relative">
              <Icon name="Info" size={16} className="text-muted-foreground cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-popover border border-border rounded-md shadow-lg text-xs text-foreground opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {currentLanguage === 'en' ? 'Practice mode allows you to revisit completed chapters without affecting your progress.' : 'अभ्यास मोड आपको अपनी प्रगति को प्रभावित किए बिना पूर्ण अध्यायों को पुनः देखने की अनुमति देता है।'}
              </div>
            </div>
          </div>

          {/* Search */}
          {showSearch && (
            <div className="w-64">
              <Input
                type="search"
                placeholder={currentLanguage === 'en' ? 'Search chapters...' : 'अध्याय खोजें...'}
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
      {/* Active Filter Info */}
      {activeFilter !== 'all' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={16} />
              <span>
                {currentLanguage === 'en' ? 'Showing:' : 'दिखा रहे हैं:'} {filterOptions?.find(f => f?.key === activeFilter)?.label}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilterChange('all')}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              {currentLanguage === 'en' ? 'Clear Filter' : 'फ़िल्टर साफ़ करें'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterFilters;