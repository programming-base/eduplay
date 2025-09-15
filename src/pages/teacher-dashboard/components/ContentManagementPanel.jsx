import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentManagementPanel = ({ onUpload, onCreateQuiz, onManageContent }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const contentTypes = [
    {
      id: 'syllabus',
      icon: 'FileText',
      title: currentLanguage === 'en' ? 'Upload Syllabus' : 'Subir Programa',
      description: currentLanguage === 'en' ? 'Add course curriculum and learning objectives' : 'Agregar currículo del curso y objetivos de aprendizaje',
      color: 'text-primary bg-primary/10'
    },
    {
      id: 'assignment',
      icon: 'PenTool',
      title: currentLanguage === 'en' ? 'Create Assignment' : 'Crear Tarea',
      description: currentLanguage === 'en' ? 'Design homework and practice exercises' : 'Diseñar tareas y ejercicios de práctica',
      color: 'text-secondary bg-secondary/10'
    },
    {
      id: 'quiz',
      icon: 'HelpCircle',
      title: currentLanguage === 'en' ? 'Build Quiz' : 'Crear Quiz',
      description: currentLanguage === 'en' ? 'Create interactive assessments and tests' : 'Crear evaluaciones y pruebas interactivas',
      color: 'text-accent bg-accent/10'
    },
    {
      id: 'multimedia',
      icon: 'Video',
      title: currentLanguage === 'en' ? 'Add Media' : 'Agregar Multimedia',
      description: currentLanguage === 'en' ? 'Upload videos, images, and audio content' : 'Subir videos, imágenes y contenido de audio',
      color: 'text-success bg-success/10'
    }
  ];

  const recentUploads = [
    {
      id: 1,
      name: "Mathematics Chapter 5 - Algebra Basics",
      type: "syllabus",
      uploadDate: "2025-01-12",
      size: "2.4 MB",
      status: "active"
    },
    {
      id: 2,
      name: "Science Quiz - Chemical Reactions",
      type: "quiz",
      uploadDate: "2025-01-11",
      questions: 15,
      status: "draft"
    },
    {
      id: 3,
      name: "History Assignment - World War II",
      type: "assignment",
      uploadDate: "2025-01-10",
      dueDate: "2025-01-20",
      status: "active"
    }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      onUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'syllabus': return 'FileText';
      case 'quiz': return 'HelpCircle';
      case 'assignment': return 'PenTool';
      case 'multimedia': return 'Video';
      default: return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {currentLanguage === 'en' ? 'Content Management' : 'Gestión de Contenido'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ? 'Create and manage your teaching materials' : 'Crear y gestionar sus materiales de enseñanza'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManageContent()}
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
        >
          {currentLanguage === 'en' ? 'Manage All' : 'Gestionar Todo'}
        </Button>
      </div>
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {contentTypes?.map((type) => (
          <div
            key={type?.id}
            className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => type?.id === 'quiz' ? onCreateQuiz() : onUpload(type?.id)}
          >
            <div className={`w-12 h-12 rounded-lg ${type?.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={type?.icon} size={24} />
            </div>
            <h3 className="font-medium text-foreground mb-1">{type?.title}</h3>
            <p className="text-xs text-muted-foreground">{type?.description}</p>
          </div>
        ))}
      </div>
      {/* Drag & Drop Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 mb-6 ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          {currentLanguage === 'en' ? 'Drag & Drop Files Here' : 'Arrastra y Suelta Archivos Aquí'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {currentLanguage === 'en' ? 'Or click to browse and select files' : 'O haz clic para navegar y seleccionar archivos'}
        </p>
        <Button variant="outline" size="sm" iconName="FolderOpen" iconPosition="left" iconSize={16}>
          {currentLanguage === 'en' ? 'Browse Files' : 'Explorar Archivos'}
        </Button>
      </div>
      {/* Recent Uploads */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">
          {currentLanguage === 'en' ? 'Recent Uploads' : 'Subidas Recientes'}
        </h3>
        <div className="space-y-3">
          {recentUploads?.map((upload) => (
            <div key={upload?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(upload?.type)} size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{upload?.name}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{upload?.uploadDate}</span>
                    {upload?.size && <span>{upload?.size}</span>}
                    {upload?.questions && <span>{upload?.questions} {currentLanguage === 'en' ? 'questions' : 'preguntas'}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(upload?.status)}`}>
                  {currentLanguage === 'en' ? upload?.status : 
                    upload?.status === 'active' ? 'Activo' : 
                    upload?.status === 'draft' ? 'Borrador' : 'Inactivo'}
                </span>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPanel;