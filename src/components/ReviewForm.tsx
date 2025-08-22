import React, { useState } from 'react';
import { 
  Star, 
  X, 
  Plus, 
  Minus, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ReviewFormProps {
  collegeName: string;
  onClose: () => void;
  onSubmit: (review: any) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ collegeName, onClose, onSubmit }) => {
  const [overallRating, setOverallRating] = useState(0);
  const [aspectRatings, setAspectRatings] = useState({
    academics: 0,
    faculty: 0,
    hostel: 0,
    campusLife: 0,
    placements: 0
  });
  const [title, setTitle] = useState('');
  const [pros, setPros] = useState(['']);
  const [cons, setCons] = useState(['']);
  const [detailedReview, setDetailedReview] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const aspects = [
    { key: 'academics', label: 'Academics', icon: '📚' },
    { key: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { key: 'hostel', label: 'Hostel', icon: '🏠' },
    { key: 'campusLife', label: 'Campus Life', icon: '🎉' },
    { key: 'placements', label: 'Placements', icon: '💼' }
  ];

  const renderStars = (rating: number, onRate: (rating: number) => void, size: 'sm' | 'lg' = 'sm') => {
    const stars = [];
    const sizeClass = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => onRate(i)}
          className={`${sizeClass} transition-colors ${
            i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'
          }`}
        >
          <Star className="w-full h-full" />
        </button>
      );
    }
    return stars;
  };

  const addPro = () => setPros([...pros, '']);
  const removePro = (index: number) => setPros(pros.filter((_, i) => i !== index));
  const updatePro = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
  };

  const addCon = () => setCons([...cons, '']);
  const removeCon = (index: number) => setCons(cons.filter((_, i) => i !== index));
  const updateCon = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const review = {
      collegeName,
      overallRating,
      aspectRatings,
      title,
      pros: pros.filter(p => p.trim()),
      cons: cons.filter(c => c.trim()),
      detailedReview,
      course,
      batch,
      isAnonymous,
      date: new Date().toISOString()
    };

    onSubmit(review);
    onClose();
  };

  const isFormValid = overallRating > 0 && title.trim() && course.trim() && batch.trim() && 
                     Object.values(aspectRatings).every(rating => rating > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Write Review</h2>
              <p className="text-blue-100">UniiVibe - {collegeName}</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g., B.Tech Computer Science"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch/Year</label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="e.g., 2024"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Overall Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Overall Rating *</label>
              <div className="flex items-center gap-2">
                {renderStars(overallRating, setOverallRating, 'lg')}
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  {overallRating > 0 ? `${overallRating}/5` : 'Rate this college'}
                </span>
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience in one line"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Aspect Ratings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Rate Different Aspects *</label>
              <div className="grid md:grid-cols-2 gap-6">
                {aspects.map((aspect) => (
                  <div key={aspect.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{aspect.icon}</span>
                      <span className="font-medium text-gray-900">{aspect.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(
                        aspectRatings[aspect.key as keyof typeof aspectRatings], 
                        (rating) => setAspectRatings({...aspectRatings, [aspect.key]: rating})
                      )}
                      <span className="text-sm font-medium text-gray-600 w-8">
                        {aspectRatings[aspect.key as keyof typeof aspectRatings] || '-'}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">What did you like? (Pros)</label>
              <div className="space-y-3">
                {pros.map((pro, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={pro}
                        onChange={(e) => updatePro(index, e.target.value)}
                        placeholder="Add a positive point"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    {pros.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePro(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPro}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Add another pro
                </button>
              </div>
            </div>

            {/* Cons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">What could be improved? (Cons)</label>
              <div className="space-y-3">
                {cons.map((con, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={con}
                        onChange={(e) => updateCon(index, e.target.value)}
                        placeholder="Add an area for improvement"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    {cons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCon(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCon}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Add another con
                </button>
              </div>
            </div>

            {/* Detailed Review */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Review</label>
              <textarea
                value={detailedReview}
                onChange={(e) => setDetailedReview(e.target.value)}
                placeholder="Share your detailed experience - campus life, faculty, facilities, placements, etc."
                rows={6}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Privacy Option */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Post this review anonymously
              </label>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Be honest and constructive in your feedback</li>
                    <li>• Focus on your personal experience</li>
                    <li>• Avoid using offensive language or personal attacks</li>
                    <li>• Your review will be moderated before publishing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};