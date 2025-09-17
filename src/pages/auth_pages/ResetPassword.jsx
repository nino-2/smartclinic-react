import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useFormik } from 'formik';
import  *as yup  from 'yup'
import axios from 'axios'

const ResetPassword = () => {

  const [isLoading, setIsLoading] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const emailFromUrl = new URLSearchParams(location.search).get("email");
  const emailFromState = location.state?.email;
   // Get email from previous page
  const email = emailFromUrl || emailFromState || "";

  const API_URL = import.meta.env.VITE_API_URL;

  // let url = 'http://localhost:5001/auth/reset'

  
  const formik = useFormik({
    initialValues: {
      email: email,
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(`${API_URL}/auth/reset`,  {
          email: values.email,
          newPassword: values.newPassword,
        });

        if (response.data.status) {
          // ✅ Password reset success
          navigate("/auth/login", { state: { message: "Password reset successful. Please log in." } });
        } else {
          setErrors({ confirmPassword: response.data.message });
        }
      } catch (error) {
        console.error(error);
        setErrors({
          confirmPassword: error.response?.data?.message || "Server error",
        });
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  


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

          <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                  name='newPassword'
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.newPassword && formik.errors.newPassword}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-12 py-3 border border-[#E0E0E0] rounded-lg outline-none transition-all duration-200 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                  required
                  disabled={isLoading}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-xs text-[#EF4444] mt-1">{formik.errors.newPassword}</p>
                )}
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
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-12 py-3 border border-[#E0E0E0] rounded-lg outline-none transition-all duration-200 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                  required
                  disabled={isLoading}
                />
                 {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-xs text-[#EF4444] mt-1">{formik.errors.confirmPassword}</p>
                )}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1976D2] hover:bg-[#0D47A1] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
