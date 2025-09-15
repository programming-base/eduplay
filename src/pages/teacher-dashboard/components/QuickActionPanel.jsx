import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ onQuickAction }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const quickActions = [
    {
      id: 'create-quiz',
      title: currentLanguage === 'en' ? 'Create Quiz' : 'Crear Quiz',
      description: currentLanguage === 'en' ? 'Build interactive assessments' : 'Crear evaluaciones interactivas',
      icon: 'HelpCircle',
      color: 'text-primary bg-primary/10 hover:bg-primary/20',
      shortcut: 'Ctrl+Q'
    },
    {
      id: 'upload-content',
      title: currentLanguage === 'en' ? 'Upload Content' : 'Subir Contenido',
      description: currentLanguage === 'en' ? 'Add learning materials' : 'Agregar materiales de aprendizaje',
      icon: 'Upload',
      color: 'text-secondary bg-secondary/10 hover:bg-secondary/20',
      shortcut: 'Ctrl+U'
    },
    {
      id: 'student-analysis',
      title: currentLanguage === 'en' ? 'Student Analysis' : 'Análisis de Estudiantes',
      description: currentLanguage === 'en' ? 'View detailed performance' : 'Ver rendimiento detallado',
      icon: 'BarChart3',
      color: 'text-accent bg-accent/10 hover:bg-accent/20',
      shortcut: 'Ctrl+A'
    },
    {
      id: 'send-announcement',
      title: currentLanguage === 'en' ? 'Send Announcement' : 'Enviar Anuncio',
      description: currentLanguage === 'en' ? 'Notify students and parents' : 'Notificar a estudiantes y padres',
      icon: 'Megaphone',
      color: 'text-success bg-success/10 hover:bg-success/20',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'schedule-class',
      title: currentLanguage === 'en' ? 'Schedule Class' : 'Programar Clase',
      description: currentLanguage === 'en' ? 'Plan upcoming sessions' : 'Planificar próximas sesiones',
      icon: 'Calendar',
      color: 'text-warning bg-warning/10 hover:bg-warning/20',
      shortcut: 'Ctrl+S'
    },
    {
      id: 'grade-assignments',
      title: currentLanguage === 'en' ? 'Grade Assignments' : 'Calificar Tareas',
      description: currentLanguage === 'en' ? 'Review submitted work' : 'Revisar trabajo enviado',
      icon: 'CheckCircle',
      color: 'text-error bg-error/10 hover:bg-error/20',
      shortcut: 'Ctrl+G'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: currentLanguage === 'en' ? 'Quiz Created' : 'Quiz Creado',
      details: currentLanguage === 'en' ? 'Mathematics - Algebra Basics' : 'Matemáticas - Fundamentos de Álgebra',
      timestamp: '2 hours ago',
      icon: 'HelpCircle',
      color: 'text-primary'
    },
    {
      id: 2,
      action: currentLanguage === 'en' ? 'Content Uploaded' : 'Contenido Subido',
      details: currentLanguage === 'en' ? 'Science Chapter 5 - Chemical Reactions' : 'Ciencias Capítulo 5 - Reacciones Químicas',
      timestamp: '4 hours ago',
      icon: 'Upload',
      color: 'text-secondary'
    },
    {
      id: 3,
      action: currentLanguage === 'en' ? 'Badge Awarded' : 'Insignia Otorgada',
      details: currentLanguage === 'en' ? 'Math Master to Emma Rodriguez' : 'Maestro de Matemáticas a Emma Rodriguez',
      timestamp: '6 hours ago',
      icon: 'Award',
      color: 'text-success'
    },
    {
      id: 4,
      action: currentLanguage === 'en' ? 'Announcement Sent' : 'Anuncio Enviado',
      details: currentLanguage === 'en' ? 'Upcoming parent-teacher meeting' : 'Próxima reunión de padres y maestros',
      timestamp: '1 day ago',
      icon: 'Megaphone',
      color: 'text-accent'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: currentLanguage === 'en' ? 'Grade Math Quiz' : 'Calificar Quiz de Matemáticas',
      dueDate: currentLanguage === 'en' ? 'Due today' : 'Vence hoy',
      priority: 'high',
      class: 'Grade 8A'
    },
    {
      id: 2,
      task: currentLanguage === 'en' ? 'Prepare Science Lesson' : 'Preparar Lección de Ciencias',
      dueDate: currentLanguage === 'en' ? 'Due tomorrow' : 'Vence mañana',
      priority: 'medium',
      class: 'Grade 8B'
    },
    {
      id: 3,
      task: currentLanguage === 'en' ? 'Review Assignment Submissions' : 'Revisar Envíos de Tareas',
      dueDate: currentLanguage === 'en' ? 'Due in 2 days' : 'Vence en 2 días',
      priority: 'low',
      class: 'Grade 8A'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityText = (priority) => {
    if (currentLanguage === 'en') {
      switch (priority) {
        case 'high': return 'High';
        case 'medium': return 'Medium';
        case 'low': return 'Low';
        default: return 'Unknown';
      }
    } else {
      switch (priority) {
        case 'high': return 'Alta';
        case 'medium': return 'Media';
        case 'low': return 'Baja';
        default: return 'Desconocida';
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {currentLanguage === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}
          </h2>
          <Button variant="ghost" size="sm" iconName="Settings" iconSize={16}>
            {currentLanguage === 'en' ? 'Customize' : 'Personalizar'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <div
              key={action?.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${action?.color} group`}
              onClick={() => onQuickAction(action?.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={action?.icon} size={24} />
                </div>
                <span className="text-xs opacity-60 font-mono">{action?.shortcut}</span>
              </div>
              <h3 className="font-semibold mb-1">{action?.title}</h3>
              <p className="text-sm opacity-80">{action?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'en' ? 'Recent Activities' : 'Actividades Recientes'}
          </h3>
          <Button variant="ghost" size="sm" iconName="Clock" iconSize={16}>
            {currentLanguage === 'en' ? 'View All' : 'Ver Todo'}
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors duration-150">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{activity?.action}</h4>
                <p className="text-xs text-muted-foreground">{activity?.details}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Tasks */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'en' ? 'Upcoming Tasks' : 'Tareas Próximas'}
          </h3>
          <Button variant="ghost" size="sm" iconName="Plus" iconSize={16}>
            {currentLanguage === 'en' ? 'Add Task' : 'Agregar Tarea'}
          </Button>
        </div>
        
        <div className="space-y-3">
          {upcomingTasks?.map((task) => (
            <div key={task?.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-sm transition-shadow duration-150">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{task?.task}</h4>
                  <p className="text-xs text-muted-foreground">{task?.class}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task?.priority)}`}>
                  {getPriorityText(task?.priority)}
                </span>
                <span className="text-xs text-muted-foreground">{task?.dueDate}</span>
                <Button variant="ghost" size="sm" iconName="Check" iconSize={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;