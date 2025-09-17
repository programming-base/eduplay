import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentProgressTable = ({ onViewStudent, onAwardBadge, onSendMessage }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterClass, setFilterClass] = useState('all');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const studentsData = [
    {
      id: 1,
      name: "Emma Rodriguez",
      class: "Grade 8A",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      overallScore: 92,
      completedLessons: 28,
      totalLessons: 32,
      weakConcepts: ["Algebra", "Geometry"],
      strongConcepts: ["Arithmetic", "Statistics"],
      lastActive: "2025-01-14",
      streakDays: 15,
      badges: 8,
      level: 12,
      engagementScore: 95,
      status: "excellent"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      class: "Grade 8A",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      overallScore: 78,
      completedLessons: 24,
      totalLessons: 32,
      weakConcepts: ["Fractions", "Word Problems"],
      strongConcepts: ["Basic Operations", "Measurement"],
      lastActive: "2025-01-13",
      streakDays: 8,
      badges: 5,
      level: 9,
      engagementScore: 82,
      status: "good"
    },
    {
      id: 3,
      name: "Sophia Chen",
      class: "Grade 8B",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      overallScore: 88,
      completedLessons: 30,
      totalLessons: 32,
      weakConcepts: ["Probability"],
      strongConcepts: ["Algebra", "Geometry", "Statistics"],
      lastActive: "2025-01-14",
      streakDays: 22,
      badges: 12,
      level: 14,
      engagementScore: 91,
      status: "excellent"
    },
    {
      id: 4,
      name: "David Kim",
      class: "Grade 8A",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      overallScore: 65,
      completedLessons: 18,
      totalLessons: 32,
      weakConcepts: ["Algebra", "Geometry", "Word Problems"],
      strongConcepts: ["Basic Operations"],
      lastActive: "2025-01-12",
      streakDays: 3,
      badges: 3,
      level: 6,
      engagementScore: 68,
      status: "needs-attention"
    },
    {
      id: 5,
      name: "Isabella Martinez",
      class: "Grade 8B",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      overallScore: 85,
      completedLessons: 26,
      totalLessons: 32,
      weakConcepts: ["Statistics"],
      strongConcepts: ["Algebra", "Arithmetic", "Geometry"],
      lastActive: "2025-01-14",
      streakDays: 12,
      badges: 7,
      level: 11,
      engagementScore: 87,
      status: "good"
    }
  ];

  const classes = ['all', 'Grade 8A', 'Grade 8B'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10';
      case 'good': return 'text-accent bg-accent/10';
      case 'needs-attention': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    if (currentLanguage === 'en') {
      switch (status) {
        case 'excellent': return 'Excellent';
        case 'good': return 'Good';
        case 'needs-attention': return 'Needs Attention';
        default: return 'Unknown';
      }
    } else {
      switch (status) {
          case 'excellent': return 'उत्कृष्ट';
          case 'good': return 'अच्छा';
          case 'needs-attention': return 'ध्यान देने की आवश्यकता';
          default: return 'अज्ञात';
      }
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 75) return 'bg-accent';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedStudents = studentsData?.filter(student => filterClass === 'all' || student?.class === filterClass)?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
              {currentLanguage === 'en' ? 'Student Progress Tracking' : 'छात्र प्रगति ट्रैकिंग'}
          </h2>
          <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en' ? 'Monitor individual student performance and identify areas for improvement' : 'व्यक्तिगत छात्र प्रदर्शन की निगरानी करें और सुधार के क्षेत्रों की पहचान करें'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
          >
              <option value="all">{currentLanguage === 'en' ? 'All Classes' : 'सभी कक्षाएं'}</option>
            {classes?.slice(1)?.map((className) => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
              {currentLanguage === 'en' ? 'Filter' : 'फ़िल्टर'}
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th 
                className="text-left py-3 px-2 cursor-pointer hover:bg-muted/50 transition-colors duration-150"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">
                      {currentLanguage === 'en' ? 'Student' : 'छात्र'}
                  </span>
                  <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-2 cursor-pointer hover:bg-muted/50 transition-colors duration-150"
                onClick={() => handleSort('overallScore')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">
                      {currentLanguage === 'en' ? 'Score' : 'स्कोर'}
                  </span>
                  <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
                </div>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">
                    {currentLanguage === 'en' ? 'Progress' : 'प्रगति'}
                </span>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">
                    {currentLanguage === 'en' ? 'Weak Areas' : 'कमजोर क्षेत्र'}
                </span>
              </th>
              <th 
                className="text-left py-3 px-2 cursor-pointer hover:bg-muted/50 transition-colors duration-150"
                onClick={() => handleSort('engagementScore')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">
                      {currentLanguage === 'en' ? 'Engagement' : 'सक्रियता'}
                  </span>
                  <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
                </div>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">
                    {currentLanguage === 'en' ? 'Status' : 'स्थिति'}
                </span>
              </th>
              <th className="text-right py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">
                    {currentLanguage === 'en' ? 'Actions' : 'क्रियाएँ'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents?.map((student) => (
              <tr key={student?.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-150">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={student?.avatar}
                      alt={student?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-foreground">{student?.name}</h4>
                      <p className="text-sm text-muted-foreground">{student?.class}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-foreground">{student?.overallScore}%</span>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Award" size={12} />
                      <span>L{student?.level}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {student?.completedLessons}/{student?.totalLessons}
                      </span>
                      <span className="font-medium text-foreground">
                        {Math.round((student?.completedLessons / student?.totalLessons) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getProgressColor((student?.completedLessons / student?.totalLessons) * 100)}`}
                        style={{ width: `${(student?.completedLessons / student?.totalLessons) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex flex-wrap gap-1">
                    {student?.weakConcepts?.slice(0, 2)?.map((concept, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-error/10 text-error text-xs rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                    {student?.weakConcepts?.length > 2 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{student?.weakConcepts?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getProgressColor(student?.engagementScore)}`}
                        style={{ width: `${student?.engagementScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{student?.engagementScore}%</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student?.status)}`}>
                    {getStatusText(student?.status)}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewStudent(student?.id)}
                      iconName="Eye"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAwardBadge(student?.id)}
                      iconName="Award"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSendMessage(student?.id)}
                      iconName="MessageCircle"
                      iconSize={16}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{filteredAndSortedStudents?.filter(s => s?.status === 'excellent')?.length}</div>
              <div className="text-sm text-muted-foreground">{currentLanguage === 'en' ? 'Excellent' : 'उत्कृष्ट'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{filteredAndSortedStudents?.filter(s => s?.status === 'good')?.length}</div>
              <div className="text-sm text-muted-foreground">{currentLanguage === 'en' ? 'Good' : 'अच्छा'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">{filteredAndSortedStudents?.filter(s => s?.status === 'needs-attention')?.length}</div>
              <div className="text-sm text-muted-foreground">{currentLanguage === 'en' ? 'Need Attention' : 'ध्यान देने की आवश्यकता'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{Math.round(filteredAndSortedStudents?.reduce((acc, s) => acc + s?.overallScore, 0) / filteredAndSortedStudents?.length)}%</div>
              <div className="text-sm text-muted-foreground">{currentLanguage === 'en' ? 'Avg. Score' : 'औसत स्कोर'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressTable;