import React from 'react'
import AdminLogin from '../pages/admin_pages/AdminLogin'
import AdminDashboard from '../pages/admin_pages/AdminDashboard'
import { Route, Routes } from 'react-router-dom'
import Appointments from '../pages/admin_pages/Appointments'
import PatientRecords from '../pages/admin_pages/PatientRecords'
import ChatLogs from '../pages/admin_pages/ChatLogs'
import AISettings from '../pages/admin_pages/AISettings'

const AdminLayout = () => {
  return (
    <div>
        
            <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/patients" element={<PatientRecords />} />
                <Route path="/chat-logs" element={<ChatLogs />} />
                <Route path='/aisettings' element={<AISettings/>}/>
                {/* Add more admin routes as needed */}

            </Routes>
              
    </div>
  )
}

export default AdminLayout