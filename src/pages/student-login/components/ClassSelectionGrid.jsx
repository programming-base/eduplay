import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassSelectionGrid = ({ onClassSelect, currentLanguage }) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const classData = [
    {
      id: 'class-6',
      name: currentLanguage === 'en' ? 'Class 6' : 'Clase 6',
      teacher: currentLanguage === 'en' ? 'Ms. Sarah Johnson' : 'Sra. Sarah Johnson',
      studentCount: 28,
      color: 'from-blue-400 to-blue-600',
      icon: 'BookOpen',
      subjects: currentLanguage === 'en' ? ['Math', 'Science', 'English'] : ['Matemáticas', 'Ciencias', 'Inglés']
    },
    {
      id: 'class-7',
      name: currentLanguage === 'en' ? 'Class 7' : 'Clase 7',
      teacher: currentLanguage === 'en' ? 'Mr. David Wilson' : 'Sr. David Wilson',
      studentCount: 32,
      color: 'from-green-400 to-green-600',
      icon: 'GraduationCap',
      subjects: currentLanguage === 'en' ? ['Math', 'Science', 'History'] : ['Matemáticas', 'Ciencias', 'Historia']
    },
    {
      id: 'class-8',
      name: currentLanguage === 'en' ? 'Class 8' : 'Clase 8',
      teacher: currentLanguage === 'en' ? 'Ms. Emily Davis' : 'Sra. Emily Davis',
      studentCount: 25,
      color: 'from-purple-400 to-purple-600',
      icon: 'Users',
      subjects: currentLanguage === 'en' ? ['Math', 'Physics', 'Chemistry'] : ['Matemáticas', 'Física', 'Química']
    },
    {
      id: 'class-9',
      name: currentLanguage === 'en' ? 'Class 9' : 'Clase 9',
      teacher: currentLanguage === 'en' ? 'Mr. Michael Brown' : 'Sr. Michael Brown',
      studentCount: 30,
      color: 'from-orange-400 to-orange-600',
      icon: 'Award',
      subjects: currentLanguage === 'en' ? ['Math', 'Biology', 'Geography'] : ['Matemáticas', 'Biología', 'Geografía']
    },
    {
      id: 'class-10',
      name: currentLanguage === 'en' ? 'Class 10' : 'Clase 10',
      teacher: currentLanguage === 'en' ? 'Ms. Lisa Anderson' : 'Sra. Lisa Anderson',
      studentCount: 27,
      color: 'from-red-400 to-red-600',
      icon: 'Trophy',
      subjects: currentLanguage === 'en' ? ['Math', 'Physics', 'English'] : ['Matemáticas', 'Física', 'Inglés']
    },
    {
      id: 'class-11',
      name: currentLanguage === 'en' ? 'Class 11' : 'Clase 11',
      teacher: currentLanguage === 'en' ? 'Mr. James Taylor' : 'Sr. James Taylor',
      studentCount: 24,
      color: 'from-teal-400 to-teal-600',
      icon: 'Star',
      subjects: currentLanguage === 'en' ? ['Math', 'Chemistry', 'Biology'] : ['Matemáticas', 'Química', 'Biología']
    },
    {
      id: 'class-12',
      name: currentLanguage === 'en' ? 'Class 12' : 'Clase 12',
      teacher: currentLanguage === 'en' ? 'Ms. Jennifer White' : 'Sra. Jennifer White',
      studentCount: 22,
      color: 'from-indigo-400 to-indigo-600',
      icon: 'Crown',
      subjects: currentLanguage === 'en' ? ['Math', 'Physics', 'Computer Science'] : ['Matemáticas', 'Física', 'Informática']
    }
  ];

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem?.id);
    setTimeout(() => {
      onClassSelect(classItem);
    }, 300);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {currentLanguage === 'en' ? 'Select Your Class' : 'Selecciona Tu Clase'}
        </h2>
        <p className="text-muted-foreground text-lg">
          {currentLanguage === 'en' ?'Choose your class to continue with the login process' :'Elige tu clase para continuar con el proceso de inicio de sesión'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {classData?.map((classItem) => (
          <div
            key={classItem?.id}
            onClick={() => handleClassClick(classItem)}
            className={`relative bg-card border border-border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              selectedClass === classItem?.id 
                ? 'ring-2 ring-primary shadow-lg scale-105' 
                : 'hover:border-primary/50'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${classItem?.color} opacity-5 rounded-xl`} />
            
            {/* Class Icon */}
            <div className={`w-12 h-12 bg-gradient-to-br ${classItem?.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
              <Icon name={classItem?.icon} size={24} color="white" />
            </div>

            {/* Class Name */}
            <h3 className="text-xl font-bold text-center text-foreground mb-2">
              {classItem?.name}
            </h3>

            {/* Teacher Info */}
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{classItem?.teacher}</span>
            </div>

            {/* Student Count */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {classItem?.studentCount} {currentLanguage === 'en' ? 'students' : 'estudiantes'}
              </span>
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-1 justify-center">
              {classItem?.subjects?.slice(0, 3)?.map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>

            {/* Selection Indicator */}
            {selectedClass === classItem?.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} color="white" />
              </div>
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
      {/* Sample Course Access */}
      <div className="mt-12 text-center">
        <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto">
          <Icon name="Play" size={32} className="text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {currentLanguage === 'en' ? 'Try Sample Courses' : 'Prueba Cursos de Muestra'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {currentLanguage === 'en' ?'Explore our educational content without logging in' :'Explora nuestro contenido educativo sin iniciar sesión'}
          </p>
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full"
          >
            {currentLanguage === 'en' ? 'Access Sample Content' : 'Acceder al Contenido de Muestra'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassSelectionGrid;