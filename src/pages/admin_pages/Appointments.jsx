import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
   Menu, X, Bell, 
   Calendar,
  Settings,Search,Filter,Download,Check,Clock,Ban,Edit,FileSpreadsheet,FileText
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminHeader from "../../components/admin/AdminHeader";

const Appointments = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const location = useLocation();



  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Smith",
      date: "2024-01-15",
      time: "09:00 AM",
      status: "pending",
      type: "Consultation",
      phone: "+1-234-567-8901"
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "confirmed",
      type: "Follow-up",
      phone: "+1-234-567-8902"
    },
    {
      id: 3,
      patientName: "Mike Brown",
      date: "2024-01-15",
      time: "02:00 PM",
      status: "pending",
      type: "Check-up",
      phone: "+1-234-567-8903"
    },
    {
      id: 4,
      patientName: "Lisa Davis",
      date: "2024-01-16",
      time: "09:30 AM",
      status: "confirmed",
      type: "Consultation",
      phone: "+1-234-567-8904"
    },
    {
      id: 5,
      patientName: "Robert Wilson",
      date: "2024-01-16",
      time: "11:00 AM",
      status: "cancelled",
      type: "Follow-up",
      phone: "+1-234-567-8905"
    },
    {
      id: 6,
      patientName: "Emily Chen",
      date: "2024-01-16",
      time: "03:30 PM",
      status: "pending",
      type: "Consultation",
      phone: "+1-234-567-8906"
    }
  ]);

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const matchesDate = !dateFilter || appointment.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handle appointment actions
  const handleApprove = (id) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status: "confirmed" } : apt)
    );
  };

  const handleCancel = (id) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status: "cancelled" } : apt)
    );
  };

  const handleReschedule = (id) => {
    // In a real app, this would open a date/time picker modal
    alert(`Reschedule appointment ${id} - This would open a date/time picker`);
  };

  const exportToExcel = () => {
    alert("Export to Excel functionality - Would generate Excel file");
  };

  const exportToPDF = () => {
    alert("Export to PDF functionality - Would generate PDF file");
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return statusClasses[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
     

      {/* Sidebar */}
       <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
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
        <AdminHeader setSidebarOpen={setSidebarOpen}/>

        {/* Page content */}
        
        <main className="p-4 md:p-6 lg:ml-64">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Appointment Management</h1>
            <p className="text-sm md:text-base text-gray-600">Manage and track all patient appointments</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by patient name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {/* Date Filter */}
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Export Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={exportToExcel}
                  className="flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export Excel
                </button>
                <button
                  onClick={exportToPDF}
                  className="flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Appointments Table - Desktop View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-1">
                          {appointment.status === "pending" && (
                            <button
                              onClick={() => handleApprove(appointment.id)}
                              className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Approve
                            </button>
                          )}
                          {appointment.status !== "cancelled" && (
                            <button
                              onClick={() => handleReschedule(appointment.id)}
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Reschedule
                            </button>
                          )}
                          {appointment.status !== "cancelled" && (
                            <button
                              onClick={() => handleCancel(appointment.id)}
                              className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              <Ban className="h-3 w-3 mr-1" />
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Appointments Cards - Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(appointment.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {appointment.time}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {appointment.status === "pending" && (
                    <button
                      onClick={() => handleApprove(appointment.id)}
                      className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Approve
                    </button>
                  )}
                  {appointment.status !== "cancelled" && (
                    <button
                      onClick={() => handleReschedule(appointment.id)}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Reschedule
                    </button>
                  )}
                  {appointment.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      <Ban className="h-3 w-3 mr-1" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-gray-900">
                {filteredAppointments.length}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Total Appointments</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-yellow-600">
                {filteredAppointments.filter(apt => apt.status === "pending").length}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-green-600">
                {filteredAppointments.filter(apt => apt.status === "confirmed").length}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Confirmed</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-red-600">
                {filteredAppointments.filter(apt => apt.status === "cancelled").length}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Cancelled</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Appointments;
