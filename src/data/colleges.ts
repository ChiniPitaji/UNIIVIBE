export interface College {
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
  description: string;
  highlights: string[];
  campusSize: string;
  accreditation: string[];
  branchCutoffs: {
    branch: string;
    rank: string;
  }[];
  placementStats: {
    totalStudents: number;
    placedStudents: number;
    placementPercentage: number;
  };
  bestFeature: string;
}

export const collegeData: College[] = [
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
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Apple', 'Meta'],
    description: 'Premier engineering institute known for excellence in technology and research.',
    highlights: ['World-class faculty', 'Strong alumni network', 'Cutting-edge research', 'Industry partnerships'],
    campusSize: '320 acres',
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '1-150' },
      { branch: 'Electrical Engineering', rank: '150-300' },
      { branch: 'Mechanical Engineering', rank: '300-500' },
      { branch: 'Civil Engineering', rank: '500-800' }
    ],
    placementStats: {
      totalStudents: 1200,
      placedStudents: 1140,
      placementPercentage: 95
    },
    bestFeature: 'World-class research facilities and industry partnerships with global tech giants'
  },
  {
    id: '2',
    name: 'Indian Institute of Technology, Bombay',
    location: 'Mumbai, Maharashtra',
    type: 'Engineering',
    rating: 4.6,
    reviewCount: 456,
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1958,
    studentsCount: 9200,
    coursesCount: 52,
    placementRate: 96,
    avgPackage: '₹19.2 LPA',
    rankings: { nirf: 3, qs: 172 },
    fees: { tuition: '₹2.5 LPA', hostel: '₹28,000' },
    topRecruiters: ['Microsoft', 'Google', 'Amazon', 'JP Morgan', 'Samsung', 'Intel'],
    description: 'Leading technical university with strong industry connections and research focus.',
    highlights: ['Excellent placement record', 'Research excellence', 'Innovation hub', 'Global partnerships'],
    campusSize: '550 acres',
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '1-120' },
      { branch: 'Electrical Engineering', rank: '120-280' },
      { branch: 'Mechanical Engineering', rank: '280-450' },
      { branch: 'Chemical Engineering', rank: '450-650' }
    ],
    placementStats: {
      totalStudents: 1300,
      placedStudents: 1248,
      placementPercentage: 96
    },
    bestFeature: 'Strongest industry connections and highest placement packages in India'
  },
  {
    id: '3',
    name: 'Indian Institute of Science, Bangalore',
    location: 'Bangalore, Karnataka',
    type: 'Research Institute',
    rating: 4.7,
    reviewCount: 234,
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1909,
    studentsCount: 3500,
    coursesCount: 28,
    placementRate: 98,
    avgPackage: '₹22.5 LPA',
    rankings: { nirf: 1, qs: 155 },
    fees: { tuition: '₹1.8 LPA', hostel: '₹15,000' },
    topRecruiters: ['Google', 'Microsoft', 'IBM Research', 'Intel', 'Qualcomm', 'NVIDIA'],
    description: 'Premier research institute focusing on science and advanced technology.',
    highlights: ['Research excellence', 'PhD programs', 'International collaborations', 'Nobel laureate faculty'],
    campusSize: '400 acres',
    accreditation: ['NAAC A++', 'UGC'],
    branchCutoffs: [
      { branch: 'Physics', rank: '1-50' },
      { branch: 'Chemistry', rank: '50-100' },
      { branch: 'Mathematics', rank: '100-150' },
      { branch: 'Biology', rank: '150-200' }
    ],
    placementStats: {
      totalStudents: 800,
      placedStudents: 784,
      placementPercentage: 98
    },
    bestFeature: 'India\'s premier research institute with Nobel laureate faculty and cutting-edge research facilities'
  },
  {
    id: '4',
    name: 'Birla Institute of Technology and Science, Pilani',
    location: 'Pilani, Rajasthan',
    type: 'Engineering',
    rating: 4.4,
    reviewCount: 289,
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1964,
    studentsCount: 4200,
    coursesCount: 32,
    placementRate: 92,
    avgPackage: '₹16.8 LPA',
    rankings: { nirf: 25, qs: 651 },
    fees: { tuition: '₹4.5 LPA', hostel: '₹45,000' },
    topRecruiters: ['Adobe', 'Flipkart', 'Samsung', 'Oracle', 'Cisco', 'PayPal'],
    description: 'Prestigious private institute known for innovation and entrepreneurship.',
    highlights: ['Flexible curriculum', 'Strong alumni network', 'Innovation culture', 'Industry exposure'],
    campusSize: '328 acres',
    accreditation: ['NAAC A', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '200-1500' },
      { branch: 'Electronics & Communication', rank: '1500-3000' },
      { branch: 'Mechanical Engineering', rank: '3000-5000' },
      { branch: 'Chemical Engineering', rank: '5000-8000' }
    ],
    placementStats: {
      totalStudents: 950,
      placedStudents: 874,
      placementPercentage: 92
    },
    bestFeature: 'Unique flexible curriculum allowing students to design their own academic path'
  },
  {
    id: '5',
    name: 'Delhi University - North Campus',
    location: 'New Delhi, Delhi',
    type: 'University',
    rating: 4.2,
    reviewCount: 567,
    image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1922,
    studentsCount: 15000,
    coursesCount: 78,
    placementRate: 78,
    avgPackage: '₹8.2 LPA',
    rankings: { nirf: 12, qs: 521 },
    fees: { tuition: '₹15,000', hostel: '₹18,000' },
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Deloitte', 'EY', 'KPMG'],
    description: 'One of India\'s largest and most prestigious universities.',
    highlights: ['Diverse courses', 'Rich heritage', 'Cultural activities', 'Affordable education'],
    campusSize: '69 acres',
    accreditation: ['NAAC A++', 'UGC'],
    branchCutoffs: [
      { branch: 'Economics (Hons)', rank: '95-98%' },
      { branch: 'English (Hons)', rank: '92-95%' },
      { branch: 'Political Science', rank: '90-93%' },
      { branch: 'History (Hons)', rank: '88-91%' }
    ],
    placementStats: {
      totalStudents: 2500,
      placedStudents: 1950,
      placementPercentage: 78
    },
    bestFeature: 'Rich academic heritage with diverse courses and vibrant campus culture'
  },
  {
    id: '6',
    name: 'Jawaharlal Nehru University',
    location: 'New Delhi, Delhi',
    type: 'University',
    rating: 4.3,
    reviewCount: 423,
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1969,
    studentsCount: 8500,
    coursesCount: 45,
    placementRate: 85,
    avgPackage: '₹9.5 LPA',
    rankings: { nirf: 8, qs: 561 },
    fees: { tuition: '₹12,000', hostel: '₹8,000' },
    topRecruiters: ['Civil Services', 'UN Organizations', 'Think Tanks', 'Media Houses', 'NGOs'],
    description: 'Premier university known for social sciences and liberal arts.',
    highlights: ['Research focus', 'Diverse student body', 'Political awareness', 'Academic freedom'],
    campusSize: '1000 acres',
    accreditation: ['NAAC A++', 'UGC'],
    branchCutoffs: [
      { branch: 'International Relations', rank: '95-98%' },
      { branch: 'Economics', rank: '92-95%' },
      { branch: 'Political Science', rank: '90-93%' },
      { branch: 'Sociology', rank: '88-91%' }
    ],
    placementStats: {
      totalStudents: 1200,
      placedStudents: 1020,
      placementPercentage: 85
    },
    bestFeature: 'Leading center for social sciences research with complete academic freedom'
  },
  {
    id: '7',
    name: 'Indian Institute of Management, Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    type: 'Management',
    rating: 4.6,
    reviewCount: 312,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1961,
    studentsCount: 1200,
    coursesCount: 8,
    placementRate: 100,
    avgPackage: '₹28.5 LPA',
    rankings: { nirf: 1, qs: 78 },
    fees: { tuition: '₹23 LPA', hostel: '₹45,000' },
    topRecruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs', 'JP Morgan', 'Google'],
    description: 'India\'s premier management institute with global recognition.',
    highlights: ['Case study method', 'Industry connections', 'Global exposure', 'Leadership development'],
    campusSize: '60 acres',
    accreditation: ['NAAC A++', 'AACSB', 'EQUIS'],
    branchCutoffs: [
      { branch: 'MBA General', rank: '99.5+ %ile' },
      { branch: 'MBA-PGPX', rank: '99+ %ile' },
      { branch: 'Fellow Program', rank: '98+ %ile' }
    ],
    placementStats: {
      totalStudents: 400,
      placedStudents: 400,
      placementPercentage: 100
    },
    bestFeature: 'World-renowned case study method and highest management education standards in India'
  },
  {
    id: '8',
    name: 'All India Institute of Medical Sciences, Delhi',
    location: 'New Delhi, Delhi',
    type: 'Medical',
    rating: 4.8,
    reviewCount: 189,
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1956,
    studentsCount: 3500,
    coursesCount: 15,
    placementRate: 100,
    avgPackage: '₹12 LPA',
    rankings: { nirf: 1, qs: 251 },
    fees: { tuition: '₹5,000', hostel: '₹12,000' },
    topRecruiters: ['Government Hospitals', 'Private Hospitals', 'Research Institutes', 'International Organizations'],
    description: 'Premier medical institute and hospital in India.',
    highlights: ['Medical excellence', 'Research facilities', 'Patient care', 'Government support'],
    campusSize: '200 acres',
    accreditation: ['NAAC A++', 'MCI', 'WHO']
  },
  {
    id: '9',
    name: 'National Law School of India University',
    location: 'Bangalore, Karnataka',
    type: 'Law',
    rating: 4.5,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1987,
    studentsCount: 800,
    coursesCount: 6,
    placementRate: 95,
    avgPackage: '₹15.5 LPA',
    rankings: { nirf: 1, qs: 401 },
    fees: { tuition: '₹2.5 LPA', hostel: '₹35,000' },
    topRecruiters: ['Law Firms', 'Corporate Legal', 'Judiciary', 'Government', 'International Organizations'],
    description: 'India\'s premier law school with excellent academic standards.',
    highlights: ['Legal excellence', 'Moot court competitions', 'Research focus', 'Alumni network'],
    campusSize: '23 acres',
    accreditation: ['NAAC A++', 'BCI', 'UGC'],
    branchCutoffs: [
      { branch: 'BA LLB', rank: '1-200' },
      { branch: 'LLM', rank: '1-50' },
      { branch: 'PhD Law', rank: '1-20' }
    ],
    placementStats: {
      totalStudents: 150,
      placedStudents: 143,
      placementPercentage: 95
    },
    bestFeature: 'India\'s top law school with excellent moot court tradition and legal research'
  },
  {
    id: '10',
    name: 'Indian Statistical Institute, Kolkata',
    location: 'Kolkata, West Bengal',
    type: 'Statistics & Mathematics',
    rating: 4.4,
    reviewCount: 98,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1931,
    studentsCount: 1500,
    coursesCount: 12,
    placementRate: 90,
    avgPackage: '₹14.2 LPA',
    rankings: { nirf: 15, qs: 501 },
    fees: { tuition: '₹1.2 LPA', hostel: '₹18,000' },
    topRecruiters: ['Google', 'Microsoft', 'IBM', 'Banks', 'Research Institutes', 'Consulting Firms'],
    description: 'Premier institute for statistics, mathematics, and computer science.',
    highlights: ['Research excellence', 'Statistical expertise', 'Data science focus', 'Industry relevance'],
    campusSize: '125 acres',
    accreditation: ['NAAC A++', 'UGC'],
    branchCutoffs: [
      { branch: 'B.Stat', rank: '1-30' },
      { branch: 'B.Math', rank: '1-25' },
      { branch: 'M.Stat', rank: '1-40' },
      { branch: 'M.Math', rank: '1-35' }
    ],
    placementStats: {
      totalStudents: 180,
      placedStudents: 162,
      placementPercentage: 90
    },
    bestFeature: 'World-renowned center for statistical research and data science excellence'
  },
  {
    id: '11',
    name: 'Indian Institute of Technology, Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    type: 'Engineering',
    rating: 4.6,
    reviewCount: 298,
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1959,
    studentsCount: 7500,
    coursesCount: 42,
    placementRate: 94,
    avgPackage: '₹17.8 LPA',
    rankings: { nirf: 4, qs: 277 },
    fees: { tuition: '₹2.5 LPA', hostel: '₹22,000' },
    topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Adobe', 'Goldman Sachs', 'Uber'],
    description: 'One of the oldest IITs known for academic excellence and innovation.',
    highlights: ['Strong alumni network', 'Research excellence', 'Innovation hub', 'Industry partnerships'],
    campusSize: '1055 acres',
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '1-180' },
      { branch: 'Electrical Engineering', rank: '180-350' },
      { branch: 'Mechanical Engineering', rank: '350-550' },
      { branch: 'Aerospace Engineering', rank: '550-750' }
    ],
    placementStats: {
      totalStudents: 1100,
      placedStudents: 1034,
      placementPercentage: 94
    },
    bestFeature: 'Pioneer in computer science education in India with strong startup ecosystem'
  },
  {
    id: '12',
    name: 'Indian Institute of Technology, Kharagpur',
    location: 'Kharagpur, West Bengal',
    type: 'Engineering',
    rating: 4.5,
    reviewCount: 387,
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1951,
    studentsCount: 12000,
    coursesCount: 65,
    placementRate: 93,
    avgPackage: '₹16.5 LPA',
    rankings: { nirf: 5, qs: 281 },
    fees: { tuition: '₹2.5 LPA', hostel: '₹20,000' },
    topRecruiters: ['Tata Consultancy Services', 'Microsoft', 'Google', 'Samsung', 'Intel', 'Qualcomm'],
    description: 'First IIT established in India, known for its diverse academic programs.',
    highlights: ['Largest IIT campus', 'Diverse programs', 'Strong industry connections', 'Rich heritage'],
    campusSize: '2100 acres',
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '1-200' },
      { branch: 'Electronics & Communication', rank: '200-400' },
      { branch: 'Mechanical Engineering', rank: '400-650' },
      { branch: 'Mining Engineering', rank: '650-1200' }
    ],
    placementStats: {
      totalStudents: 1800,
      placedStudents: 1674,
      placementPercentage: 93
    },
    bestFeature: 'Largest IIT campus with most diverse range of academic programs and research facilities'
  },
  {
    id: '13',
    name: 'National Institute of Technology, Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    type: 'Engineering',
    rating: 4.3,
    reviewCount: 245,
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1964,
    studentsCount: 9500,
    coursesCount: 38,
    placementRate: 89,
    avgPackage: '₹12.5 LPA',
    rankings: { nirf: 9, qs: 801 },
    fees: { tuition: '₹1.8 LPA', hostel: '₹18,000' },
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'L&T'],
    description: 'Premier NIT known for engineering excellence and strong industry connections.',
    highlights: ['Strong placement record', 'Industry partnerships', 'Research focus', 'Cultural diversity'],
    campusSize: '800 acres',
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '1000-3000' },
      { branch: 'Electronics & Communication', rank: '3000-6000' },
      { branch: 'Mechanical Engineering', rank: '6000-10000' },
      { branch: 'Civil Engineering', rank: '10000-15000' }
    ],
    placementStats: {
      totalStudents: 1400,
      placedStudents: 1246,
      placementPercentage: 89
    },
    bestFeature: 'Top NIT with excellent placement record and strong industry partnerships across South India'
  },
  {
    id: '14',
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    type: 'Engineering',
    rating: 4.1,
    reviewCount: 456,
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1984,
    studentsCount: 45000,
    coursesCount: 85,
    placementRate: 85,
    avgPackage: '₹8.5 LPA',
    rankings: { nirf: 15, qs: 1001 },
    fees: { tuition: '₹1.98 LPA', hostel: '₹1.5 LPA' },
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'Amazon'],
    description: 'Large private university known for diverse programs and international exposure.',
    highlights: ['International collaborations', 'Diverse programs', 'Modern infrastructure', 'Industry exposure'],
    campusSize: '350 acres',
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '5000-15000' },
      { branch: 'Electronics & Communication', rank: '15000-25000' },
      { branch: 'Mechanical Engineering', rank: '25000-35000' },
      { branch: 'Information Technology', rank: '10000-20000' }
    ],
    placementStats: {
      totalStudents: 8000,
      placedStudents: 6800,
      placementPercentage: 85
    },
    bestFeature: 'Largest private university with extensive international collaborations and modern infrastructure'
  },
  {
    id: '15',
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    type: 'Engineering',
    rating: 4.0,
    reviewCount: 334,
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
    establishedYear: 1957,
    studentsCount: 8500,
    coursesCount: 28,
    placementRate: 82,
    avgPackage: '₹7.8 LPA',
    rankings: { nirf: 45, qs: 1201 },
    fees: { tuition: '₹3.2 LPA', hostel: '₹1.8 LPA' },
    topRecruiters: ['Infosys', 'TCS', 'Wipro', 'Accenture', 'IBM', 'Capgemini'],
    description: 'Well-established private institute known for quality education and campus life.',
    highlights: ['Quality education', 'Vibrant campus life', 'Industry connections', 'Alumni network'],
    campusSize: '600 acres',
    accreditation: ['NAAC A', 'NBA', 'AICTE'],
    branchCutoffs: [
      { branch: 'Computer Science', rank: '8000-20000' },
      { branch: 'Electronics & Communication', rank: '20000-35000' },
      { branch: 'Mechanical Engineering', rank: '35000-50000' },
      { branch: 'Information Technology', rank: '15000-30000' }
    ],
    placementStats: {
      totalStudents: 1200,
      placedStudents: 984,
      placementPercentage: 82
    },
    bestFeature: 'Beautiful hill station campus with vibrant student life and strong alumni network'
  }
];

// API simulation for fetching college data
export const fetchCollegeData = async (filters?: {
  type?: string;
  location?: string;
  rating?: number;
}): Promise<College[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = collegeData;
  
  if (filters) {
    if (filters.type) {
      filteredData = filteredData.filter(college => 
        college.type.toLowerCase().includes(filters.type!.toLowerCase())
      );
    }
    if (filters.location) {
      filteredData = filteredData.filter(college => 
        college.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    if (filters.rating) {
      filteredData = filteredData.filter(college => 
        college.rating >= filters.rating!
      );
    }
  }
  
  return filteredData;
};

export const searchColleges = async (query: string): Promise<College[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const lowercaseQuery = query.toLowerCase();
  return collegeData.filter(college => 
    college.name.toLowerCase().includes(lowercaseQuery) ||
    college.location.toLowerCase().includes(lowercaseQuery) ||
    college.type.toLowerCase().includes(lowercaseQuery) ||
    college.description.toLowerCase().includes(lowercaseQuery)
  );
};