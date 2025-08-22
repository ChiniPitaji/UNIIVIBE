import React, { useState } from 'react';
import { useEffect } from 'react';
import { 
  Search, 
  Star, 
  MapPin, 
  Users, 
  BookOpen, 
  TrendingUp,
  Shield,
  CheckCircle,
  MessageSquare,
  ThumbsUp,
  Calendar,
  Award,
  Building,
  GraduationCap,
  Menu,
  X,
  Filter,
  Plus,
  Settings,
  BarChart3,
  User,
  Brain
} from 'lucide-react';
import { AdminDashboard } from './components/AdminDashboard';
import { CollegeComparison } from './components/CollegeComparison';
import { UserProfile } from './components/UserProfile';
import { UpdatesPage } from './components/UpdatesPage';
import { SmartCollegeDiscovery } from './components/SmartCollegeDiscovery';
import { TrustMeter } from './components/TrustMeter';
import { CampusExplorer } from './components/CampusExplorer';
import { VideoTestimonials } from './components/VideoTestimonials';
import { QASection } from './components/QASection';
import { ReviewForm } from './components/ReviewForm';
import { InteractiveMap } from './components/InteractiveMap';
import { collegeData, fetchCollegeData, searchColleges } from './data/colleges';
import type { College } from './data/colleges';


interface Review {
  id: string;
  studentName: string;
  studentBatch: string;
  course: string;
  rating: number;
  title: string;
  content: string;
  likes: number;
  date: string;
  verified: boolean;
  aspects: {
    academics: number;
    faculty: number;
    facilities: number;
    placement: number;
  };
}

interface Update {
  id: string;
  studentName: string;
  studentBatch: string;
  title: string;
  content: string;
  category: 'event' | 'placement' | 'academics' | 'general';
  likes: number;
  comments: number;
  date: string;
  verified: boolean;
}


const mockReviews: Review[] = [
  {
    id: '1',
    studentName: 'Arjun Sharma',
    studentBatch: '2024',
    course: 'Computer Science',
    rating: 5,
    title: 'Exceptional academics and placement opportunities',
    content: 'The faculty here is world-class and the research opportunities are abundant. Campus life is vibrant with great facilities.',
    likes: 45,
    date: '2 days ago',
    verified: true,
    aspects: {
      academics: 5,
      faculty: 5,
      facilities: 4,
      placement: 5
    }
  },
  {
    id: '2',
    studentName: 'Priya Patel',
    studentBatch: '2023',
    course: 'Electronics Engineering',
    rating: 4,
    title: 'Great infrastructure, could improve hostel food',
    content: 'Amazing labs and library facilities. The peer learning environment is excellent. However, hostel food quality needs improvement.',
    likes: 32,
    date: '1 week ago',
    verified: true,
    aspects: {
      academics: 4,
      faculty: 4,
      facilities: 5,
      placement: 4
    }
  }
];

