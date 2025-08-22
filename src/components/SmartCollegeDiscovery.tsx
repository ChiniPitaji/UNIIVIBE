import React, { useState } from 'react';
import { 
  Brain, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  TrendingUp,
  Star,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Target,
  Award
} from 'lucide-react';

interface QuizStep {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'range' | 'text';
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
}

interface CollegeRecommendation {
  id: string;
  name: string;
  location: string;
  matchScore: number;
  reasons: string[];
  image: string;
  rating: number;
  avgPackage: string;
  fees: string;
  trustScore: number;
}

const quizSteps: QuizStep[] = [
  {
    id: 'budget',
    question: 'What\'s your budget for college fees per year?',
    type: 'single',
    options: ['Under ₹1 Lakh', '₹1-3 Lakhs', '₹3-5 Lakhs', '₹5+ Lakhs']
  },
  {
    id: 'interests',
    question: 'What are your primary interests?',
    type: 'multiple',
    options: ['Engineering', 'Medicine', 'Business', 'Arts & Humanities', 'Science', 'Law']
  },
  {
    id: 'location',
    question: 'Preferred location?',
    type: 'single',
    options: ['Same State', 'Metro Cities', 'Tier-2 Cities', 'Anywhere in India']
  },
  {
    id: 'examRank',
    question: 'What\'s your expected exam rank/percentile?',
    type: 'range',
    min: 1,
    max: 100,
    unit: 'percentile'
  },
  {
    id: 'priorities',
    question: 'What matters most to you?',
    type: 'multiple',
    options: ['High Placements', 'Research Opportunities', 'Campus Life', 'Faculty Quality', 'Infrastructure']
  }
];

const mockRecommendations: CollegeRecommendation[] = [
  {
    id: '1',
    name: 'IIT Delhi',
    location: 'New Delhi',
    matchScore: 95,
    reasons: ['Excellent placement record', 'Strong in your field of interest', 'Within budget range'],
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    avgPackage: '₹18.5 LPA',
    fees: '₹2.5 LPA',
    trustScore: 98
  },
  {
    id: '2',
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    matchScore: 88,
    reasons: ['Great campus culture', 'Industry connections', 'Flexible curriculum'],
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    avgPackage: '₹16.8 LPA',
    fees: '₹4.5 LPA',
    trustScore: 94
  },
  {
    id: '3',
    name: 'Delhi University',
    location: 'New Delhi',
    matchScore: 82,
    reasons: ['Affordable fees', 'Diverse courses', 'Great location'],
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    avgPackage: '₹8.2 LPA',
    fees: '₹15,000',
    trustScore: 89
  }
];

interface SmartCollegeDiscoveryProps {
  onClose: () => void;
  onCollegeSelect: (college: CollegeRecommendation) => void;
}

export const SmartCollegeDiscovery: React.FC<SmartCollegeDiscoveryProps> = ({ onClose, onCollegeSelect }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (stepId: string, answer: any) => {
    setAnswers({ ...answers, [stepId]: answer });
  };

  const nextStep = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Analyze and show results
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTrustColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-100';
    if (score >= 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

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

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Preferences</h3>
          <p className="text-gray-600">Our AI is finding the perfect colleges for you...</p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p>✓ Processing your budget preferences</p>
            <p>✓ Matching with college data</p>
            <p>✓ Analyzing student reviews</p>
            <p>✓ Calculating compatibility scores</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Your Perfect Matches</h2>
                  <p className="text-blue-100">AI-powered recommendations based on your preferences</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white hover:text-blue-200">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
              {mockRecommendations.map((college, index) => (
                <div key={college.id} className="bg-gradient-to-r from-white to-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <img 
                        src={college.image} 
                        alt={college.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{college.name}</h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{college.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(college.rating)}</div>
                            <span className="text-sm font-medium">{college.rating}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-5 w-5 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">{college.matchScore}%</span>
                          </div>
                          <p className="text-sm text-gray-600">Match Score</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3 border">
                          <div className="text-sm text-gray-600">Avg Package</div>
                          <div className="font-semibold text-green-600">{college.avgPackage}</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <div className="text-sm text-gray-600">Annual Fees</div>
                          <div className="font-semibold">{college.fees}</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <div className="text-sm text-gray-600">Trust Score</div>
                          <div className={`font-semibold px-2 py-1 rounded-full text-sm ${getTrustColor(college.trustScore)}`}>
                            {college.trustScore}%
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Why this college matches you:</h4>
                        <div className="flex flex-wrap gap-2">
                          {college.reasons.map((reason, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => onCollegeSelect(college)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => { setShowResults(false); setCurrentStep(0); setAnswers({}); }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuizStep = quizSteps[currentStep];
  const progress = ((currentStep + 1) / quizSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Smart College Discovery</h2>
                <p className="text-blue-100">Find your perfect college match</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="w-full bg-blue-400 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-blue-100 mt-2">
            Step {currentStep + 1} of {quizSteps.length}
          </p>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentQuizStep.question}</h3>
            
            {currentQuizStep.type === 'single' && (
              <div className="space-y-3">
                {currentQuizStep.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(currentQuizStep.id, option)}
                    className={`w-full p-4 text-left border-2 rounded-xl transition-all ${
                      answers[currentQuizStep.id] === option
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {answers[currentQuizStep.id] === option && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuizStep.type === 'multiple' && (
              <div className="space-y-3">
                {currentQuizStep.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      const current = answers[currentQuizStep.id] || [];
                      const updated = current.includes(option)
                        ? current.filter((item: string) => item !== option)
                        : [...current, option];
                      handleAnswer(currentQuizStep.id, updated);
                    }}
                    className={`w-full p-4 text-left border-2 rounded-xl transition-all ${
                      (answers[currentQuizStep.id] || []).includes(option)
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {(answers[currentQuizStep.id] || []).includes(option) && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuizStep.type === 'range' && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6">
                  <input
                    type="range"
                    min={currentQuizStep.min}
                    max={currentQuizStep.max}
                    value={answers[currentQuizStep.id] || 50}
                    onChange={(e) => handleAnswer(currentQuizStep.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{currentQuizStep.min}{currentQuizStep.unit}</span>
                    <span className="font-semibold text-blue-600">
                      {answers[currentQuizStep.id] || 50}{currentQuizStep.unit}
                    </span>
                    <span>{currentQuizStep.max}{currentQuizStep.unit}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            
            <button
              onClick={nextStep}
              disabled={!answers[currentQuizStep.id] || (currentQuizStep.type === 'multiple' && (!answers[currentQuizStep.id] || answers[currentQuizStep.id].length === 0))}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === quizSteps.length - 1 ? 'Get Recommendations' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};