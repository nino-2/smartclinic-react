import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';
import *as yup from 'yup';
import axios from 'axios';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [errormsg, setErrorMsg] = useState('')

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Login attempt:', { email, password });
  // };

  let navigate = useNavigate();
  let url = 'http://localhost:5001/auth/login'

  let formik = useFormik({
    initialValues:{
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values)
      axios.post(url, values, {
        headers: {
          'Content-Type': 'application/json'
      }
  })
  .then((response) => {
    console.log(response.data)
    if (response.data.status) {
      navigate('/')
    } else {
      setErrorMsg(response.data.message)
    }
  })
  .catch((error) => {
    console.log(error)
  })
},
  validationSchema:yup.object({
    email:yup.string().required('This field is required'),
    password:yup.string().required('This field is required')
  })
  })


  return (
    <>
    <div className="min-h-screen bg-[#F5F9FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo placeholder */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-clinic-blue rounded-full flex items-center justify-center mx-auto mb-4">
              
                <img src="/mapoly-logo.png" alt="" />
            
            </div>
            <h1 className="text-2xl font-bold text-clinic-dark-blue mb-2">
              Welcome to MAPOLY Smart Clinic
            </h1>
            <p className="text-gray-600">
              Sign in to access your health dashboard
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter your email"
                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200 ${
                      formik.errors.email && formik.touched.email ? 'border-red-600' : 'border-clinic-neutral-border'
                    }`}
                  required
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
                )}
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-clinic-neutral-border rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#1976D2] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1565C0] transition-colors duration-200 focus:ring-2 focus:ring-clinic-blue focus:ring-offset-2"
            >
              Login
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link
                to="/auth/forgot-password" 
                
                className="text-sm text-clinic-blue hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">— OR —</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">New user? </span>
              <Link 
                to="/auth/signup" 
                className="text-sm text-blue hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
         {/* Admin Access Link */}
        <div className="text-center mt-6">
          <Link
            to="/admin/login"
            className="text-sm text-gray-500 hover:text-blue transition-colors"
          >
            Staff Login →
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
export default Login