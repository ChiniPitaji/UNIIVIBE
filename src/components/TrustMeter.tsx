import React from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, TrendingUp, Users } from 'lucide-react';

interface TrustMeterProps {
  score: number;
  verifiedReviews: number;
  totalReviews: number;
  engagementScore: number;
  flaggedCount: number;
  className?: string;
}

export const TrustMeter: React.FC<TrustMeterProps> = ({
  score,
  verifiedReviews,
  totalReviews,
  engagementScore,
  flaggedCount,
  className = ''
}) => {
  const getTrustLevel = (score: number) => {
    if (score >= 90) return { level: 'High', color: 'green', icon: CheckCircle };
    if (score >= 70) return { level: 'Medium', color: 'yellow', icon: AlertTriangle };
    return { level: 'Low', color: 'red', icon: XCircle };
  };

  const trust = getTrustLevel(score);
  const TrustIcon = trust.icon;
  
  const verificationRate = Math.round((verifiedReviews / totalReviews) * 100);

  return (
    <div className={`bg-white border rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Trust Meter</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
          trust.color === 'green' ? 'bg-green-100 text-green-800' :
          trust.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          <TrustIcon className="h-4 w-4" />
          {trust.level} Trust
        </div>
      </div>

      {/* Trust Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
              className={`transition-all duration-1000 ${
                trust.color === 'green' ? 'text-green-500' :
                trust.color === 'yellow' ? 'text-yellow-500' :
                'text-red-500'
              }`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{score}</span>
          </div>
        </div>
      </div>

      {/* Trust Factors */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-gray-700">Verified Reviews</span>
          </div>
          <span className="font-medium text-gray-900">{verificationRate}%</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-gray-700">Engagement Score</span>
          </div>
          <span className="font-medium text-gray-900">{engagementScore}/100</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-gray-700">Total Reviews</span>
          </div>
          <span className="font-medium text-gray-900">{totalReviews}</span>
        </div>

        {flaggedCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-gray-700">Flagged Content</span>
            </div>
            <span className="font-medium text-red-600">{flaggedCount}</span>
          </div>
        )}
      </div>

      {/* Trust Explanation */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          Trust score is calculated based on verification rate, user engagement, 
          review quality, and community feedback. Higher scores indicate more reliable content.
        </p>
      </div>
    </div>
  );
};