import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Award, 
  BookOpen, 
  MessageSquare,
  Building,
  CheckCircle,
  AlertCircle,
  Tag
} from 'lucide-react';

interface CampusUpdateFormProps {
  collegeName: string;
  onClose: () => void;
  onSubmit: (update: any) => void;
}

export const CampusUpdateForm: React.FC<CampusUpdateFormProps> = ({ collegeName, onClose, onSubmit }) => {
  const [category, setCategory] = useState<'event' | 'placement' | 'academics' | 'infrastructure' | 'general'>('general');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');

  const categories = [
    { value: 'event', label: 'Events & Fests', icon: Calendar, color: 'purple' },
    { value: 'placement', label: 'Placements', icon: Award, color: 'green' },
    { value: 'academics', label: 'Academics', icon: BookOpen, color: 'blue' },
    { value: 'infrastructure', label: 'Infrastructure', icon: Building, color: 'orange' },
    { value: 'general', label: 'General', icon: MessageSquare, color: 'gray' }
  ];

  const suggestedTags = {
    event: ['Cultural Fest', 'Tech Fest', 'Workshop', 'Seminar', 'Competition', 'Registration'],
    placement: ['Campus Drive', 'Job Fair', 'Interview', 'Package', 'Internship', 'Deadline'],
    academics: ['Exam Schedule', 'Course Registration', 'New Course', 'Faculty', 'Research'],
    infrastructure: ['New Building', 'Hostel', 'Library', 'Lab', 'Cafeteria', 'WiFi'],
    general: ['Policy Change', 'Announcement', 'Holiday', 'Important', 'Update']
  };

  const getCategoryColor = (cat: string) => {
    const colors = {
      event: 'bg-purple-100 text-purple-800 border-purple-200',
      placement: 'bg-green-100 text-green-800 border-green-200',
      academics: 'bg-blue-100 text-blue-800 border-blue-200',
      infrastructure: 'bg-orange-100 text-orange-800 border-orange-200',
      general: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[cat as keyof typeof colors] || colors.general;
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 5) {
      setTags([...tags, tag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const update = {
      collegeName,
      category,
      title,
      content,
      tags,
      isUrgent,
      course,
      batch,
      date: new Date().toISOString()
    };

    onSubmit(update);
    onClose();
  };

  const isFormValid = title.trim() && content.trim() && course.trim() && batch.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Post Campus Update</h2>
              <p className="text-purple-100">UniiVibe - {collegeName}</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-purple-200">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g., B.Tech CSE"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="e.g., 2024"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Category *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value as any)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        category === cat.value
                          ? `border-${cat.color}-500 bg-${cat.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${
                        category === cat.value ? `text-${cat.color}-600` : 'text-gray-400'
                      }`} />
                      <div className={`text-sm font-medium ${
                        category === cat.value ? `text-${cat.color}-900` : 'text-gray-700'
                      }`}>
                        {cat.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief, descriptive title for your update"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide detailed information about this update. Include dates, deadlines, requirements, or any other relevant details..."
                rows={6}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Tags (Optional)</label>
              
              {/* Current Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${getCategoryColor(category)}`}
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Add New Tag */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => addTag(newTag)}
                  disabled={!newTag.trim() || tags.length >= 5}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              {/* Suggested Tags */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags[category].map((suggestedTag) => (
                    <button
                      key={suggestedTag}
                      type="button"
                      onClick={() => addTag(suggestedTag)}
                      disabled={tags.includes(suggestedTag) || tags.length >= 5}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {suggestedTag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Urgent Flag */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="urgent"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="urgent" className="text-sm text-gray-700">
                Mark as urgent/time-sensitive
              </label>
            </div>

            {/* Guidelines */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900 mb-2">Posting Guidelines</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Share accurate and verified information only</li>
                    <li>• Include relevant dates, deadlines, and requirements</li>
                    <li>• Use appropriate tags to help others find your update</li>
                    <li>• Be respectful and constructive in your communication</li>
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
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              Post Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};