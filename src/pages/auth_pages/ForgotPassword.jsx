import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "OTP Sent",
        description: "OTP code has been sent to your email",
        variant: "default",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9FF]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Success State */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-[#0D47A1]">
                Check Your Email
              </h1>
              <p className="text-gray-600">
                We've sent you an OTP code
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  We've sent an OTP code to:
                </p>
                <p className="font-semibold text-gray-900 mb-6">
                  {email}
                </p>
                <div className="bg-[#F1F8E9] border border-[#C8E6C9] rounded-lg p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    If you don't receive the OTP within a few minutes, please check your spam folder.
                    You can also contact our clinic support for assistance.
                  </p>
                </div>
              </div>

              <button
                onClick={handleBackToLogin}
                className="w-full bg-[#1976D2] hover:bg-[#0D47A1] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9FF]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1976D2] rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-[#1976D2] rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-[#0D47A1]">
              Reset Your Password
            </h1>
            <p className="text-gray-600">
              MAPOLY Smart Clinic Assistant
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Instructions */}
            <div className="bg-[#F1F8E9] border border-[#C8E6C9] rounded-lg p-4">
              <p className="text-sm text-gray-700">
                Enter your email address to receive your OTP
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg outline-none transition-all duration-200 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Link to='/auth/otp'>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1976D2] hover:bg-[#0D47A1] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Send OTP'
              )}
            </button>
            </Link>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                Having trouble? Contact the clinic at{' '}
                <span className="text-[#1976D2]">support@mapolyclinic.edu.ng</span>
                <br />
                or call us during business hours.
              </p>
            </div>
          </form>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link to='/auth/login'>
          <button
            onClick={handleBackToLogin}
            className="flex items-center justify-center space-x-2 text-sm text-[#1976D2] hover:underline transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
