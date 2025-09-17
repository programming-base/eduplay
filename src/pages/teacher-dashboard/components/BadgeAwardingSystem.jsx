import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BadgeAwardingSystem = ({ onAwardBadge, onCreateCustomBadge }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showCreateBadge, setShowCreateBadge] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduplay-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const availableBadges = [
    {
      id: 'math-master',
  name: currentLanguage === 'en' ? 'Math Master' : 'गणित मास्टर',
  description: currentLanguage === 'en' ? 'Excellent performance in mathematics' : 'गणित में उत्कृष्ट प्रदर्शन',
      icon: 'Calculator',
      color: 'text-primary bg-primary/10',
      rarity: 'common'
    },
    {
      id: 'streak-champion',
  name: currentLanguage === 'en' ? 'Streak Champion' : 'स्ट्रिक चैंपियन',
  description: currentLanguage === 'en' ? '30-day learning streak' : '30-दिन की सीखने की स्ट्रिक',
      icon: 'Flame',
      color: 'text-accent bg-accent/10',
      rarity: 'rare'
    },
    {
      id: 'quiz-master',
  name: currentLanguage === 'en' ? 'Quiz Master' : 'क्विज मास्टर',
  description: currentLanguage === 'en' ? 'Perfect scores on 5 consecutive quizzes' : '5 लगातार क्विज़ में पूर्ण अंक',
      icon: 'Trophy',
      color: 'text-success bg-success/10',
      rarity: 'epic'
    },
    {
      id: 'helpful-peer',
  name: currentLanguage === 'en' ? 'Helpful Peer' : 'सहायक साथी',
  description: currentLanguage === 'en' ? 'Helped classmates with learning' : 'सहपाठियों की मदद की',
      icon: 'Heart',
      color: 'text-secondary bg-secondary/10',
      rarity: 'common'
    },
    {
      id: 'creative-thinker',
  name: currentLanguage === 'en' ? 'Creative Thinker' : 'रचनात्मक विचारक',
  description: currentLanguage === 'en' ? 'Innovative problem-solving approach' : 'नवोन्मेषी समस्या समाधान दृष्टिकोण',
      icon: 'Lightbulb',
      color: 'text-warning bg-warning/10',
      rarity: 'rare'
    },
    {
      id: 'early-bird',
  name: currentLanguage === 'en' ? 'Early Bird' : 'जल्दी उठने वाला',
  description: currentLanguage === 'en' ? 'Consistently completes assignments early' : 'नियमित रूप से असाइनमेंट जल्दी पूरा करता है',
      icon: 'Sun',
      color: 'text-accent bg-accent/10',
      rarity: 'common'
    }
  ];

  const students = [
    { id: 1, name: "Emma Rodriguez", class: "Grade 8A" },
    { id: 2, name: "Marcus Johnson", class: "Grade 8A" },
    { id: 3, name: "Sophia Chen", class: "Grade 8B" },
    { id: 4, name: "David Kim", class: "Grade 8A" },
    { id: 5, name: "Isabella Martinez", class: "Grade 8B" }
  ];

  const recentAwards = [
    {
      id: 1,
      studentName: "Emma Rodriguez",
  badgeName: currentLanguage === 'en' ? 'Math Master' : 'गणित मास्टर',
      awardedDate: "2025-01-14",
  message: currentLanguage === 'en' ? 'Outstanding performance in algebra!' : 'बीजगणित में उत्कृष्ट प्रदर्शन!'
    },
    {
      id: 2,
      studentName: "Sophia Chen",
  badgeName: currentLanguage === 'en' ? 'Streak Champion' : 'स्ट्रिक चैंपियन',
      awardedDate: "2025-01-13",
  message: currentLanguage === 'en' ? 'Amazing 30-day learning streak!' : 'अद्भुत 30-दिन की सीखने की स्ट्रिक!'
    },
    {
      id: 3,
      studentName: "Marcus Johnson",
  badgeName: currentLanguage === 'en' ? 'Helpful Peer' : 'सहायक साथी',
      awardedDate: "2025-01-12",
  message: currentLanguage === 'en' ? 'Great teamwork and helping others!' : 'शानदार टीमवर्क और दूसरों की मदद!' 
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-muted-foreground';
      case 'rare': return 'border-accent';
      case 'epic': return 'border-success';
      case 'legendary': return 'border-warning';
      default: return 'border-muted-foreground';
    }
  };

  const handleAwardBadge = () => {
    if (selectedStudent && selectedBadge) {
      const student = students?.find(s => s?.id?.toString() === selectedStudent);
      const badge = availableBadges?.find(b => b?.id === selectedBadge);
      
      onAwardBadge({
        studentId: selectedStudent,
        studentName: student?.name,
        badgeId: selectedBadge,
        badgeName: badge?.name,
        message: customMessage || badge?.description
      });

      // Reset form
      setSelectedStudent('');
      setSelectedBadge('');
      setCustomMessage('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {currentLanguage === 'en' ? 'Badge Awarding System' : 'बैज पुरस्कार प्रणाली'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ? 'Recognize and motivate student achievements' : 'छात्र उपलब्धियों को पहचानें और प्रेरित करें'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCreateBadge(!showCreateBadge)}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          {currentLanguage === 'en' ? 'Create Badge' : 'बैज बनाएं'}
        </Button>
      </div>
      {/* Award Badge Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {currentLanguage === 'en' ? 'Select Student' : 'छात्र चुनें'}
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">{currentLanguage === 'en' ? 'Choose a student...' : 'एक छात्र चुनें...'}</option>
              {students?.map((student) => (
                <option key={student?.id} value={student?.id}>
                  {student?.name} - {student?.class}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {currentLanguage === 'en' ? 'Select Badge' : 'बैज चुनें'}
            </label>
            <select
              value={selectedBadge}
              onChange={(e) => setSelectedBadge(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">{currentLanguage === 'en' ? 'Choose a badge...' : 'एक बैज चुनें...'}</option>
              {availableBadges?.map((badge) => (
                <option key={badge?.id} value={badge?.id}>
                  {badge?.name} ({badge?.rarity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {currentLanguage === 'en' ? 'Custom Message (Optional)' : 'कस्टम संदेश (वैकल्पिक)'}
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e?.target?.value)}
              placeholder={currentLanguage === 'en' ? 'Add a personal message...' : 'एक व्यक्तिगत संदेश जोड़ें...'}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none"
              rows={3}
            />
          </div>

          <Button
            variant="default"
            onClick={handleAwardBadge}
            disabled={!selectedStudent || !selectedBadge}
            iconName="Award"
            iconPosition="left"
            iconSize={16}
            className="w-full"
          >
            {currentLanguage === 'en' ? 'Award Badge' : 'बैज प्रदान करें'}
          </Button>
        </div>

        {/* Badge Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            {currentLanguage === 'en' ? 'Badge Preview' : 'बैज पूर्वावलोकन'}
          </h3>
          {selectedBadge ? (
            <div className="p-4 border border-border rounded-lg bg-muted/50">
              {(() => {
                const badge = availableBadges?.find(b => b?.id === selectedBadge);
                return (
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${badge?.color} ${getRarityColor(badge?.rarity)} border-2 flex items-center justify-center`}>
                      <Icon name={badge?.icon} size={32} />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{badge?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{badge?.description}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge?.rarity)} border`}>
                      {badge?.rarity?.charAt(0)?.toUpperCase() + badge?.rarity?.slice(1)}
                    </span>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="p-8 border border-dashed border-border rounded-lg text-center">
              <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {currentLanguage === 'en' ? 'Select a badge to see preview' : 'पूर्वावलोकन देखने के लिए एक बैज चुनें'}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Available Badges Grid */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          {currentLanguage === 'en' ? 'Available Badges' : 'उपलब्ध बैज'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableBadges?.map((badge) => (
            <div
              key={badge?.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedBadge === badge?.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedBadge(badge?.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full ${badge?.color} ${getRarityColor(badge?.rarity)} border-2 flex items-center justify-center`}>
                  <Icon name={badge?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{badge?.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge?.description}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge?.rarity)} border`}>
                    {badge?.rarity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Awards */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">
          {currentLanguage === 'en' ? 'Recent Awards' : 'हाल के पुरस्कार'}
        </h3>
        <div className="space-y-3">
          {recentAwards?.map((award) => (
            <div key={award?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Award" size={18} className="text-success" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{award?.studentName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'en' ? 'Awarded' : 'प्रदान किया गया'} "{award?.badgeName}" • {award?.awardedDate}
                  </p>
                  {award?.message && (
                    <p className="text-xs text-muted-foreground italic">"{award?.message}"</p>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" iconName="Eye" iconSize={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeAwardingSystem;