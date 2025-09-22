import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useFormik } from 'formik';
import  *as yup  from 'yup'
import axios from 'axios';

const VerifyOTP = ()  =>{
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const emailFromUrl = new URLSearchParams(location.search).get("email");
  const emailFromState = location.state?.email;
   // Get email from previous page
  const email = emailFromUrl || emailFromState || "";
  const API_URL = import.meta.env.VITE_API_URL;


  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60)
  const [errormsg, setErrormsg] = useState('')

  //countdown for resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  
  const handleNewcode = async() => {
        if (timer > 0) return;
        try {
          axios.post(`${API_URL}/auth/request`, {email})
          setTimer(60)
          formik.setFieldValue("otp", ["", "", "", ""]);
          inputRefs.current[0]?.focus();
        } catch (error) {
          console.log('Failed to send otp')
        }
  }


    let formik = useFormik({
    initialValues:{
      otp: ['', '', '', '']
    },
    validationSchema: yup.object({
       otp: yup
        .array()
        .of(yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
        .length(4, "Enter all 4 digits"),
    }),
    onSubmit: async(values) => {
       const otpCode = values.otp.join("");
      setIsLoading(true);
      try {
        const res = await axios.post(`${API_URL}/auth/verify`,{email, resetCode: otpCode})
        if (res.data.status) {
          navigate('/auth/reset-password', { state: { email } });
        } else {
          setErrormsg(res.data.message)
        }
      } catch (error) {
        console.log(error)
        setErrormsg(error.response.data.message)
      } finally {
        setIsLoading(false)
      }
    }
  })
 
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue("otp", newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
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

          <form onSubmit={formik.handleSubmit} className="space-y-6">
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
              {formik.values.otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  name={`otp[${index}]`}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-14 h-14 text-center text-xl font-bold border border-[#E0E0E0] rounded-lg outline-none transition-all duration-200 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                  disabled={isLoading}
                />
              ))}
            </div>
            {formik.errors.otp && typeof formik.errors.otp === "string" && (
            <p className="text-red-600 text-sm text-center">{formik.errors.otp}</p>
            )}

            {/* Submit Button */}
            
            <button
              type="submit"
              disabled={isLoading}
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
           

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleNewcode}
                disabled={timer > 0}
                className="text-sm text-[#1976D2] hover:underline font-medium cursor-pointer"
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
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
            onClick={() =>navigate('/auth/forgot-password')}
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
