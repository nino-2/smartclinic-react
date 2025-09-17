import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useFormik } from 'formik';
import *as yup from 'yup';
import axios from 'axios';

const Signup = () => {
  const [message, setMessage] = useState('')
  let navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  

   let formik = useFormik({
      initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        bloodgroup: '',
        dob: '',
        address: "",
      },
      onSubmit: (values) => {
        console.log(values)
        axios.post(`${API_URL}/auth/signup`,values, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response)=>{
          console.log(response.data)
          if (response.data.status) {
            navigate('/auth/login')
          } else {
            setMessage(response.data.message)
          }
        })
        .catch((error)=>{
          console.log(error)
        })
      },
      validationSchema:yup.object({
        firstname:yup.string().required('This field is required'),
        lastname:yup.string().required('This field is required'),
        email:yup.string().required('This field is required'),
        password:yup.string().min(6, 'Password must be at least 6 characters').required('This field is required'),
        confirmPassword:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('This field is required'),
        bloodgroup:yup.string().required('This field is required'),
        dob:yup.string().required('This field is required'),
        address:yup.string().required("Address is required"),
        })
    })
   
  const [showPassword, setShowPassword] = useState(false);
  const bloodOptions = [
    { value: '', label: 'Select Blood Group' },
    {value: 'A+', label: 'A+'},
    {value: 'A-', label: 'A-'},
    {value: 'B+', label: 'B+'},
    {value: 'B-', label: 'B-'},
    {value: 'AB+', label: 'AB+'},
    {value: 'AB-', label: 'AB-'},
    {value: 'O+', label: 'O+'},
    {value: 'O-', label: 'O-'}
  ]

  return (
    <>
    <div className="min-h-screen bg-clinic-light-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo placeholder */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-clinic-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/mapoly-logo.png" alt="" />
            </div>
            <h1 className="text-2xl font-bold text-clinic-dark-blue mb-2">
              Create Your Smart Clinic Account
            </h1>
            <p className="text-gray-600">
              It's quick and easy
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <p>{message}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="First name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200 ${
                      formik.errors.firstname && formik.touched.firstname ? 'border-red-600' : 'border-clinic-neutral-border'
                    }`}
                    required
                  />
                </div>
                {formik.errors.firstname && formik.touched.firstname && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.firstname}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Last name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200 ${
                      formik.errors.lastname && formik.touched.lastname ? 'border-red' : 'border-clinic-neutral-border'
                    }`}
                    required
                  />
                </div>
                {formik.errors.lastname && formik.touched.lastname && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.lastname}</p>
                )}
              </div>
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
                  name="email"
                  type="email"
                  
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200 ${
                    formik.errors.email && formik.touched.email ? 'border-clinic-emergency-red' : 'border-clinic-neutral-border'
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
                  onBlur={formik.handleBlur}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200 ${
                    formik.errors.password && formik.touched.password ? 'border-clinic-emergency-red' : 'border-clinic-neutral-border'
                  }`}
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
            {/*Confirm Password*/}
             <div>
              <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200 ${
                    formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-clinic-emergency-red' : 'border-clinic-neutral-border'
                  }`}
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
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</p>
              )}
             
            </div>
             {/*Blood Group*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                name="bloodgroup"
                value={formik.values.bloodgroup}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
              >
                {bloodOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {formik.touched.bloodgroup && formik.errors.bloodgroup && (
                <p className="text-red-500 text-sm">{formik.errors.bloodgroup}</p>
              )}
            </div>

          {/*D.O.B*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              name="dob"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
            />
            {formik.touched.dob && formik.errors.dob && (
              <p className="text-red-500 text-sm">{formik.errors.dob}</p>
            )}
          </div>

          {/*Address*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            name="address"
            type='text'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}
        </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#4CAF50] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#43A047] transition-colors duration-200 focus:ring-2 focus:ring-clinic-green focus:ring-offset-2 cursor-pointer"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link 
                to="/auth/login" 
                className="text-sm text-clinic-blue hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
export default Signup;
