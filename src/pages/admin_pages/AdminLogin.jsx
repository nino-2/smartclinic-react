import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Shield, Eye, EyeOff } from 'lucide-react';

 const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for authentication
      // Replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (username === 'admin' && password === 'admin123') {
        toast({
          title: "Login Successful",
          description: "Welcome to the MAPOLY Smart Clinic Dashboard",
          variant: "default",
        });
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Admin Logo & Branding */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#0D47A1] rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/mapoly-logo.png" alt="" />
            </div>
            <h1 className="text-2xl font-bold text-[#0D47A1] mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-600 text-sm">
              MAPOLY Smart Clinic Assistant
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Administrative Access Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-10 pr-4 py-3 border border-clinic-neutral-border rounded-lg focus:ring-2 focus:ring-clinic-dark-blue focus:border-transparent outline-none transition-all duration-200"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-12 py-3 border border-clinic-neutral-border rounded-lg focus:ring-2 focus:ring-clinic-dark-blue focus:border-transparent outline-none transition-all duration-200"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Future 2FA/CAPTCHA Section */}
            <div className="bg-[#E8F5E8] border border-[#E8F5E8] rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-[#4CAF50]" />
                <span className="text-sm text-gray-700 font-medium">
                  Two-Factor Authentication
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enhanced security features will be available soon
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0D47A1] text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 focus:ring-2 focus:ring-[#0D47A1] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Admin Login'
              )}
            </button>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                This is a secure admin area. All login attempts are monitored and logged.
                <br />
                For assistance, contact IT support.
              </p>
            </div>
          </form>
        </div>

        {/* Back to Patient Login */}
        <div className="text-center mt-6">
          <Link to="/auth/login" 
            className="text-sm text-[#0D47A1] hover:underline"
          >
            ← Back to Patient Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
