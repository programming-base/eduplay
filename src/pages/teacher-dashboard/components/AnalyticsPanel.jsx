import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsPanel = ({ onExportReport, onViewDetailedAnalytics }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const performanceData = [
    { name: currentLanguage === 'en' ? 'Mon' : 'Lun', students: 85, engagement: 78, completion: 92 },
    { name: currentLanguage === 'en' ? 'Tue' : 'Mar', students: 88, engagement: 82, completion: 89 },
    { name: currentLanguage === 'en' ? 'Wed' : 'Mié', students: 92, engagement: 85, completion: 94 },
    { name: currentLanguage === 'en' ? 'Thu' : 'Jue', students: 87, engagement: 79, completion: 91 },
    { name: currentLanguage === 'en' ? 'Fri' : 'Vie', students: 90, engagement: 88, completion: 96 },
    { name: currentLanguage === 'en' ? 'Sat' : 'Sáb', students: 75, engagement: 72, completion: 85 },
    { name: currentLanguage === 'en' ? 'Sun' : 'Dom', students: 68, engagement: 65, completion: 78 }
  ];

  const subjectPerformance = [
    { name: currentLanguage === 'en' ? 'Mathematics' : 'Matemáticas', value: 92, color: '#4F46E5' },
    { name: currentLanguage === 'en' ? 'Science' : 'Ciencias', value: 88, color: '#06B6D4' },
    { name: currentLanguage === 'en' ? 'English' : 'Inglés', value: 85, color: '#F59E0B' },
    { name: currentLanguage === 'en' ? 'History' : 'Historia', value: 79, color: '#10B981' },
    { name: currentLanguage === 'en' ? 'Geography' : 'Geografía', value: 76, color: '#EF4444' }
  ];

  const engagementTrend = [
    { name: currentLanguage === 'en' ? 'Week 1' : 'Semana 1', value: 72 },
    { name: currentLanguage === 'en' ? 'Week 2' : 'Semana 2', value: 78 },
    { name: currentLanguage === 'en' ? 'Week 3' : 'Semana 3', value: 85 },
    { name: currentLanguage === 'en' ? 'Week 4' : 'Semana 4', value: 82 }
  ];

  const keyMetrics = [
    {
      id: 'total-students',
      title: currentLanguage === 'en' ? 'Total Students' : 'Total Estudiantes',
      value: '247',
      change: '+12',
      changeType: 'increase',
      icon: 'Users',
      color: 'text-primary bg-primary/10'
    },
    {
      id: 'avg-engagement',
      title: currentLanguage === 'en' ? 'Avg. Engagement' : 'Compromiso Promedio',
      value: '84%',
      change: '+5%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'text-success bg-success/10'
    },
    {
      id: 'completion-rate',
      title: currentLanguage === 'en' ? 'Completion Rate' : 'Tasa de Finalización',
      value: '91%',
      change: '+3%',
      changeType: 'increase',
      icon: 'CheckCircle',
      color: 'text-accent bg-accent/10'
    },
    {
      id: 'avg-score',
      title: currentLanguage === 'en' ? 'Average Score' : 'Puntuación Promedio',
      value: '87.5',
      change: '-2.1',
      changeType: 'decrease',
      icon: 'Award',
      color: 'text-secondary bg-secondary/10'
    }
  ];

  const timeframeOptions = [
    { value: 'week', label: currentLanguage === 'en' ? 'This Week' : 'Esta Semana' },
    { value: 'month', label: currentLanguage === 'en' ? 'This Month' : 'Este Mes' },
    { value: 'quarter', label: currentLanguage === 'en' ? 'This Quarter' : 'Este Trimestre' },
    { value: 'year', label: currentLanguage === 'en' ? 'This Year' : 'Este Año' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {currentLanguage === 'en' ? 'Analytics Dashboard' : 'Panel de Análisis'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ? 'Track student performance and engagement metrics' : 'Seguir el rendimiento y las métricas de participación de los estudiantes'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
          >
            {timeframeOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportReport('pdf')}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            {currentLanguage === 'en' ? 'Export' : 'Exportar'}
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {keyMetrics?.map((metric) => (
          <div key={metric?.id} className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${metric?.color} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric?.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={metric?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                />
                <span>{metric?.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{metric?.value}</h3>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
        ))}
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Chart */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-medium text-foreground mb-4">
            {currentLanguage === 'en' ? 'Weekly Performance' : 'Rendimiento Semanal'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completion" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="engagement" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-medium text-foreground mb-4">
            {currentLanguage === 'en' ? 'Subject Performance' : 'Rendimiento por Materia'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectPerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {subjectPerformance?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Engagement Trend */}
      <div className="p-4 bg-muted/50 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          {currentLanguage === 'en' ? 'Engagement Trend' : 'Tendencia de Participación'}
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportReport('excel')}
            iconName="FileSpreadsheet"
            iconPosition="left"
            iconSize={16}
          >
            {currentLanguage === 'en' ? 'Export Excel' : 'Exportar Excel'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportReport('pdf')}
            iconName="FileText"
            iconPosition="left"
            iconSize={16}
          >
            {currentLanguage === 'en' ? 'Export PDF' : 'Exportar PDF'}
          </Button>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetailedAnalytics()}
          iconName="BarChart3"
          iconPosition="left"
          iconSize={16}
        >
          {currentLanguage === 'en' ? 'Detailed Analytics' : 'Análisis Detallado'}
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsPanel;