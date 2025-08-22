import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Camera,
  FileText
} from 'lucide-react';

interface VerificationFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

export const VerificationFlow: React.FC<VerificationFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<'email' | 'otp' | 'id-upload' | 'pending'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'id'>('email');

  const isEduEmail = (email: string) => {
    return email.includes('.edu') || email.includes('.ac.in') || email.includes('@iit') || email.includes('@nit');
  };

  const handleEmailSubmit = () => {
    if (isEduEmail(email)) {
      setStep('otp');
    } else {
      setVerificationMethod('id');
      setStep('id-upload');
    }
  };

  const handleOtpSubmit = () => {
    if (otp === '123456') { // Mock OTP verification
      onComplete();
    }
  };

  const handleIdUpload = () => {
    if (idFile && college && course && batch) {
      setStep('pending');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6" />
              <h2 className="text-xl font-bold">UniiVibe Student Verification</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {step === 'email' && (
            <div className="space-y-6">
              <div className="text-center">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Student Status</h3>
                <p className="text-gray-600 text-sm">Enter your college email to get started</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.name@college.edu"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use your official college email (.edu, .ac.in, etc.)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College Name</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g., IIT Delhi, BITS Pilani"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleEmailSubmit}
                  disabled={!email || !college}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Why Verification?</h4>
                    <p className="text-sm text-blue-700">
                      We verify all students to ensure authentic reviews and prevent fake content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
                <p className="text-gray-600 text-sm">We sent a 6-digit code to {email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Demo: Use code <span className="font-mono bg-gray-100 px-1 rounded">123456</span>
                </p>
              </div>

              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Verify & Complete
              </button>

              <button
                onClick={() => setStep('email')}
                className="w-full text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Back to email
              </button>
            </div>
          )}

          {step === 'id-upload' && (
            <div className="space-y-6">
              <div className="text-center">
                <Upload className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Student ID</h3>
                <p className="text-gray-600 text-sm">Since you don't have a .edu email, please upload your student ID</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course & Year</label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g., B.Tech CSE"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID Card</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="id-upload"
                    />
                    <label htmlFor="id-upload" className="cursor-pointer">
                      {idFile ? (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">{idFile.name}</span>
                        </div>
                      ) : (
                        <div>
                          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload ID card</p>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleIdUpload}
                  disabled={!idFile || !course || !batch}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit for Review
                </button>
              </div>
            </div>
          )}

          {step === 'pending' && (
            <div className="space-y-6 text-center">
              <div>
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Under Review</h3>
                <p className="text-gray-600 text-sm">Your verification is being reviewed by our team</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-medium text-orange-900 mb-1">What's Next?</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Review typically takes 24-48 hours</li>
                      <li>• You'll receive an email notification</li>
                      <li>• You can browse colleges while waiting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};