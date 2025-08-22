import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Users, 
  BookOpen, 
  TrendingUp,
  Building,
  Award,
  Plus,
  Minus
} from 'lucide-react';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  reviewCount: number;
  image: string;
  establishedYear: number;
  studentsCount: number;
  coursesCount: number;
  placementRate: number;
  avgPackage: string;
  rankings: {
    nirf: number;
    qs: number;
  };
  fees: {
    tuition: string;
    hostel: string;
  };
  topRecruiters: string[];
}

const mockColleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology, Delhi',
    location: 'New Delhi, Delhi',
    type: 'Engineering',
    rating: 4.5,
    reviewCount: 342,
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1961,
    studentsCount: 8500,
    coursesCount: 45,
    placementRate: 95,
    avgPackage: '₹18.5 LPA',
    rankings: { nirf: 2, qs: 185 },
    fees: { tuition: '₹2.5 LPA', hostel: '₹25,000' },
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
  },
  {
    id: '2',
    name: 'Delhi University - North Campus',
    location: 'New Delhi, Delhi',
    type: 'University',
    rating: 4.2,
    reviewCount: 567,
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1922,
    studentsCount: 15000,
    coursesCount: 78,
    placementRate: 78,
    avgPackage: '₹8.2 LPA',
    rankings: { nirf: 12, qs: 521 },
    fees: { tuition: '₹15,000', hostel: '₹18,000' },
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Deloitte']
  },
  {
    id: '3',
    name: 'Birla Institute of Technology and Science',
    location: 'Pilani, Rajasthan',
    type: 'Engineering',
    rating: 4.4,
    reviewCount: 289,
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1964,
    studentsCount: 4200,
    coursesCount: 32,
    placementRate: 92,
    avgPackage: '₹16.8 LPA',
    rankings: { nirf: 25, qs: 651 },
    fees: { tuition: '₹4.5 LPA', hostel: '₹45,000' },
    topRecruiters: ['Adobe', 'Flipkart', 'Samsung', 'Oracle']
  }
];

interface CollegeComparisonProps {
  onClose: () => void;
}

export const CollegeComparison: React.FC<CollegeComparisonProps> = ({ onClose }) => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [availableColleges, setAvailableColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const { collegeData } = await import('../data/colleges');
        setAvailableColleges(collegeData);
        setSelectedColleges([collegeData[0], collegeData[1]]); // Default selection
      } catch (error) {
        console.error('Failed to load colleges:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadColleges();
  }, []);

  const addCollege = (college: College) => {
    if (selectedColleges.length < 3 && !selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const removeCollege = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== collegeId));
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

  const getComparisonColor = (values: number[], currentValue: number) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    if (currentValue === max && max !== min) return 'text-green-600 font-semibold';
    if (currentValue === min && max !== min) return 'text-red-600';
    return 'text-gray-900';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden fade-in-up">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">College Comparison</h2>
              <p className="text-purple-100">Compare colleges side by side</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}
          
          {/* College Selection */}
          {!loading && (
            <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selected Colleges ({selectedColleges.length}/3)
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedColleges.map((college) => (
                <div key={college.id} className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">{college.name}</span>
                  <button
                    onClick={() => removeCollege(college.id)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            {selectedColleges.length < 3 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Add College:</h4>
                <div className="flex flex-wrap gap-2">
                  {availableColleges
                    .filter(college => !selectedColleges.find(c => c.id === college.id))
                    .map((college) => (
                      <button
                        key={college.id}
                        onClick={() => addCollege(college)}
                        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span className="text-sm">{college.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
          )}

          {/* Comparison Table */}
          {!loading && selectedColleges.length > 0 && (
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900 w-48">Criteria</th>
                  {selectedColleges.map((college) => (
                    <th key={college.id} className="text-center p-4 min-w-64">
                      <div className="space-y-2">
                        <img 
                          src={college.image} 
                          alt={college.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm leading-tight">{college.name}</h4>
                          <p className="text-xs text-gray-600 flex items-center justify-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {college.location}
                          </p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Overall Rating */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Overall Rating</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex">{renderStars(college.rating)}</div>
                        <span className="font-semibold">{college.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">({college.reviewCount} reviews)</p>
                    </td>
                  ))}
                </tr>

                {/* Established Year */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Established</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4 text-center">
                      <span className="font-semibold">{college.establishedYear}</span>
                    </td>
                  ))}
                </tr>

                {/* Student Count */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Total Students</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className={`p-4 text-center ${getComparisonColor(selectedColleges.map(c => c.studentsCount), college.studentsCount)}`}>
                      <span className="font-semibold">{college.studentsCount.toLocaleString()}</span>
                    </td>
                  ))}
                </tr>

                {/* Courses */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Courses Offered</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className={`p-4 text-center ${getComparisonColor(selectedColleges.map(c => c.coursesCount), college.coursesCount)}`}>
                      <span className="font-semibold">{college.coursesCount}</span>
                    </td>
                  ))}
                </tr>

                {/* Placement Rate */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Placement Rate</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className={`p-4 text-center ${getComparisonColor(selectedColleges.map(c => c.placementRate), college.placementRate)}`}>
                      <span className="font-semibold">{college.placementRate}%</span>
                    </td>
                  ))}
                </tr>

                {/* Average Package */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Average Package</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4 text-center">
                      <span className="font-semibold text-green-600">{college.avgPackage}</span>
                    </td>
                  ))}
                </tr>

                {/* NIRF Ranking */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">NIRF Ranking</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className={`p-4 text-center ${getComparisonColor(selectedColleges.map(c => -c.rankings.nirf), -college.rankings.nirf)}`}>
                      <span className="font-semibold">#{college.rankings?.nirf || 'N/A'}</span>
                    </td>
                  ))}
                </tr>

                {/* QS Ranking */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">QS World Ranking</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className={`p-4 text-center ${getComparisonColor(selectedColleges.map(c => -c.rankings.qs), -college.rankings.qs)}`}>
                      <span className="font-semibold">#{college.rankings?.qs || 'N/A'}</span>
                    </td>
                  ))}
                </tr>

                {/* Tuition Fees */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Tuition Fees (Annual)</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4 text-center">
                      <span className="font-semibold">{college.fees?.tuition || 'N/A'}</span>
                    </td>
                  ))}
                </tr>

                {/* Hostel Fees */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Hostel Fees (Annual)</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4 text-center">
                      <span className="font-semibold">{college.fees?.hostel || 'N/A'}</span>
                    </td>
                  ))}
                </tr>

                {/* Top Recruiters */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Top Recruiters</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">
                      <div className="space-y-1">
                        {(college.topRecruiters || []).slice(0, 4).map((recruiter, index) => (
                          <div key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full text-center">
                            {recruiter}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              <span className="text-green-600 font-semibold">Green</span> indicates the best value, 
              <span className="text-red-600 font-semibold"> Red</span> indicates the lowest value
            </p>
            <button 
              onClick={onClose}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};