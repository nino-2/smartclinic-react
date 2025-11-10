import React, { useEffect } from 'react'
import { useState } from "react";
import { Link} from "react-router-dom";
import {
  Calendar,Users,MessageSquare,Bell,Clock,TrendingUp,Activity,AlertCircle
} from "lucide-react";
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminHeader from '../../components/admin/AdminHeader';
import axios from 'axios';

const AdminDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, active: 0, urgency: 0 });
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      
      try {
        const res = await axios.get(`${API_URL}/admin/stats`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.status) setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  // Fetch today's appointments
  useEffect(() => {
    const fetchTodaysAppointments = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/appointments?date=today`, {
           headers:{
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.status) setTodaysAppointments(res.data.appointments);
      } catch (err) {
        console.error("Failed to fetch today's appointments", err);
      }
    };
    fetchTodaysAppointments();
  }, []);

  // Fetch recent activity
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/activity`, {
           headers:{
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.status) setRecentActivity(res.data.activity || []);
      } catch (err) {
        console.error("Failed to fetch activity logs", err);
      }
    };
    fetchActivity();
  }, []);

  


  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <AdminHeader setSidebarOpen={setSidebarOpen} />

          {/* Dashboard content */}
          <main className="p-4 md:p-6 lg:ml-64">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin</h1>
              <p className="text-gray-600">Here's what's happening with your healthcare system today.</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-l-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Total Appointments Today</h3>
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% from yesterday
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-l-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Pending Bookings</h3>
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
                <div className="text-sm text-gray-500 mt-1">Awaiting confirmation</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-l-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Active Chat Sessions</h3>
                  <MessageSquare className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.active}</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <Activity className="h-4 w-4 mr-1" />
                  3 new conversations
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-l-red-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Urgent Alerts</h3>
                  <Bell className="h-5 w-5 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.urgency}</div>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Requires attention
                </div>
              </div>
            </div>

            {/* Content sections */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
              {/* Today's appointments */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Today's Appointments
                </h2>
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => (
                    <div key={appointment._id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                        <div>
                          <div className="text-sm font-medium">
                            {appointment.patientName}
                            
                            </div>
                          <div className="text-xs text-gray-500">{appointment.type}</div>
                        </div>
                      </div>
                       <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                    </div>
                  ))}
                </div>
                <Link to='/admin/appointments'>
                <button className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                  View All Appointments
                </button>
                </Link>
              </div>

             
            </div>

           
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard