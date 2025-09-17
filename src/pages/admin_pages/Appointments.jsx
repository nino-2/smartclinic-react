import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
   Menu, X, Bell, 
   Calendar,
  Settings,Search,Filter,Download,Check,Clock,Ban,Edit,FileSpreadsheet,FileText
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminHeader from "../../components/admin/AdminHeader";
import axios from "axios";
import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const Appointments = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [rescheduleId, setRescheduleId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

    // Fetch from backend

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/appointments`, {
          withCredentials: true,
          params: {
            search: searchTerm,
            status: statusFilter,
            date: dateFilter
          }
        });
        if (res.data.status) setAppointments(res.data.appointments);
      } catch (err) {
        console.error("Error fetching appointments", err);
      }
    };
  
 
    useEffect(() => {
    fetchAppointments();
  }, [searchTerm, statusFilter, dateFilter]);


    // Update status
  const updateStatus = async (id, status) => {
    try {
      const payload = {status}
       if (status === "rescheduled") {
      payload.date = newDate;
      payload.time = newTime;
    }
    await axios.patch(
      `${API_URL}/admin/appointments/${id}`,
      payload,
      { withCredentials: true },
    );
    // Update the appointment in local state immediately
    setAppointments(prevAppointments =>
      prevAppointments.map(apt =>
        apt._id === id ? { ...apt, ...payload } : apt
      )
    );
   
    setShowModal(false);
    setNewDate("");
    setNewTime("");
    setRescheduleId(null);
  } catch (err) {
    console.error("Failed to update appointment status", err);
  }
  };

  // Button handlers
  const handleApprove = (id) => updateStatus(id, "confirmed");
  const handleCancel = (id) => updateStatus(id, "cancelled" );
  const handleReschedule = (id) => updateStatus(id, "rescheduled" );

    const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      
    };
    return statusClasses[status] || "bg-gray-100 text-gray-800";
  };

 // Filter locally in case backend doesn't support search
  const filteredAppointments = appointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "all" || apt.status === statusFilter) &&
    (!dateFilter || apt.date === dateFilter)
  );



  // Export to Excel
  const exportToExcel = () => {
   // convert appointments state into sheet
  const worksheet = XLSX.utils.json_to_sheet(appointments);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

  // create buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // save file
  const fileData = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(fileData, "appointments.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
      const doc = new jsPDF();

  // define table columns
  const columns = ["Patient", "Date", "Time", "Status"];

  // map your state into rows
  const rows = appointments.map((apt) => [
    apt.patientName,
    apt.date,
    apt.time,
    apt.status,
  ]);

  // add title
  doc.setFontSize(16);
  doc.text("Appointments Report", 14, 20);

  // add table
  autoTable(doc,{
    head: [columns],
    body: rows,
    startY: 30,
  });

  // download
  doc.save("appointments.pdf")
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
                  {filteredAppointments?.map((apt) => (
                    <tr key={apt._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {apt.patientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {apt.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(apt.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {apt.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(apt.status)}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-1">
                          {apt.status === "pending" && (
                            <button
                              onClick={() => handleApprove(apt._id)}
                              className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Approve
                            </button>
                          )}
                          {apt.status !== "cancelled" && (
                            <button
                            onClick={()=> {
                              setRescheduleId(apt._id)
                              setShowModal(true)
                            }}
                              
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Reschedule
                            </button>
                            
                          )}
                          {showModal && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
                            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                              <h2 className="text-lg font-bold mb-4">Reschedule Appointment</h2>

                              <div className="space-y-3">
                                <input
                                  type="date"
                                  value={newDate}
                                  onChange={e => setNewDate(e.target.value)}
                                  className="w-1/2 border rounded px-3 py-2"
                                />
                                <input
                                  type="time"
                                  value={newTime}
                                  onChange={e => setNewTime(e.target.value)}
                                  className="w-1/2 border rounded px-3 py-2"
                                />
                              </div>

                              <div className="flex justify-end gap-2 mt-4">
                                <button
                                  onClick={() => setShowModal(false)}
                                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleReschedule(rescheduleId)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                          {apt.status !== "cancelled" && (
                            <button
                              onClick={() => handleCancel(apt._id)}
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
            {filteredAppointments?.map((apt) => (
              <div key={apt._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{apt.patientName}</h3>
                    <p className="text-sm text-gray-500">{apt.type}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(apt.status)}`}>
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(apt.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {apt.time}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {apt.status === "pending" && (
                    <button
                      onClick={() => handleApprove(apt._id)}
                      className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Approve
                    </button>
                  )}
                  {apt.status !== "cancelled" && (
                    <button
                      onClick={() => {
                        setRescheduleId(apt._id)
                        setShowModal(true)
                      }}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Reschedule
                    </button>
                  )}
                  {showModal && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
                            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                              <h2 className="text-lg font-bold mb-4">Reschedule Appointment</h2>

                              <div className="space-y-3">
                                <input
                                  type="date"
                                  value={newDate}
                                  onChange={e => setNewDate(e.target.value)}
                                  className="w-1/2 border rounded px-3 py-2"
                                />
                                <input
                                  type="time"
                                  value={newTime}
                                  onChange={e => setNewTime(e.target.value)}
                                  className="w-1/2 border rounded px-3 py-2"
                                />
                              </div>

                              <div className="flex justify-end gap-2 mt-4">
                                <button
                                  onClick={() => setShowModal(false)}
                                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleReschedule(rescheduleId)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                  {apt.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(apt._id)}
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
        </main>
      </div>
    </div>
  );
}
export default Appointments;
