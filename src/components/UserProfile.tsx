import React, { useState } from 'react';
import { 
  User, 
  Star, 
  MessageSquare, 
  Award, 
  Calendar,
  CheckCircle,
  TrendingUp,
  BookOpen,
  Users,
  Edit3,
  X
} from 'lucide-react';

interface UserStats {
  reviewsWritten: number;
  updatesPosted: number;
  helpfulVotes: number;
  joinDate: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  badges: string[];
  college: string;
  course: string;
  batch: string;
}

interface UserActivity {
  id: string;
  type: 'review' | 'update';
  title: string;
  college: string;
  date: string;
  rating?: number;
  likes: number;
  content: string;
}

const mockUserStats: UserStats = {
  reviewsWritten: 12,
  updatesPosted: 8,
  helpfulVotes: 156,
  joinDate: 'January 2024',
  verificationStatus: 'verified',
  badges: ['Verified Reviewer', 'Top Contributor', 'Campus Reporter'],
  college: 'IIT Delhi',
  course: 'B.Tech Computer Science',
  batch: '2024'
};

const mockUserActivity: UserActivity[] = [
  {
    id: '1',
    type: 'review',
    title: 'Excellent faculty and research opportunities',
    college: 'IIT Delhi',
    date: '2 days ago',
    rating: 5,
    likes: 23,
    content: 'The computer science department has world-class faculty members who are very supportive...'
  },
  {
    id: '2',
    type: 'update',
    title: 'Microsoft campus placement drive announced',
    college: 'IIT Delhi',
    date: '1 week ago',
    likes: 45,
    content: 'Microsoft will be conducting on-campus interviews for SDE roles from March 15-17...'
  },
  {
    id: '3',
    type: 'review',
    title: 'Great hostel facilities but food could be better',
    college: 'IIT Delhi',
    date: '2 weeks ago',
    rating: 4,
    likes: 18,
    content: 'The hostel rooms are spacious and well-maintained. WiFi connectivity is excellent...'
  }
];

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');
  const [userStats] = useState(mockUserStats);
  const [userActivity] = useState(mockUserActivity);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Verified Reviewer': return 'bg-green-100 text-green-800';
      case 'Top Contributor': return 'bg-blue-100 text-blue-800';
      case 'Campus Reporter': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Arjun Sharma</h2>
                <p className="text-indigo-100">UniiVibe Member • {userStats.college} • {userStats.course}</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-indigo-100">Verified Student</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'activity' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            My Activity
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'settings' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Settings
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Star className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{userStats.reviewsWritten}</div>
                  <div className="text-sm text-blue-700">Reviews Written</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">{userStats.updatesPosted}</div>
                  <div className="text-sm text-purple-700">Updates Posted</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">{userStats.helpfulVotes}</div>
                  <div className="text-sm text-green-700">Helpful Votes</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-orange-900">{userStats.joinDate}</div>
                  <div className="text-sm text-orange-700">Member Since</div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Badges</h3>
                <div className="flex flex-wrap gap-3">
                  {userStats.badges.map((badge, index) => (
                    <div key={index} className={`flex items-center gap-2 px-4 py-2 rounded-full ${getBadgeColor(badge)}`}>
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">College</label>
                    <p className="text-gray-900 font-medium">{userStats.college}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Course</label>
                    <p className="text-gray-900 font-medium">{userStats.course}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Batch</label>
                    <p className="text-gray-900 font-medium">{userStats.batch}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Verification Status</label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-medium capitalize">{userStats.verificationStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">My Recent Activity</h3>
              {userActivity.map((activity) => (
                <div key={activity.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'review' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'review' ? 
                          <Star className={`h-5 w-5 ${activity.type === 'review' ? 'text-blue-600' : 'text-purple-600'}`} /> :
                          <MessageSquare className={`h-5 w-5 ${activity.type === 'review' ? 'text-blue-600' : 'text-purple-600'}`} />
                        }
                      </div>
                      <div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                          activity.type === 'review' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {activity.type === 'review' ? 'Review' : 'Update'}
                        </div>
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.college} • {activity.date}</p>
                      </div>
                    </div>
                    {activity.rating && (
                      <div className="flex items-center gap-1">
                        {renderStars(activity.rating)}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4">{activity.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{activity.likes} helpful votes</span>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">Edit</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          value="Arjun Sharma"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          value="arjun.sharma@iitd.ac.in"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                        <input 
                          type="text" 
                          value="IIT Delhi"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                        <input 
                          type="text" 
                          value="B.Tech Computer Science"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Update Profile
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Privacy Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Show my name on reviews</p>
                          <p className="text-sm text-gray-600">Display your name instead of "Anonymous Student"</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Email notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about your college</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Profile visibility</p>
                          <p className="text-sm text-gray-600">Allow other students to view your profile</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-red-900 mb-4">Danger Zone</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};