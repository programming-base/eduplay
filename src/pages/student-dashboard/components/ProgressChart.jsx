import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressChart = ({ progressData, className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('eduplay-language') || 'en';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {entry?.dataKey === 'xp' ? ' XP' : '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-secondary to-blue-400 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {currentLanguage === 'en' ? 'Learning Progress' : 'सीखने की प्रगति'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en' ? 'Last 7 days' : 'पिछले 7 दिन'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'line' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setChartType('line')}
            iconName="TrendingUp"
            iconSize={16}
          >
            {currentLanguage === 'en' ? 'Line' : 'रेखा'}
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setChartType('bar')}
            iconName="BarChart3"
            iconSize={16}
          >
            {currentLanguage === 'en' ? 'Bar' : 'बार'}
          </Button>
        </div>
      </div>
      {/* Chart Container */}
      <div className="h-64 w-full" aria-label="Student Progress Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="xp" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name={currentLanguage === 'en' ? 'XP Earned' : 'प्राप्त XP'}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                name={currentLanguage === 'en' ? 'Progress' : 'प्रगति'}
              />
            </LineChart>
          ) : (
            <BarChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="xp" 
                fill="var(--color-primary)"
                name={currentLanguage === 'en' ? 'XP Earned' : 'प्राप्त XP'}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {progressData?.reduce((sum, day) => sum + day?.xp, 0)}
          </p>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ? 'Total XP' : 'कुल XP'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {Math.round(progressData?.reduce((sum, day) => sum + day?.progress, 0) / progressData?.length)}%
          </p>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ? 'Avg Progress' : 'औसत प्रगति'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">
            {progressData?.filter(day => day?.xp > 0)?.length}
          </p>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ? 'Active Days' : 'सक्रिय दिन'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;