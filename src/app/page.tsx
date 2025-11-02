import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { 
  Home, Users, Clock, Image, Settings, Plus, Search, Share2, 
  FileText, Camera, MapPin, Star, Bell, User, Download,
  Eye, Edit, Trash2, ChevronRight, Calendar, Heart,
  TreePine, BookOpen, Award, Globe, Filter, Upload,
  ZoomIn, Sparkles, TrendingUp, Activity, MessageCircle,
  Mail, Phone, Link as LinkIcon, ArrowRight
} from 'lucide-react';

// Animation styles
const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
  }
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
  .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; }
  .animate-scaleIn { animation: scaleIn 0.4s ease-out forwards; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-gradient { 
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }
  .delay-100 { animation-delay: 0.1s; opacity: 0; }
  .delay-200 { animation-delay: 0.2s; opacity: 0; }
  .delay-300 { animation-delay: 0.3s; opacity: 0; }
  .delay-400 { animation-delay: 0.4s; opacity: 0; }
  .delay-500 { animation-delay: 0.5s; opacity: 0; }
  .delay-600 { animation-delay: 0.6s; opacity: 0; }
  .glass-morphism {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  .card-glow::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .card-glow:hover::before {
    opacity: 1;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Enhanced Header
const Header = () => {
  const [notifications, setNotifications] = useState(3);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="glass-morphism sticky top-0 z-50 shadow-2xl border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 animate-fadeInUp">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 animate-pulse-glow"></div>
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-3 rounded-2xl shadow-xl">
                <TreePine className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                MyFamilyDynasty
              </h1>
              <p className="text-gray-600 text-sm font-semibold">Preserving Your Legacy Forever</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className={`relative transition-all duration-500 ease-out ${showSearch ? 'w-72' : 'w-12'}`}>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-all duration-300 z-10 hover:scale-110"
              >
                <Search className="w-5 h-5" />
              </button>
              {showSearch && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search family members..."
                  className="w-full pl-5 pr-12 py-3 bg-white/60 backdrop-blur-md border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg animate-slideInRight"
                  autoFocus
                />
              )}
            </div>

            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-2xl hover:shadow-xl transition-all hover-lift">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-scaleIn animate-pulse-glow">
                  {notifications}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3 glass-morphism rounded-2xl px-5 py-3 border-2 border-blue-100 hover-lift cursor-pointer shadow-lg">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-gradient">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-600 font-semibold">Premium Member ⭐</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Stats Cards
const StatsOverview = () => {
  const stats = [
    { label: 'Family Members', value: '127', change: '+12', trend: 'up', icon: <Users className="w-7 h-7" />, gradient: 'from-blue-500 via-cyan-500 to-teal-500' },
    { label: 'Generations', value: '8', change: '+1', trend: 'up', icon: <TrendingUp className="w-7 h-7" />, gradient: 'from-purple-500 via-pink-500 to-rose-500' },
    { label: 'Photos & Docs', value: '1,248', change: '+85', trend: 'up', icon: <Image className="w-7 h-7" />, gradient: 'from-orange-500 via-amber-500 to-yellow-500' },
    { label: 'Stories Shared', value: '42', change: '+5', trend: 'up', icon: <BookOpen className="w-7 h-7" />, gradient: 'from-green-500 via-emerald-500 to-teal-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`relative bg-white rounded-3xl p-6 shadow-xl hover-lift border border-gray-100 animate-fadeInUp delay-${(index + 1) * 100} overflow-hidden group`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-2xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full shadow-md">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-4xl font-black text-gray-800 mb-2">{stat.value}</h3>
            <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced Family Tree
const FamilyTree = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState('tree');
  const [zoom, setZoom] = useState(1);
  
  const familyMembers = [
    { id: 1, name: 'John Doe', role: 'Self', birth: '1990', death: null, photo: '👤', x: 300, y: 200, gradient: 'from-blue-400 via-blue-500 to-blue-600' },
    { id: 2, name: 'Mary Doe', role: 'Mother', birth: '1965', death: null, photo: '👩', x: 200, y: 100, gradient: 'from-pink-400 via-pink-500 to-pink-600' },
    { id: 3, name: 'Robert Doe', role: 'Father', birth: '1963', death: '2020', photo: '👨', x: 400, y: 100, gradient: 'from-purple-400 via-purple-500 to-purple-600' },
    { id: 4, name: 'Emma Smith', role: 'Grandmother', birth: '1940', death: '2015', photo: '👵', x: 100, y: 50, gradient: 'from-green-400 via-green-500 to-green-600' },
    { id: 5, name: 'Sarah Doe', role: 'Sister', birth: '1992', death: null, photo: '👧', x: 500, y: 200, gradient: 'from-orange-400 via-orange-500 to-orange-600' },
  ];

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover-lift overflow-hidden animate-fadeInUp delay-200">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur opacity-50"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-2xl shadow-xl">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Family Tree
              </h2>
              <p className="text-gray-600 text-sm font-semibold">Interactive genealogy visualization</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 glass-morphism rounded-2xl p-2 shadow-lg">
              <button 
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2.5 hover:bg-white rounded-xl transition-all hover-lift"
              >
                <ZoomIn className="w-4 h-4 rotate-180" />
              </button>
              <span className="text-sm font-bold px-3">{Math.round(zoom * 100)}%</span>
              <button 
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2.5 hover:bg-white rounded-xl transition-all hover-lift"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setViewMode(viewMode === 'tree' ? 'list' : 'tree')}
              className="px-5 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all hover-lift font-bold animate-gradient"
            >
              {viewMode === 'tree' ? '📋 List' : '🌳 Tree'}
            </button>
            <button className="p-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:shadow-2xl transition-all hover-lift">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'tree' ? (
          <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-10 min-h-[500px] overflow-auto shadow-inner">
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {[[200,100,300,200], [400,100,300,200], [100,50,200,100], [300,200,500,200]].map((coords, i) => (
                  <line 
                    key={i}
                    x1={coords[0]} y1={coords[1]} x2={coords[2]} y2={coords[3]} 
                    stroke="url(#lineGradient)" 
                    strokeWidth="4" 
                    strokeDasharray="8,4"
                    filter="url(#glow)"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="12" dur="0.6s" repeatCount="indefinite" />
                  </line>
                ))}
              </svg>
              
              {familyMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-115 hover:z-50 animate-fadeInUp delay-${(index + 1) * 100}`}
                  style={{ left: member.x, top: member.y }}
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${member.gradient} rounded-3xl shadow-2xl p-6 border-4 border-white min-w-[180px] hover-lift ${
                      selectedMember?.id === member.id ? 'ring-4 ring-yellow-400 scale-110' : ''
                    }`}>
                      <div className="text-5xl mb-3 text-center animate-float">{member.photo}</div>
                      <h3 className="font-black text-white text-center text-lg mb-1">{member.name}</h3>
                      <p className="text-xs text-white/90 text-center font-bold mb-2 uppercase tracking-wide">{member.role}</p>
                      <div className="text-xs text-white/80 text-center bg-white/25 rounded-xl px-3 py-1.5 font-semibold backdrop-blur-sm">
                        {member.birth} - {member.death || 'Present'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {familyMembers.map((member, index) => (
              <div 
                key={member.id} 
                className={`flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl hover:shadow-2xl transition-all hover-lift border-2 border-gray-100 animate-fadeInUp delay-${(index + 1) * 100} group`}
              >
                <div className="flex items-center space-x-5">
                  <div className={`relative text-4xl bg-gradient-to-br ${member.gradient} p-5 rounded-2xl shadow-xl group-hover:scale-110 transition-transform`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
                    <span className="relative">{member.photo}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800 text-xl mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold">{member.role} • {member.birth} - {member.death || 'Present'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all hover-lift">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all hover-lift">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-all hover-lift">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMember && (
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 rounded-3xl border-2 border-yellow-300 animate-scaleIn shadow-xl">
            <div className="flex items-center space-x-4 mb-3">
              <Sparkles className="w-7 h-7 text-yellow-600 animate-pulse" />
              <h3 className="font-black text-yellow-900 text-xl">Selected: {selectedMember.name}</h3>
            </div>
            <p className="text-yellow-800 font-semibold">Click to view full profile and add more details about {selectedMember.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Timeline with Charts
const Timeline = () => {
  const events = [
    { id: 1, year: '2023', title: 'Family Reunion', description: 'Annual gathering in Chicago', type: 'celebration', icon: '🎉' },
    { id: 2, year: '2020', title: 'Robert Doe passed away', description: 'Beloved father and grandfather', type: 'memorial', icon: '🕊️' },
    { id: 3, year: '1990', title: 'John Doe born', description: 'Born in New York City', type: 'birth', icon: '🎂' },
    { id: 4, year: '1965', title: 'Mary and Robert married', description: 'Wedding in Boston', type: 'celebration', icon: '💒' },
  ];

  const chartData = [
    { year: '1940', members: 2 }, { year: '1960', members: 12 }, { year: '1980', members: 45 },
    { year: '2000', members: 89 }, { year: '2020', members: 127 },
  ];

  const getGradient = (type) => {
    const gradients = {
      birth: 'from-green-400 via-emerald-500 to-teal-500',
      celebration: 'from-purple-400 via-pink-500 to-rose-500',
      memorial: 'from-gray-400 via-gray-500 to-gray-600',
    };
    return gradients[type] || 'from-blue-400 via-blue-500 to-blue-600';
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover-lift overflow-hidden animate-fadeInUp delay-300">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-50 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl blur opacity-50"></div>
              <div className="relative bg-gradient-to-br from-purple-400 to-pink-600 p-4 rounded-2xl shadow-xl">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Family Timeline
              </h2>
              <p className="text-gray-600 text-sm font-semibold">Chronicle of important events</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-3.5 glass-morphism text-purple-700 rounded-2xl hover:shadow-xl transition-all hover-lift">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all hover-lift">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="mb-10 p-6 glass-morphism rounded-3xl shadow-xl">
          <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <span>Family Growth Over Time</span>
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                  border: 'none', 
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  padding: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Area type="monotone" dataKey="members" stroke="#a855f7" strokeWidth={4} fillOpacity={1} fill="url(#colorMembers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline Events */}
        <div className="relative">
          <div className="absolute left-14 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-300 via-pink-400 to-purple-300 rounded-full shadow-lg"></div>
          <div className="space-y-10">
            {events.map((event, index) => (
              <div key={event.id} className={`relative flex items-start space-x-7 animate-fadeInUp delay-${(index + 1) * 100}`}>
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl text-white bg-gradient-to-br ${getGradient(event.type)} shadow-2xl z-10 hover-lift text-2xl border-4 border-white`}>
                  {event.icon}
                </div>
                <div className="flex-1 glass-morphism rounded-3xl p-7 hover:shadow-2xl transition-all hover-lift border border-gray-200 group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-gray-800 text-xl group-hover:text-purple-600 transition-colors">{event.title}</h3>
                    <span className="text-sm font-black text-white bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-full shadow-lg animate-gradient">
