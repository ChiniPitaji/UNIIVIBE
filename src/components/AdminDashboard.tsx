import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Flag, 
  CheckCircle, 
  XCircle, 
  Eye,
  MessageSquare,
  Star,
  TrendingUp,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface PendingVerification {
  id: string;
  studentName: string;
  email: string;
  college: string;
  course: string;
  idCardUrl: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface FlaggedContent {
  id: string;
  type: 'review' | 'update';
  content: string;
  author: string;
  college: string;
  flagReason: string;
  flaggedBy: string;
  flaggedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

const mockPendingVerifications: PendingVerification[] = [
  {
    id: '1',
    studentName: 'Arjun Sharma',
    email: 'arjun.sharma@gmail.com',
    college: 'IIT Delhi',
    course: 'B.Tech Computer Science',
    idCardUrl: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
    submittedAt: '2 hours ago',
    status: 'pending'
  },
  {
    id: '2',
    studentName: 'Priya Patel',
    email: 'priya.patel@outlook.com',
    college: 'BITS Pilani',
    course: 'B.Tech Electronics',
    idCardUrl: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
    submittedAt: '5 hours ago',
    status: 'pending'
  }
];

const mockFlaggedContent: FlaggedContent[] = [
  {
    id: '1',
    type: 'review',
    content: 'This college is terrible, worst faculty ever. Complete waste of money and time.',
    author: 'Anonymous Student',
    college: 'Delhi University',
    flagReason: 'Inappropriate language',
    flaggedBy: 'Verified Student',
    flaggedAt: '1 hour ago',
    status: 'pending'
  },
  {
    id: '2',
    type: 'update',
    content: 'Fake placement news - Microsoft is not coming for campus recruitment.',
    author: 'Rahul Kumar',
    college: 'IIT Delhi',
    flagReason: 'Misinformation',
    flaggedBy: 'Student Moderator',
    flaggedAt: '3 hours ago',
    status: 'pending'
  }
];

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'verifications' | 'flagged' | 'stats'>('verifications');
  const [pendingVerifications, setPendingVerifications] = useState(mockPendingVerifications);
  const [flaggedContent, setFlaggedContent] = useState(mockFlaggedContent);

  const handleVerificationAction = (id: string, action: 'approve' | 'reject') => {
    setPendingVerifications(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
          : item
      )
    );
  };

  const handleFlaggedAction = (id: string, action: 'resolve' | 'dismiss') => {
    setFlaggedContent(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: action === 'resolve' ? 'resolved' : 'dismissed' }
          : item
      )
    );
  };

  const stats = {
    totalUsers: 1247,
    pendingVerifications: pendingVerifications.filter(v => v.status === 'pending').length,
    flaggedContent: flaggedContent.filter(c => c.status === 'pending').length,
    totalReviews: 3456,
    totalUpdates: 892
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <p className="text-blue-100">UniiVibe - Manage verifications and content moderation</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'verifications' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Verifications ({stats.pendingVerifications})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('flagged')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'flagged' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Flagged Content ({stats.flaggedContent})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'stats' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistics
            </div>
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'verifications' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Pending Student Verifications</h3>
              {pendingVerifications.filter(v => v.status === 'pending').map((verification) => (
                <div key={verification.id} className="bg-gray-50 rounded-xl p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{verification.studentName}</h4>
                      <p className="text-gray-600">{verification.email}</p>
                      <p className="text-sm text-gray-500">{verification.college} • {verification.course}</p>
                      <p className="text-xs text-gray-400 mt-1">Submitted {verification.submittedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-orange-600 font-medium">Pending Review</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Student ID Card:</p>
                    <img 
                      src={verification.idCardUrl} 
                      alt="Student ID" 
                      className="w-48 h-32 object-cover rounded-lg border"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVerificationAction(verification.id, 'approve')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleVerificationAction(verification.id, 'reject')}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'flagged' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Flagged Content</h3>
              {flaggedContent.filter(c => c.status === 'pending').map((content) => (
                <div key={content.id} className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          content.type === 'review' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {content.type === 'review' ? 'Review' : 'Update'}
                        </span>
                        <span className="text-sm text-gray-600">{content.college}</span>
                      </div>
                      <p className="text-gray-900 mb-2">{content.content}</p>
                      <p className="text-sm text-gray-600">By: {content.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600 font-medium">Flagged</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Reason:</span> {content.flagReason}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Flagged by {content.flaggedBy} • {content.flaggedAt}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleFlaggedAction(content.id, 'resolve')}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="h-4 w-4" />
                      Remove Content
                    </button>
                    <button
                      onClick={() => handleFlaggedAction(content.id, 'dismiss')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Dismiss Flag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Platform Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">Total Users</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">{stats.totalReviews.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Total Reviews</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">{stats.totalUpdates.toLocaleString()}</div>
                  <div className="text-sm text-purple-700">Campus Updates</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-900">{stats.pendingVerifications}</div>
                  <div className="text-sm text-orange-700">Pending Verifications</div>
                </div>
                <div className="bg-red-50 rounded-xl p-6 text-center">
                  <Flag className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-900">{stats.flaggedContent}</div>
                  <div className="text-sm text-red-700">Flagged Content</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-700">Trust Score</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};