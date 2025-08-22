import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  MessageCircle, 
  CheckCircle,
  Clock,
  User,
  Search,
  Filter
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  askerName: string;
  askerBatch?: string;
  college: string;
  category: string;
  upvotes: number;
  answers: Answer[];
  date: string;
  isAnswered: boolean;
}

interface Answer {
  id: string;
  content: string;
  answererName: string;
  answererBatch: string;
  answererCourse: string;
  upvotes: number;
  date: string;
  isVerified: boolean;
  isBestAnswer: boolean;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How is the placement scenario for CSE at IIT Delhi?',
    content: 'I\'m considering IIT Delhi for CSE. Can current students share insights about the placement process, average packages, and top recruiting companies?',
    askerName: 'Aspirant Student',
    college: 'IIT Delhi',
    category: 'Placements',
    upvotes: 23,
    date: '2 days ago',
    isAnswered: true,
    answers: [
      {
        id: '1',
        content: 'The placement scenario is excellent! Average package for CSE is around ₹18-20 LPA. Top companies like Google, Microsoft, Amazon regularly visit. The placement cell is very supportive and provides good preparation resources.',
        answererName: 'Arjun Sharma',
        answererBatch: '2024',
        answererCourse: 'B.Tech CSE',
        upvotes: 15,
        date: '1 day ago',
        isVerified: true,
        isBestAnswer: true
      },
      {
        id: '2',
        content: 'Adding to the above, internship opportunities are also great. Most students get PPOs (Pre-Placement Offers) from their internships. The coding culture here really helps in interview preparation.',
        answererName: 'Priya Patel',
        answererBatch: '2023',
        answererCourse: 'B.Tech CSE',
        upvotes: 8,
        date: '1 day ago',
        isVerified: true,
        isBestAnswer: false
      }
    ]
  },
  {
    id: '2',
    title: 'What is hostel life like at BITS Pilani?',
    content: 'I want to know about hostel facilities, food quality, internet connectivity, and overall living experience at BITS Pilani campus.',
    askerName: 'Curious Parent',
    college: 'BITS Pilani',
    category: 'Campus Life',
    upvotes: 18,
    date: '1 week ago',
    isAnswered: true,
    answers: [
      {
        id: '3',
        content: 'Hostel life is amazing! Rooms are spacious, WiFi is good (100+ Mbps), and the mess food is decent with variety. The hostel culture is very vibrant with lots of activities and events.',
        answererName: 'Rahul Kumar',
        answererBatch: '2025',
        answererCourse: 'B.Tech EEE',
        upvotes: 12,
        date: '5 days ago',
        isVerified: true,
        isBestAnswer: true
      }
    ]
  }
];

interface QASectionProps {
  collegeName: string;
}

export const QASection: React.FC<QASectionProps> = ({ collegeName }) => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [showAskForm, setShowAskForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  const categories = ['all', 'Academics', 'Placements', 'Campus Life', 'Hostel', 'Faculty', 'Facilities'];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const question: Question = {
      id: Date.now().toString(),
      title: newQuestion.title,
      content: newQuestion.content,
      askerName: 'You',
      college: collegeName,
      category: newQuestion.category,
      upvotes: 0,
      answers: [],
      date: 'Just now',
      isAnswered: false
    };
    
    setQuestions([question, ...questions]);
    setNewQuestion({ title: '', content: '', category: 'general' });
    setShowAskForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Q&A Section</h2>
          <p className="text-gray-600">Ask questions and get answers from verified students</p>
        </div>
        <button
          onClick={() => setShowAskForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ask Question
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    question.category === 'Placements' ? 'bg-green-100 text-green-800' :
                    question.category === 'Campus Life' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {question.category}
                  </span>
                  {question.isAnswered && (
                    <span className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle className="h-3 w-3" />
                      Answered
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h3>
                <p className="text-gray-700 mb-4">{question.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Asked by {question.askerName}</span>
                  <span>•</span>
                  <span>{question.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">{question.upvotes}</span>
              </button>
              <span className="flex items-center gap-1 text-gray-600 text-sm">
                <MessageCircle className="h-4 w-4" />
                {question.answers.length} answers
              </span>
            </div>

            {/* Answers */}
            {question.answers.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                {question.answers.map((answer) => (
                  <div key={answer.id} className={`p-4 rounded-lg ${answer.isBestAnswer ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    {answer.isBestAnswer && (
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Best Answer</span>
                      </div>
                    )}
                    <p className="text-gray-800 mb-3">{answer.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{answer.answererName}</span>
                          {answer.isVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{answer.answererBatch} {answer.answererCourse}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{answer.date}</span>
                      </div>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                        <span className="text-sm">{answer.upvotes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ask Question Modal */}
      {showAskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold">Ask a Question</h3>
              <p className="text-blue-100">UniiVibe - Get answers from verified students at {collegeName}</p>
            </div>
            
            <form onSubmit={handleAskQuestion} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="Academics">Academics</option>
                  <option value="Placements">Placements</option>
                  <option value="Campus Life">Campus Life</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Title</label>
                <input
                  type="text"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                  placeholder="What would you like to know?"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Details</label>
                <textarea
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                  placeholder="Provide more details about what you want to know..."
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAskForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Ask Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};