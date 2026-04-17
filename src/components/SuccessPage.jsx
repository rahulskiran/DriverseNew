import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Heart, ArrowLeft } from 'lucide-react';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // In production, you might want to verify the session with your backend
      setTimeout(() => {
        setSessionDetails({ sessionId });
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Thank You for Your Donation!
        </h1>
        
        <p className="text-slate-600 mb-6">
          Your generous contribution helps us support driver safety, health, and wellness programs. 
          A receipt has been sent to your email.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-sm font-medium">Transaction ID</span>
          </div>
          <p className="text-xs text-slate-400 font-mono break-all">
            {sessionId || 'N/A'}
          </p>
        </div>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
