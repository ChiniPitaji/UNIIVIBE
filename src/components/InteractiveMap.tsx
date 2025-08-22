import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Plus, 
  Minus, 
  Navigation, 
  Search,
  Filter,
  Star,
  Users,
  Building,
  Wifi,
  Coffee,
  Car,
  BookOpen,
  Utensils,
  Home,
  X,
  CheckCircle,
  Camera,
  MessageSquare
} from 'lucide-react';

interface MapPin {
  id: string;
  x: number;
  y: number;
  type: 'academic' | 'hostel' | 'dining' | 'recreation' | 'transport' | 'wifi' | 'other';
  title: string;
  description: string;
  rating: number;
  reviews: number;
  addedBy: string;
  verified: boolean;
  images?: string[];
  category: string;
}

interface InteractiveMapProps {
  collegeName: string;
  campusImageUrl: string;
  onPinAdd?: (pin: Omit<MapPin, 'id'>) => void;
}

const mockPins: MapPin[] = [
  {
    id: '1',
    x: 25,
    y: 30,
    type: 'dining',
    title: 'Main Cafeteria',
    description: 'Best food on campus! Try the South Indian breakfast. Clean and hygienic with variety of options.',
    rating: 4.5,
    reviews: 89,
    addedBy: 'Arjun S.',
    verified: true,
    category: 'Food & Dining',
    images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '2',
    x: 70,
    y: 45,
    type: 'hostel',
    title: 'Hostel Block A',
    description: 'Recently renovated with improved WiFi and AC. Great community atmosphere.',
    rating: 4.2,
    reviews: 34,
    addedBy: 'Priya K.',
    verified: true,
    category: 'Accommodation',
    images: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '3',
    x: 45,
    y: 60,
    type: 'academic',
    title: 'Central Library',
    description: 'Excellent study environment with 24/7 access. Great collection of books and digital resources.',
    rating: 4.7,
    reviews: 156,
    addedBy: 'Rahul M.',
    verified: true,
    category: 'Academic',
    images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '4',
    x: 60,
    y: 25,
    type: 'recreation',
    title: 'Student Activity Center',
    description: 'Hub for all cultural and recreational activities. Great place to meet people.',
    rating: 4.3,
    reviews: 67,
    addedBy: 'Sneha G.',
    verified: false,
    category: 'Recreation',
    images: ['https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '5',
    x: 80,
    y: 70,
    type: 'transport',
    title: 'Main Gate & Bus Stop',
    description: 'Primary entrance with regular bus services to the city. Well-connected transport hub.',
    rating: 3.8,
    reviews: 45,
    addedBy: 'Vikash S.',
    verified: true,
    category: 'Transport',
    images: ['https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '6',
    x: 35,
    y: 80,
    type: 'wifi',
    title: 'WiFi Hotspot - Garden Area',
    description: 'Strong WiFi signal with outdoor seating. Perfect for studying in nature.',
    rating: 4.1,
    reviews: 23,
    addedBy: 'Ananya P.',
    verified: true,
    category: 'Connectivity'
  }
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  collegeName, 
  campusImageUrl, 
  onPinAdd 
}) => {
  const [pins, setPins] = useState<MapPin[]>(mockPins);
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [showAddPin, setShowAddPin] = useState(false);
  const [newPinPosition, setNewPinPosition] = useState<{ x: number; y: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const pinTypes = [
    { value: 'all', label: 'All Locations', icon: MapPin, color: 'gray' },
    { value: 'academic', label: 'Academic', icon: BookOpen, color: 'blue' },
    { value: 'hostel', label: 'Hostels', icon: Home, color: 'green' },
    { value: 'dining', label: 'Dining', icon: Utensils, color: 'orange' },
    { value: 'recreation', label: 'Recreation', icon: Users, color: 'purple' },
    { value: 'transport', label: 'Transport', icon: Car, color: 'red' },
    { value: 'wifi', label: 'WiFi Spots', icon: Wifi, color: 'cyan' }
  ];

  const getPinIcon = (type: string) => {
    const pinType = pinTypes.find(pt => pt.value === type);
    return pinType ? pinType.icon : MapPin;
  };

  const getPinColor = (type: string, rating: number) => {
    const baseColors = {
      academic: 'bg-blue-500 border-blue-600',
      hostel: 'bg-green-500 border-green-600',
      dining: 'bg-orange-500 border-orange-600',
      recreation: 'bg-purple-500 border-purple-600',
      transport: 'bg-red-500 border-red-600',
      wifi: 'bg-cyan-500 border-cyan-600',
      other: 'bg-gray-500 border-gray-600'
    };
    
    let intensity = '';
    if (rating >= 4.5) intensity = '500';
    else if (rating >= 4) intensity = '400';
    else if (rating >= 3.5) intensity = '300';
    else intensity = '200';
    
    return baseColors[type as keyof typeof baseColors] || baseColors.other;
  };

  const filteredPins = pins.filter(pin => {
    const matchesType = filterType === 'all' || pin.type === filterType;
    const matchesSearch = searchTerm === '' || 
      pin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left - panPosition.x) / zoomLevel / rect.width) * 100;
    const y = ((e.clientY - rect.top - panPosition.y) / zoomLevel / rect.height) * 100;
    
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      setNewPinPosition({ x, y });
      setShowAddPin(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev * 1.2, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
  const resetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Navigation className="h-6 w-6" />
            <div>
              <h3 className="text-xl font-bold">Interactive Campus Map</h3>
              <p className="text-blue-100">UniiVibe - {collegeName}</p>
            </div>
          </div>
          <div className="text-sm text-blue-100">
            Click to add pins • Drag to pan • Scroll to zoom
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-blue-200 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-blue-300 rounded-lg text-white placeholder-blue-200 focus:bg-opacity-30 focus:outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white bg-opacity-20 border border-blue-300 rounded-lg text-white focus:bg-opacity-30 focus:outline-none"
          >
            {pinTypes.map(type => (
              <option key={type.value} value={type.value} className="text-gray-900">
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative h-[600px] overflow-hidden">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={zoomIn}
            className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={zoomOut}
            className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Minus className="h-5 w-5" />
          </button>
          <button
            onClick={resetView}
            className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Navigation className="h-4 w-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20 max-w-xs">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Legend</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {pinTypes.slice(1).map(type => {
              const Icon = type.icon;
              return (
                <div key={type.value} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                  <span className="text-gray-700">{type.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 pt-2 border-t text-xs text-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Verified locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>User-added locations</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div
          ref={mapRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
            transformOrigin: '0 0'
          }}
          onClick={handleMapClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img 
            src={campusImageUrl} 
            alt={`${collegeName} campus map`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          
          {/* Campus Pins */}
          {filteredPins.map((pin) => {
            const PinIcon = getPinIcon(pin.type);
            return (
              <div
                key={pin.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPin(pin);
                }}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all ${getPinColor(pin.type, pin.rating)}`}>
                  <PinIcon className="h-4 w-4" />
                </div>
                {pin.verified && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                )}
                
                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {pin.title}
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(pin.rating)}
                      <span>({pin.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* New Pin Position */}
          {newPinPosition && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${newPinPosition.x}%`, top: `${newPinPosition.y}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                <Plus className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pin Details Modal */}
      {selectedPin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-white ${getPinColor(selectedPin.type, selectedPin.rating)}`}>
                    {React.createElement(getPinIcon(selectedPin.type), { className: 'h-6 w-6' })}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{selectedPin.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">{renderStars(selectedPin.rating)}</div>
                      <span className="text-sm text-gray-600">({selectedPin.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-500">{selectedPin.category}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPin(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {selectedPin.images && selectedPin.images.length > 0 && (
                <div className="mb-4">
                  <img 
                    src={selectedPin.images[0]} 
                    alt={selectedPin.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <p className="text-gray-700 mb-4 leading-relaxed">{selectedPin.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Added by {selectedPin.addedBy}</span>
                {selectedPin.verified && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Add Review
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Pin Modal */}
      {showAddPin && newPinPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Add Campus Location</h4>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="academic">Academic Building</option>
                    <option value="hostel">Hostel/Accommodation</option>
                    <option value="dining">Food & Dining</option>
                    <option value="recreation">Recreation & Sports</option>
                    <option value="transport">Transport Hub</option>
                    <option value="wifi">WiFi Hotspot</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Main Library, Hostel Block C"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Share details about this location - facilities, timings, tips, etc."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Star className="h-6 w-6" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddPin(false);
                      setNewPinPosition(null);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add Location
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};