import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown,
  Heart,
  MessageCircle,
  Share,
  CheckCircle,
  Upload,
  Video
} from 'lucide-react';

interface VideoTestimonial {
  id: string;
  studentName: string;
  studentBatch: string;
  course: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  likes: number;
  comments: number;
  verified: boolean;
  uploadDate: string;
}

const mockVideos: VideoTestimonial[] = [
  {
    id: '1',
    studentName: 'Arjun Sharma',
    studentBatch: '2024',
    course: 'B.Tech CSE',
    title: 'My honest review of campus life at IIT Delhi',
    videoUrl: 'https://example.com/video1.mp4',
    thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 75,
    likes: 234,
    comments: 45,
    verified: true,
    uploadDate: '2 days ago'
  },
  {
    id: '2',
    studentName: 'Priya Patel',
    studentBatch: '2023',
    course: 'B.Tech EE',
    title: 'Placement experience and interview tips',
    videoUrl: 'https://example.com/video2.mp4',
    thumbnail: 'https://images.pexels.com/photos/5212346/pexels-photo-5212346.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 90,
    likes: 189,
    comments: 32,
    verified: true,
    uploadDate: '1 week ago'
  },
  {
    id: '3',
    studentName: 'Rahul Kumar',
    studentBatch: '2025',
    course: 'B.Tech ME',
    title: 'Hostel life and facilities review',
    videoUrl: 'https://example.com/video3.mp4',
    thumbnail: 'https://images.pexels.com/photos/5212347/pexels-photo-5212347.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 60,
    likes: 156,
    comments: 28,
    verified: false,
    uploadDate: '3 days ago'
  }
];

interface VideoTestimonialsProps {
  collegeName: string;
}

export const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({ collegeName }) => {
  const [videos] = useState<VideoTestimonial[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const currentVideo = videos[currentVideoIndex];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="h-6 w-6" />
            <div>
              <h3 className="text-xl font-bold">Student Video Reviews</h3>
              <p className="text-purple-100">UniiVibe - {collegeName}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Video
          </button>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Video Player */}
        <div className="flex-1 bg-black relative">
          <div className="relative w-full h-full">
            <img 
              src={currentVideo.thumbnail}
              alt={currentVideo.title}
              className="w-full h-full object-cover"
            />
            
            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <span className="text-sm">{formatDuration(currentVideo.duration)}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="hover:text-red-400 transition-colors flex items-center gap-1">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm">{currentVideo.likes}</span>
                  </button>
                  <button className="hover:text-blue-400 transition-colors flex items-center gap-1">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{currentVideo.comments}</span>
                  </button>
                  <button className="hover:text-green-400 transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevVideo}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <button
              onClick={nextVideo}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Info & Playlist */}
        <div className="w-80 bg-gray-50 flex flex-col">
          {/* Current Video Info */}
          <div className="p-4 bg-white border-b">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">
                  {currentVideo.studentName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{currentVideo.studentName}</span>
                  {currentVideo.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <p className="text-sm text-gray-600">{currentVideo.studentBatch} • {currentVideo.course}</p>
                <p className="text-xs text-gray-500">{currentVideo.uploadDate}</p>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{currentVideo.title}</h4>
          </div>

          {/* Video Playlist */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h5 className="font-semibold text-gray-900 mb-3">More Reviews ({videos.length})</h5>
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentVideoIndex 
                        ? 'bg-purple-100 border border-purple-200' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                        {video.title}
                      </h6>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs text-gray-600">{video.studentName}</span>
                        {video.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{video.likes} likes</span>
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Video Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold">Upload Video Review</h3>
              <p className="text-purple-100">UniiVibe - Share your experience with future students</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., My honest review of campus life"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">MP4, MOV up to 100MB • Max 90 seconds</p>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Video Guidelines</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Keep it under 90 seconds</li>
                  <li>• Be honest and constructive</li>
                  <li>• Good lighting and clear audio</li>
                  <li>• No inappropriate content</li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Upload Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};