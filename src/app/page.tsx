import React, { useState, useEffect } from 'react';
import { 
  Home, Users, Clock, Image, Settings, Plus, Search, Share2, 
  FileText, Camera, MapPin, Star, Bell, User, Download,
  Eye, Edit, Trash2, ChevronRight, Calendar, Heart,
  TreePine, BookOpen, Award, Globe
} from 'lucide-react';

// Enhanced Header Component
const Header = () => {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <TreePine className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">MyFamilyDynasty</h1>
              <p className="text-blue-100 text-sm">Preserving Your Legacy</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Enhanced Family Tree Component
const FamilyTree = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState('tree');
  
  const familyMembers = [
    { id: 1, name: 'John Doe', role: 'Self', birth: '1990', death: null, photo: '👤', x: 300, y: 200 },
    { id: 2, name: 'Mary Doe', role: 'Mother', birth: '1965', death: null, photo: '👩', x: 200, y: 100 },
    { id: 3, name: 'Robert Doe', role: 'Father', birth: '1963', death: '2020', photo: '👨', x: 400, y: 100 },
    { id: 4, name: 'Emma Smith', role: 'Grandmother', birth: '1940', death: '2015', photo: '👵', x: 100, y: 50 },
    { id: 5, name: 'Sarah Doe', role: 'Sister', birth: '1992', death: null, photo: '👧', x: 500, y: 200 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Family Tree</h2>
            <p className="text-gray-600 text-sm">Interactive genealogy visualization</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setViewMode(viewMode === 'tree' ? 'list' : 'tree')}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            {viewMode === 'tree' ? 'List View' : 'Tree View'}
          </button>
          <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'tree' ? (
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 min-h-96 overflow-auto">
          <svg className="absolute inset-0 w-full h-full">
            {/* Connection lines */}
            <line x1="200" y1="100" x2="300" y2="200" stroke="#94a3b8" strokeWidth="2" />
            <line x1="400" y1="100" x2="300" y2="200" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="50" x2="200" y2="100" stroke="#94a3b8" strokeWidth="2" />
            <line x1="300" y1="200" x2="500" y2="200" stroke="#94a3b8" strokeWidth="2" />
          </svg>
          
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                selectedMember?.id === member.id ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
              }`}
              style={{ left: member.x, top: member.y }}
              onClick={() => setSelectedMember(member)}
            >
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 min-w-32 text-center">
                <div className="text-3xl mb-2">{member.photo}</div>
                <h3 className="font-semibold text-gray-800 text-sm">{member.name}</h3>
                <p className="text-xs text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500">
                  {member.birth} - {member.death || 'Present'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{member.photo}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role} • {member.birth} - {member.death || 'Present'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMember && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">Selected: {selectedMember.name}</h3>
          <p className="text-blue-700 text-sm">Click to view full profile and add more details about {selectedMember.name}</p>
        </div>
      )}
    </div>
  );
};

// Enhanced Timeline Component
const Timeline = () => {
  const events = [
    { id: 1, year: '2023', title: 'Family Reunion', description: 'Annual gathering in Chicago', type: 'celebration' },
    { id: 2, year: '2020', title: 'Robert Doe passed away', description: 'Beloved father and grandfather', type: 'memorial' },
    { id: 3, year: '1990', title: 'John Doe born', description: 'Born in New York City', type: 'birth' },
    { id: 4, year: '1965', title: 'Mary and Robert married', description: 'Wedding in Boston', type: 'celebration' },
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'birth': return <Star className="w-4 h-4" />;
      case 'celebration': return <Heart className="w-4 h-4" />;
      case 'memorial': return <BookOpen className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'birth': return 'bg-green-500';
      case 'celebration': return 'bg-purple-500';
      case 'memorial': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-2 rounded-xl">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Family Timeline</h2>
            <p className="text-gray-600 text-sm">Chronicle of important events</p>
          </div>
        </div>
        <button className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-200 via-purple-400 to-purple-200"></div>
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex items-start space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${getEventColor(event.type)} shadow-lg z-10`}>
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{event.title}</h3>
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {event.year}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// AI-Powered Insights Component
const AiInsights = () => {
  const [insights, setInsights] = useState([
    { id: 1, type: 'match', title: 'Potential Relative Found', description: 'Sarah Johnson (85% match) might be related through your maternal line', confidence: 85 },
    { id: 2, type: 'record', title: 'Historical Record Available', description: 'Census record from 1940 found for Emma Smith', confidence: 92 },
    { id: 3, type: 'pattern', title: 'Migration Pattern Detected', description: 'Your family moved from Ireland to Boston in the 1890s', confidence: 78 },
  ]);

  const getInsightIcon = (type) => {
    switch (type) {
      case 'match': return <Users className="w-5 h-5" />;
      case 'record': return <FileText className="w-5 h-5" />;
      case 'pattern': return <MapPin className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-xl">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">AI Insights</h2>
            <p className="text-gray-600 text-sm">Discover new connections</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500 text-white p-2 rounded-lg">
                  {getInsightIcon(insight.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{insight.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      {insight.confidence}% confident
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition-colors">
                Investigate
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Media Gallery
const MediaGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'photos', 'documents', 'videos'];
  
  const media = [
    { id: 1, type: 'photo', title: 'Family Portrait 1965', category: 'photos', thumbnail: '📸' },
    { id: 2, type: 'document', title: 'Marriage Certificate', category: 'documents', thumbnail: '📄' },
    { id: 3, type: 'photo', title: 'Childhood Photos', category: 'photos', thumbnail: '📷' },
    { id: 4, type: 'video', title: 'Wedding Video', category: 'videos', thumbnail: '🎥' },
  ];

  const filteredMedia = selectedCategory === 'all' ? media : media.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-2 rounded-xl">
            <Image className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Media Gallery</h2>
            <p className="text-gray-600 text-sm">Photos, documents & videos</p>
          </div>
        </div>
        <button className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
          <Camera className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredMedia.map((item) => (
          <div key={item.id} className="group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="text-3xl mb-2 text-center">{item.thumbnail}</div>
            <h3 className="font-medium text-gray-800 text-sm text-center">{item.title}</h3>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Family Stories Component
const FamilyStories = () => {
  const stories = [
    { id: 1, title: 'The Great Migration', author: 'Mary Doe', date: '2023-11-15', excerpt: 'How our family came to America in search of new opportunities...' },
    { id: 2, title: 'War Stories', author: 'Robert Doe', date: '2020-05-10', excerpt: 'Tales from the battlefield and the strength that brought us home...' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 p-2 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Family Stories</h2>
            <p className="text-gray-600 text-sm">Preserve memories & tales</p>
          </div>
        </div>
        <button className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{story.title}</h3>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <p className="text-sm text-gray-600 mb-2">by {story.author}</p>
            <p className="text-sm text-gray-600 mb-3">{story.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{new Date(story.date).toLocaleDateString()}</span>
              <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Actions Panel
const QuickActions = () => {
  const actions = [
    { icon: <Users className="w-5 h-5" />, label: 'Add Member', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: <Camera className="w-5 h-5" />, label: 'Upload Photo', color: 'bg-green-500 hover:bg-green-600' },
    { icon: <Share2 className="w-5 h-5" />, label: 'Share Tree', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: <Download className="w-5 h-5" />, label: 'Export Data', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-xl text-white transition-colors ${action.color}`}
          >
            {action.icon}
            <span className="text-sm font-medium mt-2">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'family-tree', icon: <Users className="w-5 h-5" />, label: 'Family Tree' },
    { id: 'timeline', icon: <Clock className="w-5 h-5" />, label: 'Timeline' },
    { id: 'media', icon: <Image className="w-5 h-5" />, label: 'Media' },
    { id: 'stories', icon: <BookOpen className="w-5 h-5" />, label: 'Stories' },
    { id: 'insights', icon: <Award className="w-5 h-5" />, label: 'AI Insights' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="bg-white shadow-xl w-64 min-h-screen border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transi
            
            
