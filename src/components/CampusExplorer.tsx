import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  MessageSquare, 
  Plus, 
  X, 
  Navigation,
  Coffee,
  Home,
  BookOpen,
  Utensils,
  Wifi,
  Car
} from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

interface CampusPin {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  type: 'mess' | 'hostel' | 'library' | 'lab' | 'cafe' | 'parking' | 'wifi' | 'other';
  title: string;
  description: string;
  rating: number;
  reviews: number;
  addedBy: string;
  verified: boolean;
}

interface CampusExplorerProps {
  collegeName: string;
  campusImageUrl: string;
}

const mockPins: CampusPin[] = [
  {
    id: '1',
    x: 25,
    y: 30,
    type: 'mess',
    title: 'Main Mess Hall',
    description: 'Best food on campus! Try the South Indian breakfast.',
    rating: 4.5,
    reviews: 89,
    addedBy: 'Arjun S.',
    verified: true
  },
  {
    id: '2',
    x: 70,
    y: 45,
    type: 'hostel',
    title: 'Hostel Block A',
    description: 'Avoid this block - poor WiFi and maintenance issues.',
    rating: 2.5,
    reviews: 34,
    addedBy: 'Priya K.',
    verified: true
  },
  {
    id: '3',
    x: 45,
    y: 60,
    type: 'library',
    title: 'Central Library',
    description: 'Great study environment, AC works well. Gets crowded during exams.',
    rating: 4.2,
    reviews: 156,
    addedBy: 'Rahul M.',
    verified: true
  },
  {
    id: '4',
    x: 60,
    y: 25,
    type: 'cafe',
    title: 'Campus Cafe',
    description: 'Perfect for group discussions and late-night snacks.',
    rating: 4.0,
    reviews: 67,
    addedBy: 'Sneha G.',
    verified: false
  }
];

export const CampusExplorer: React.FC<CampusExplorerProps> = ({ collegeName, campusImageUrl }) => {
  const [pins, setPins] = useState<CampusPin[]>(mockPins);
  const [selectedPin, setSelectedPin] = useState<CampusPin | null>(null);
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);

  if (showInteractiveMap) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowInteractiveMap(false)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Campus Explorer
        </button>
        <InteractiveMap 
          collegeName={collegeName}
          campusImageUrl={campusImageUrl}
        />
      </div>
    );
  }

  const getPinColor = (type: string, rating: number) => {
    if (rating >= 4) return 'bg-green-500 border-green-600';
    if (rating >= 3) return 'bg-yellow-500 border-yellow-600';
    return 'bg-red-500 border-red-600';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Navigation className="h-6 w-6" />
            <div>
              <h3 className="text-xl font-bold">Campus Explorer</h3>
              <p className="text-blue-100">UniiVibe - {collegeName}</p>
            </div>
          </div>
          <button
            onClick={() => setShowInteractiveMap(true)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Interactive Map
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
          <img 
            src={campusImageUrl} 
            alt={`${collegeName} campus map`}
            className="w-full h-full object-cover"
          />
          
          {/* Sample Pins for Preview */}
          {pins.map((pin) => {
            return (
              <div
                key={pin.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPin(pin);
                }}
              >
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                  <MapPin className="h-3 w-3" />
                </div>
                {pin.verified && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
            );
          })}

          {/* Overlay with Interactive Map Button */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowInteractiveMap(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Open Interactive Map
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{pins.length}</div>
            <div className="text-sm text-blue-700">Locations</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{pins.filter(p => p.verified).length}</div>
            <div className="text-sm text-green-700">Verified</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">4.2</div>
            <div className="text-sm text-purple-700">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Pin Details Modal */}
      {selectedPin && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-white ${getPinColor(selectedPin.type, selectedPin.rating)}`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedPin.title}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(selectedPin.rating)}</div>
                      <span className="text-sm text-gray-600">({selectedPin.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPin(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">{selectedPin.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Added by {selectedPin.addedBy}</span>
                {selectedPin.verified && (
                  <span className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Verified
                  </span>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Add Review
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};