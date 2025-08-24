import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const VerifyOTP = ()  =>{
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  
  // Get email from previous page
  const email = location.state?.email || '';

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'Enter' && otp.every(digit => digit)) {
      handleSubmit(e);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const digits = paste.replace(/\D/g, '').slice(0, 4).split('');
    
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 4) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);
    
    // Focus next empty input or last input
    const nextIndex = Math.min(digits.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 4-digit OTP code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification logic (accept 1234 as valid OTP)
      if (otpCode === '1234') {
        toast({
          title: "OTP Verified",
          description: "OTP verified successfully",
          variant: "default",
        });
        
        // Navigate to reset password page with email
        navigate('/reset-password', { state: { email } });
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while verifying OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      // Simulate resend OTP API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "OTP Resent",
        description: "A new OTP code has been sent to your email",
        variant: "default",
      });
      
      // Clear current OTP
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9FF]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1976D2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-[#0D47A1]">
              Enter OTP Code
            </h1>
            <p className="text-gray-600 text-sm">
              MAPOLY Smart Clinic Assistant
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Instructions */}
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">
                Enter the 4-digit code sent to
              </p>
              <p className="font-semibold text-gray-900 mb-4">
                {email}
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-14 text-center text-xl font-bold border border-[#E0E0E0] rounded-lg outline-none transition-all duration-200 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Submit Button */}
            <Link to='/auth/reset-password'>
            <button
              type="submit"
              disabled={isLoading || !otp.every(digit => digit)}
              className="w-full bg-[#1976D2] hover:bg-[#0D47A1] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>
            </Link>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-sm text-[#1976D2] hover:underline font-medium"
              >
                Resend OTP
              </button>
            </div>

            {/* Help Text */}
            <div className="bg-[#F1F8E9] border border-[#C8E6C9] rounded-lg p-4">
              <p className="text-xs text-gray-600 text-center">
                For testing purposes, use OTP: <span className="font-mono font-bold">1234</span>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Forgot Password Link */}
        <div className="text-center mt-6">
          <button
            onClick={handleBackToForgotPassword}
            className="flex items-center justify-center space-x-2 text-sm text-[#1976D2] hover:underline transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Email Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default VerifyOTP;
