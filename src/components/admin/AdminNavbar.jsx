import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, Users, MessageSquare, Bot, LogOut, X } from "lucide-react";
import axios from "axios";

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = [
    { name: "Home", href: "/admin/dashboard", icon: Home },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar },
    { name: "Patient Records", href: "/admin/patients", icon: Users },
    { name: "Chat Logs", href: "/admin/chat-logs", icon: MessageSquare },
    { name: "AI Assistant Settings", href: "/admin/aisettings", icon: Bot },
  ];

  const API_URL = import.meta.env.VITE_API_URL;

  
   const adminLogout = () => {
     axios.post(`${API_URL}/admin/logout`, {}, {withCredentials: true})
     navigate('/auth/login');
   }
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
        <button
          className="lg:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-lg ${
                location.pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}

        <button onClick={adminLogout} className="flex items-center w-full px-4 py-3 mt-8 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 border-t pt-6">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminNavbar;
