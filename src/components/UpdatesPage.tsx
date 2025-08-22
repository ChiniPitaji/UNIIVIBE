import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Award, 
  BookOpen, 
  MessageSquare,
  Building,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  GraduationCap,
  Filter,
  Search,
  Clock,
  AlertCircle
} from 'lucide-react';
import { CampusUpdateForm } from './CampusUpdateForm';

interface Update {
  id: string;
  studentName: string;
  studentBatch: string;
  title: string;
  content: string;
  category: 'event' | 'placement' | 'academics' | 'infrastructure' | 'general';
  tags: string[];
  likes: number;
  comments: number;
  date: string;
  verified: boolean;
  isUrgent: boolean;
  college: string;
}

const mockUpdates: Update[] = [
  {
    id: '1',
    studentName: 'Rahul Kumar',
    studentBatch: '2024',
    title: 'Microsoft on-campus placement drive next week',
    content: 'Microsoft will be conducting on-campus interviews for SDE roles from March 15-17. Eligibility criteria: CGPA > 7.5, no active backlogs. Registration deadline is March 10th. They\'re offering packages ranging from ₹18-25 LPA for freshers.',
    category: 'placement',
    tags: ['Microsoft', 'SDE', 'Campus Drive', 'Deadline'],
    likes: 128,
    comments: 24,
    date: '3 hours ago',
    verified: true,
    isUrgent: true,
    college: 'IIT Delhi'
  },
  {
    id: '2',
    studentName: 'Sneha Gupta',
    studentBatch: '2025',
    title: 'Annual Tech Fest "Technovation 2024" announced',
    content: 'This year\'s tech fest will feature workshops on AI/ML, blockchain, and cybersecurity. There will be hackathons with prize pools worth ₹5 lakhs! Registration opens tomorrow at 10 AM. Don\'t miss out on this amazing opportunity to showcase your skills.',
    category: 'event',
    tags: ['Tech Fest', 'Hackathon', 'AI/ML', 'Registration'],
    likes: 89,
    comments: 15,
    date: '6 hours ago',
    verified: true,
    isUrgent: false,
    college: 'IIT Delhi'
  },
  {
    id: '3',
    studentName: 'Vikash Singh',
    studentBatch: '2023',
    title: 'New AI/ML lab inaugurated in CSE department',
    content: 'State-of-the-art AI/ML lab with 50+ GPUs (RTX 4090, A100) and latest research equipment has been inaugurated. The lab is equipped with high-performance computing clusters and will be open for all CS and related branch students for research projects.',
    category: 'infrastructure',
    tags: ['AI/ML Lab', 'GPU', 'Research', 'CSE'],
    likes: 67,
    comments: 12,
    date: '1 day ago',
    verified: true,
    isUrgent: false,
    college: 'IIT Delhi'
  },
  {
    id: '4',
    studentName: 'Ananya Sharma',
    studentBatch: '2024',
    title: 'Semester exam schedule released',
    content: 'End semester examinations will begin from April 20th. The detailed timetable has been uploaded on the student portal. Make sure to check for any clashes and report them to the academic office by March 25th.',
    category: 'academics',
    tags: ['Exams', 'Schedule', 'Academic', 'Deadline'],
    likes: 45,
    comments: 8,
    date: '2 days ago',
    verified: true,
    isUrgent: true,
    college: 'IIT Delhi'
  }
];

interface UpdatesPageProps {
  isLoggedIn: boolean;
  isVerified: boolean;
  onLoginRequired: () => void;
  onVerificationRequired: () => void;
}

export const UpdatesPage: React.FC<UpdatesPageProps> = ({ 
  isLoggedIn, 
  isVerified, 
  onLoginRequired, 
  onVerificationRequired 
}) => {
  const [updates, setUpdates] = useState(mockUpdates);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const categories = [
    { value: 'all', label: 'All Updates', icon: MessageSquare },
    { value: 'event', label: 'Events', icon: Calendar },
    { value: 'placement', label: 'Placements', icon: Award },
    { value: 'academics', label: 'Academics', icon: BookOpen },
    { value: 'infrastructure', label: 'Infrastructure', icon: Building },
    { value: 'general', label: 'General', icon: MessageSquare }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'placement': return <Award className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'academics': return <BookOpen className="h-4 w-4" />;
      case 'infrastructure': return <Building className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'placement': return 'bg-green-100 text-green-800 border-green-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'academics': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'infrastructure': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredUpdates = updates
    .filter(update => {
      const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           update.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return b.likes - a.likes;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handlePostUpdate = () => {
    if (!isLoggedIn) {
      onLoginRequired();
    } else if (!isVerified) {
      onVerificationRequired();
    } else {
      setShowUpdateForm(true);
    }
  };

  const handleUpdateSubmit = (newUpdate: any) => {
    const update: Update = {
      id: Date.now().toString(),
      studentName: 'You',
      studentBatch: '2024',
      title: newUpdate.title,
      content: newUpdate.content,
      category: newUpdate.category,
      tags: newUpdate.tags,
      likes: 0,
      comments: 0,
      date: 'Just now',
      verified: true,
      isUrgent: newUpdate.isUrgent,
      college: newUpdate.collegeName
    };
    
    setUpdates([update, ...updates]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Updates</h1>
            <p className="text-gray-600">Real-time updates from verified students</p>
          </div>
          <button 
            onClick={handlePostUpdate}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 mt-4 md:mt-0"
          >
            <Plus className="h-4 w-4" />
            Post Update
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search updates, tags, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Updates List */}
        <div className="space-y-6">
          {filteredUpdates.map((update) => (
            <div key={update.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{update.studentName}</span>
                      {update.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <span className="text-sm text-gray-600">• {update.studentBatch}</span>
                      <span className="text-sm text-gray-600">• {update.college}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{update.date}</span>
                      {update.isUrgent && (
                        <span className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          <AlertCircle className="h-3 w-3" />
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(update.category)}`}>
                  {getCategoryIcon(update.category)}
                  {update.category}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">{update.title}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{update.content}</p>
              
              {/* Tags */}
              {update.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {update.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-6 pt-4 border-t">
                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{update.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">{update.comments} comments</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium">
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUpdates.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No updates found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Be the first to share a campus update!'}
            </p>
            <button 
              onClick={handlePostUpdate}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Post First Update
            </button>
          </div>
        )}
      </div>

      {showUpdateForm && (
        <CampusUpdateForm 
          collegeName="Your College"
          onClose={() => setShowUpdateForm(false)}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  );
};