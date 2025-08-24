import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth_pages/Login'
import ForgotPassword from '../pages/auth_pages/ForgotPassword'
import Signup from '../pages/auth_pages/Signup'
import VerifyOTP from '../pages/auth_pages/VerifyOTP'
import ResetPassword from '../pages/auth_pages/ResetPassword'
const AuthLayout = () => {
  return (
    < div className="min-h-screen bg-[#F5F9FF] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/signup' element={<Signup/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp" element={<VerifyOTP />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </div>    
    </div>
  )
}

export default AuthLayout