const mockUpdates: Update[] = [
  {
    id: '1',
    studentName: 'Rahul Kumar',
    studentBatch: '2024',
    title: 'Microsoft on-campus placement drive next week',
    content: 'Microsoft will be conducting on-campus interviews for SDE roles from March 15-17. Eligibility criteria and registration details have been shared via college portal.',
    category: 'placement',
    likes: 128,
    comments: 24,
    date: '3 hours ago',
    verified: true
  },
  {
    id: '2',
    studentName: 'Sneha Gupta',
    studentBatch: '2025',
    title: 'Annual Tech Fest "Technovation 2024" announced',
    content: 'This year\'s tech fest will feature workshops, hackathons, and talks by industry leaders. Registration opens tomorrow. Prize pool worth ₹5 lakhs!',
    category: 'event',
    likes: 89,
    comments: 15,
    date: '6 hours ago',
    verified: true
  },
  {
    id: '3',
    studentName: 'Vikash Singh',
    studentBatch: '2023',
    title: 'New AI/ML lab inaugurated',
    content: 'State-of-the-art AI/ML lab with 50+ GPUs and latest research equipment has been inaugurated. Open for all CS and related branch students.',
    category: 'academics',
    likes: 67,
    comments: 12,
    date: '1 day ago',
    verified: true
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'colleges' | 'reviews' | 'updates' | 'login' | 'signup' | 'college-detail'>('home');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showCollegeComparison, setShowCollegeComparison] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSmartDiscovery, setShowSmartDiscovery] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'pending' | 'unverified'>('verified');

  // Load initial college data
  useEffect(() => {
    const loadColleges = async () => {
      setLoading(true);
      try {
        const data = await fetchCollegeData();
        setColleges(data);
      } catch (error) {
        console.error('Failed to load colleges:', error);
        setColleges(collegeData); // Fallback to static data
      } finally {
        setLoading(false);
      }
    };
    
    loadColleges();
  }, []);

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      const data = await fetchCollegeData();
      setColleges(data);
      return;
    }
    
    setLoading(true);
    try {
      const results = await searchColleges(query);
      setColleges(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const stars = [];
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`${sizeClass} ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'placement': return <Award className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'academics': return <BookOpen className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'placement': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'academics': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('home')}>
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">UniiVibe</span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentView('colleges')}
              className={`text-sm font-medium transition-colors ${currentView === 'colleges' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Colleges
            </button>
            <button 
              onClick={() => setShowSmartDiscovery(true)}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Brain className="h-4 w-4" />
              Smart Discovery
            </button>
            <button 
              onClick={() => setCurrentView('reviews')}
              className={`text-sm font-medium transition-colors ${currentView === 'reviews' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Reviews
            </button>
            <button 
              onClick={() => setCurrentView('updates')}
              className={`text-sm font-medium transition-colors ${currentView === 'updates' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Campus Updates
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('login')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => setCurrentView('signup')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => { setCurrentView('colleges'); setIsMenuOpen(false); }}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Colleges
              </button>
              <button 
                onClick={() => { setCurrentView('reviews'); setIsMenuOpen(false); }}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => { setCurrentView('updates'); setIsMenuOpen(false); }}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Campus Updates
              </button>
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={() => { setShowCollegeComparison(true); setIsMenuOpen(false); }}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    Compare Colleges
                  </button>
                  <button 
                    onClick={() => { setShowUserProfile(true); setIsMenuOpen(false); }}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { setShowAdminDashboard(true); setIsMenuOpen(false); }}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    Admin Panel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setCurrentView('login'); setIsMenuOpen(false); }}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => { setCurrentView('signup'); setIsMenuOpen(false); }}
                    className="block px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg w-full text-left"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="h-12 w-12" />
              <span className="text-4xl font-bold">UniiVibe</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Authentic Reviews by <br />
              <span className="text-blue-200">Verified Students</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Make informed admission decisions with honest reviews and real-time campus updates from genuine students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentView('colleges')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Colleges
              </button>
              <button 
                onClick={() => setCurrentView('signup')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Join as Student
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 bg-white bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose UniiVibe?
            </h2>
            <p className="text-xl text-gray-600">
              Built by students, for students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Verified Students</h3>
              <p className="text-gray-600">
                Every reviewer is verified through college email IDs and student credentials. No fake reviews, guaranteed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Updates</h3>
              <p className="text-gray-600">
                Get live campus updates about placements, events, policy changes, and student life directly from current students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Comparison</h3>
              <p className="text-gray-600">
                Compare colleges side-by-side with detailed metrics, rankings, and student feedback to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <div className="text-blue-200">Verified Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">250+</div>
              <div className="text-blue-200">Colleges Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">5.8K+</div>
              <div className="text-blue-200">Honest Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200">Trust Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 bg-white bg-opacity-95">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make Informed Decisions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who trust UniiVibe for authentic college insights.
          </p>
          <button 
            onClick={() => setCurrentView('signup')}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg mr-4"
          >
            Get Started - It's Free
          </button>
          <button 
            onClick={() => setShowSmartDiscovery(true)}
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            <Brain className="h-5 w-5" />
            Try Smart Discovery
          </button>
        </div>
      </div>
    </div>
  );

  const CollegesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Colleges</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search colleges, courses, locations..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-gray-50 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button 
                onClick={() => setShowCollegeComparison(true)}
                className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
              >
                <BarChart3 className="h-4 w-4" />
                Compare
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <div key={college.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition-all cursor-pointer hover-card" onClick={() => { setSelectedCollege(college); setCurrentView('college-detail'); }}>
              <img src={college.image} alt={college.name} className="w-full h-48 object-cover rounded-t-2xl" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{college.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{college.type}</span>
                      {college.rankings?.nirf <= 10 && (
                        <span className="bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full">Top 10</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {renderStars(college.rating)}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">{college.rating}</span>
                  <span className="ml-2 text-sm text-gray-600">({college.reviewCount} reviews)</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Students:</span>
                    <span className="ml-1 font-medium">{college.studentsCount?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Courses:</span>
                    <span className="ml-1 font-medium">{college.coursesCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Placement:</span>
                    <span className="ml-1 font-medium text-green-600">{college.placementRate}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Package:</span>
                    <span className="ml-1 font-medium">{college.avgPackage}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CollegeDetailPage = () => {
    if (!selectedCollege) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setCurrentView('colleges')}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Colleges
          </button>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-8">
            <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-64 object-cover" />
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCollege.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{selectedCollege.location}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {renderStars(selectedCollege.rating, 'md')}
                    </div>
                    <span className="ml-2 text-lg font-semibold text-gray-900">{selectedCollege.rating}</span>
                    <span className="ml-2 text-gray-600">({selectedCollege.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <span onClick={() => setShowReviewForm(true)}>Write Review</span>
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Follow
                  </button>
                  <button 
                    onClick={() => setShowCollegeComparison(true)}
                    className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                  >
                    Compare
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Building className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{selectedCollege.establishedYear}</div>
                  <div className="text-sm text-gray-600">Established</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Users className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{selectedCollege.studentsCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <BookOpen className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{selectedCollege.coursesCount}</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{selectedCollege.placementRate}%</div>
                  <div className="text-sm text-gray-600">Placement</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Video Testimonials */}
                <VideoTestimonials collegeName={selectedCollege.name} />
                
                {/* Q&A Section */}
                <QASection collegeName={selectedCollege.name} />
                
                {/* Campus Explorer */}
                <CampusExplorer 
                  collegeName={selectedCollege.name} 
                  campusImageUrl={selectedCollege.image}
                />
                
                {/* Interactive Map */}
                <InteractiveMap 
                  collegeName={selectedCollege.name}
                  campusImageUrl={selectedCollege.image}
                />
                
                <div className="bg-white rounded-2xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{review.studentName}</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">• {review.studentBatch} • {review.course}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm font-medium">{review.rating}/5</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-4">{review.content}</p>
                      <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-600">Academics:</span>
                          <span className="ml-1 font-medium">{review.aspects.academics}/5</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Faculty:</span>
                          <span className="ml-1 font-medium">{review.aspects.faculty}/5</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Facilities:</span>
                          <span className="ml-1 font-medium">{review.aspects.facilities}/5</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Placement:</span>
                          <span className="ml-1 font-medium">{review.aspects.placement}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{review.likes}</span>
                        </button>
                        <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          Reply
                        </button>
                        <button className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Trust Meter */}
              <TrustMeter 
                score={92}
                verifiedReviews={285}
                totalReviews={342}
                engagementScore={88}
                flaggedCount={2}
              />
              
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Established:</span>
                    <span className="font-medium">{selectedCollege.establishedYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{selectedCollege.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Package:</span>
                    <span className="font-medium text-green-600">{selectedCollege.avgPackage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedCollege.location}</span>
                  </div>
                  {selectedCollege.rankings && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">NIRF Rank:</span>
                        <span className="font-medium">#{selectedCollege.rankings.nirf}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">QS Rank:</span>
                        <span className="font-medium">#{selectedCollege.rankings.qs}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Placement Statistics */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Placement Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Students:</span>
                    <span className="font-semibold">{selectedCollege.placementStats?.totalStudents || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students Placed:</span>
                    <span className="font-semibold text-green-600">{selectedCollege.placementStats?.placedStudents || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Placement Rate:</span>
                    <span className="font-semibold text-green-600">{selectedCollege.placementStats?.placementPercentage || selectedCollege.placementRate}%</span>
                  </div>
                </div>
              </div>

              {/* Branch Cutoffs */}
              {selectedCollege.branchCutoffs && (
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Branch-wise Cutoffs (Approx.)</h3>
                  <div className="space-y-3">
                    {selectedCollege.branchCutoffs.map((cutoff, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{cutoff.branch}</span>
                        <span className="text-sm font-semibold text-blue-600">{cutoff.rank}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    *Cutoffs may vary based on category, year, and exam pattern
                  </p>
                </div>
              )}

              {/* Best Feature */}
              {selectedCollege.bestFeature && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-900 mb-2">What Makes This College Special</h3>
                      <p className="text-blue-800 leading-relaxed">{selectedCollege.bestFeature}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedCollege.highlights && (
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Key Highlights</h3>
                  <div className="space-y-2">
                    {selectedCollege.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Campus Updates</h3>
                <div className="space-y-4">
                  {mockUpdates.slice(0, 3).map((update) => (
                    <div key={update.id} className="text-sm">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs mb-2 ${getCategoryColor(update.category)}`}>
                        {getCategoryIcon(update.category)}
                        {update.category}
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{update.title}</h4>
                      <p className="text-gray-600 text-xs">{update.date}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentView('updates')}
                  className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Updates →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReviewsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Reviews</h1>
            <p className="text-gray-600">Honest insights from verified students</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mt-4 md:mt-0">
            <Plus className="h-4 w-4" />
            Write Review
          </button>
        </div>

        <div className="space-y-8">
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm border p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{review.studentName}</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">• {review.studentBatch} • {review.course}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium">{review.rating}/5</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{review.title}</h3>
              <p className="text-gray-700 mb-6">{review.content}</p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Detailed Ratings</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{review.aspects.academics}</div>
                    <div className="text-sm text-gray-600">Academics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{review.aspects.faculty}</div>
                    <div className="text-sm text-gray-600">Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{review.aspects.facilities}</div>
                    <div className="text-sm text-gray-600">Facilities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{review.aspects.placement}</div>
                    <div className="text-sm text-gray-600">Placement</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Helpful ({review.likes})</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Reply
                </button>
                <button className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium">
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const UpdatesPage = () => (
    <UpdatesPage 
      isLoggedIn={isLoggedIn}
      isVerified={verificationStatus === 'verified'}
      onLoginRequired={() => setCurrentView('login')}
      onVerificationRequired={() => setShowVerificationFlow(true)}
    />
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">UniiVibe</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your verified account</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College Email</label>
              <input 
                type="email" 
                placeholder="your.name@college.edu"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </button>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setCurrentView('home');
              }}
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-600">Don't have an account? </span>
            <button 
              onClick={() => setCurrentView('signup')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SignUpPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">UniiVibe</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join as Student</h2>
            <p className="text-gray-600">Get verified and start sharing honest reviews</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College Email *</label>
              <input 
                type="email" 
                placeholder="your.name@college.edu"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">We'll send a verification link to this email</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College Name</label>
              <input 
                type="text" 
                placeholder="Enter your college name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course & Year</label>
              <input 
                type="text" 
                placeholder="e.g., B.Tech CSE 2024"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Verification Required</h4>
                  <p className="text-sm text-blue-700">
                    You'll need to verify your student status using your college email ID or student ID card.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1" />
              <span className="text-sm text-gray-600">
                I agree to the <button type="button" className="text-blue-600 hover:text-blue-700">Terms of Service</button> and <button type="button" className="text-blue-600 hover:text-blue-700">Privacy Policy</button>
              </span>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setCurrentView('home');
              }}
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <button 
              onClick={() => setCurrentView('login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {currentView === 'home' && <HomePage />}
      {currentView === 'colleges' && <CollegesPage />}
      {currentView === 'college-detail' && <CollegeDetailPage />}
      {currentView === 'reviews' && <ReviewsPage />}
      {currentView === 'updates' && <UpdatesPage 
        isLoggedIn={isLoggedIn}
        isVerified={verificationStatus === 'verified'}
        onLoginRequired={() => setCurrentView('login')}
        onVerificationRequired={() => setShowVerificationFlow(true)}
      />}
      {currentView === 'login' && <LoginPage />}
      {currentView === 'signup' && <SignUpPage />}
      
      {showAdminDashboard && <AdminDashboard onClose={() => setShowAdminDashboard(false)} />}
      {showCollegeComparison && <CollegeComparison onClose={() => setShowCollegeComparison(false)} />}
      {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}
      {showSmartDiscovery && (
        <SmartCollegeDiscovery 
          onClose={() => setShowSmartDiscovery(false)}
          onCollegeSelect={(college) => {
            setShowSmartDiscovery(false);
            // Find matching college and show details
            const matchingCollege = colleges.find(c => c.name.includes(college.name.split(' ')[0]));
            if (matchingCollege) {
              setSelectedCollege(matchingCollege);
              setCurrentView('college-detail');
            }
          }}
        />
      )}
      {showReviewForm && selectedCollege && (
        <ReviewForm 
          collegeName={selectedCollege.name}
          onClose={() => setShowReviewForm(false)}
          onSubmit={(review) => {
            console.log('New review submitted:', review);
            setShowReviewForm(false);
          }}
        />
      )}
    </div>
  );
}

export default App;