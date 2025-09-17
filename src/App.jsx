import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import ChatWithAI from './pages/ChatWithAI'
import AppointmentBooking from './pages/AppointmentBooking'
import FAQPage from './pages/FAQPage'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoutes from '../ProtectedRoutes'


function App() {
 

  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/smartclinic' element={
            <ProtectedRoutes>
            <ChatWithAI/>
            </ProtectedRoutes>
            }/>
          <Route path="/appointment" element={
            <ProtectedRoutes>
            <AppointmentBooking />
            </ProtectedRoutes>
            } />
          <Route path="/faq" element={
           
            <FAQPage />
            } />
          <Route path='/auth/*' element={<AuthLayout/>}/>
          <Route path='/admin/*' element={<AdminLayout/>}/>
          {/* Add more routes as needed */}


        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
