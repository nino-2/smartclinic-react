import React from 'react'
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  Bot,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  Clock,
  TrendingUp,
  Activity,
  AlertCircle
} from "lucide-react";
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminHeader from '../../components/admin/AdminHeader';


const AdminDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();


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
                <div className="text-3xl font-bold text-gray-900">24</div>
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
                <div className="text-3xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-500 mt-1">Awaiting confirmation</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-l-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Active Chat Sessions</h3>
                  <MessageSquare className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">12</div>
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
                <div className="text-3xl font-bold text-gray-900">3</div>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Requires attention
                </div>
              </div>
            </div>

            {/* Content sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Today's appointments */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Today's Appointments
                </h2>
                <div className="space-y-4">
                  {[
                    { time: "9:00 AM", patient: "John Smith", type: "Consultation", status: "confirmed" },
                    { time: "10:30 AM", patient: "Sarah Johnson", type: "Follow-up", status: "confirmed" },
                    { time: "2:00 PM", patient: "Mike Brown", type: "Check-up", status: "pending" },
                    { time: "3:30 PM", patient: "Lisa Davis", type: "Consultation", status: "confirmed" },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                        <div>
                          <div className="text-sm font-medium">{appointment.patient}</div>
                          <div className="text-xs text-gray-500">{appointment.type}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${appointment.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                  View All Appointments
                </button>
              </div>

              {/* Recent activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-500" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: MessageSquare, text: "New chat message from Patient #1234", time: "2 min ago" },
                    { icon: Users, text: "Patient registration completed", time: "15 min ago" },
                    { icon: Calendar, text: "Appointment scheduled for tomorrow", time: "1 hour ago" },
                    { icon: AlertCircle, text: "System maintenance scheduled", time: "2 hours ago" },
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3 py-2">
                        <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.text}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                  View All Activity
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Schedule New Appointment
                </button>
                <button className="h-12 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Add New Patient
                </button>
                <button className="h-12 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-600">
                  Generate Report
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard