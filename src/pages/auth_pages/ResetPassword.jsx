import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  
  // Get email from previous page
  const email = location.state?.email || '';

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      isValid: minLength && hasUpper && hasLower && hasNumber
    };
  };

  const passwordValidation = validatePassword(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid) {
      toast({
        title: "Invalid Password",
        description: "Password must meet all requirements",
        variant: "destructive",
      });
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully",
        variant: "default",
      });
      
      // Navigate back to login page
      navigate('/', { 
        state: { 
          message: "Password reset successful! Please login with your new password." 
        } 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm">
              MAPOLY Smart Clinic Assistant
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field (Read-only) */}
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
                  readOnly
                  className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg outline-none bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-12 py-3 border border-[#E0E0E0] rounded-lg outline-none transition-all duration-200 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {newPassword && (
              <div className="bg-[#F1F8E9] border border-[#C8E6C9] rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                <div className="space-y-1">
                  <div className={`flex items-center space-x-2 text-xs ${passwordValidation.minLength ? 'text-[#4CAF50]' : 'text-gray-500'}`}>
                    <CheckCircle className={`w-3 h-3 ${passwordValidation.minLength ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-xs ${passwordValidation.hasUpper ? 'text-[#4CAF50]' : 'text-gray-500'}`}>
                    <CheckCircle className={`w-3 h-3 ${passwordValidation.hasUpper ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-xs ${passwordValidation.hasLower ? 'text-[#4CAF50]' : 'text-gray-500'}`}>
                    <CheckCircle className={`w-3 h-3 ${passwordValidation.hasLower ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-xs ${passwordValidation.hasNumber ? 'text-[#4CAF50]' : 'text-gray-500'}`}>
                    <CheckCircle className={`w-3 h-3 ${passwordValidation.hasNumber ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
                    <span>One number</span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-12 py-3 border border-[#E0E0E0] rounded-lg outline-none transition-all duration-200 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-[#EF4444] mt-1">Passwords do not match</p>
              )}
              {confirmPassword && passwordsMatch && (
                <p className="text-xs text-[#4CAF50] mt-1">Passwords match</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !passwordValidation.isValid || !passwordsMatch}
              className="w-full bg-[#1976D2] hover:bg-[#0D47A1] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating Password...</span>
                </div>
              ) : (
                'Update Password'
              )}
            </button>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                Make sure to use a strong, unique password for your account security.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
