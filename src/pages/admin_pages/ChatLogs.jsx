import { useEffect, useState } from "react";
import {  
   X,Search,Filter,Eye,Download, MessageSquare,ThumbsUp,
  ThumbsDown,Star,Clock,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminHeader from "../../components/admin/AdminHeader";
import axios from "axios";


const ChatLogs = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [accuracyFilter, setAccuracyFilter] = useState("all");
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  // Sample chat logs data
  const [chatLogs, setChatLogs] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/chatlogs`, {
          headers:{ Authorization: `Bearer ${token}` }
        });
        setChatLogs(res.data.formattedLogs || []);;
      } catch (error) {
        console.error('Error fetching chat logs:', error);
      }
    }
    fetchChatLogs();
  }, []);
  

  // Filter chat logs based on search criteria
  const filteredChatLogs = chatLogs.filter(log => {
    const matchesSearch = 
      log.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesUser = userFilter === "all" || log.patientId === userFilter;
    const matchesDate = !dateFilter || log.startTime.includes(dateFilter);
    const matchesAccuracy = 
      accuracyFilter === "all" ||
      (accuracyFilter === "high" && log.aiAccuracy >= 90) ||
      (accuracyFilter === "medium" && log.aiAccuracy >= 80 && log.aiAccuracy < 90) ||
      (accuracyFilter === "low" && log.aiAccuracy < 80);
    
    return matchesSearch && matchesUser && matchesDate && matchesAccuracy;
  });

  

  // Handle AI accuracy rating
  const handleRateAccuracy = (id, rating) => {
    setChatLogs(prev => 
      prev.map(log => log.id === id ? { ...log, adminRating: rating } : log)
    );
  };


  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: "bg-green-100 text-green-800",
      escalated: "bg-red-100 text-red-800",
      incomplete: "bg-yellow-100 text-yellow-800"
    };
    return statusClasses[status] || "bg-gray-100 text-gray-800";
  };

  // Get accuracy badge styling
  const getAccuracyBadge = (accuracy) => {
    if (accuracy >= 90) return "bg-green-100 text-green-800";
    if (accuracy >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Get unique patient list for filter
  const uniquePatients = [...new Set(chatLogs.map(log => ({ id: log.patientId, name: log.patientName })))];

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Sidebar */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content wrapper */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <main className="p-4 md:p-6 lg:ml-64">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Chat Logs Management</h1>
            <p className="text-sm md:text-base text-gray-600">Monitor patient-AI conversation history and AI performance</p>
          </div>

          {/* Filters and Search Bar */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by patient, session ID, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* User Filter */}
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Patients</option>
                  {uniquePatients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>

                {/* Date Filter */}
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* AI Accuracy Filter */}
                <select
                  value={accuracyFilter}
                  onChange={(e) => setAccuracyFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Accuracy</option>
                  <option value="high">High (90%+)</option>
                  <option value="medium">Medium (80-89%)</option>
                  <option value="low">Low (&lt;80%)</option>
                </select>
              </div>

              
            </div>
          </div>

          {/* Chat Logs Table - Desktop View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Session Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AI Accuracy
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
                  {filteredChatLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {log.sessionId}
                          </div>
                          <div className="text-sm text-gray-500">
                            {/* {new Date(log.startTime).toLocaleString()} */}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.patientName}</div>
                        
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{log.duration}</div>
                        <div className="text-sm text-gray-500">{log.messageCount} messages</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccuracyBadge(log.aiAccuracy)}`}>
                          {log.aiAccuracy}%
                        </span>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRateAccuracy(log._id, star)}
                              className={`h-3 w-3 ${star <= log.adminRating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              <Star className="h-3 w-3 fill-current" />
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(log.status)}`}>
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedConversation(log);
                            setShowConversationModal(true);
                          }}
                          className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 cursor-pointer"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chat Logs Cards - Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredChatLogs.map((log) => (
              <div key={log.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{log.sessionId}</h3>
                    <p className="text-sm text-gray-500">{log.patientName}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(log.status)}`}>
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {log.duration}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {log.messageCount} messages
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccuracyBadge(log.aiAccuracy)}`}>
                    AI Accuracy: {log.aiAccuracy}%
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRateAccuracy(log._id, star)}
                        className={`h-4 w-4 ${star <= log.adminRating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {log.keywords.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedConversation(log);
                    setShowConversationModal(true);
                  }}
                  className="w-full mt-3 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Conversation
                </button>
              </div>
            ))}
          </div>

          {/* Analytics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-gray-900">
                {filteredChatLogs.length}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Total Conversations</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-green-600">
                {Math.round(filteredChatLogs.reduce((acc, log) => acc + log.aiAccuracy, 0) / filteredChatLogs.length || 0)}%
              </div>
              <div className="text-xs md:text-sm text-gray-500">Average AI Accuracy</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-blue-600">
                {filteredChatLogs.filter(log => log.status === "completed").length}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Completed Sessions</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-lg md:text-2xl font-bold text-red-600">
                {filteredChatLogs.filter(log => log.status === "escalated").length}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Escalated Cases</div>
            </div>
          </div>
        </main>
      </div>

      {/* Conversation Detail Modal */}
      {showConversationModal && selectedConversation.messages && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowConversationModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-full overflow-y-auto">
              <div className="flex items-center justify-between p-4 md:p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Conversation Details - {selectedConversation.sessionId}
                </h3>
                <button
                  onClick={() => setShowConversationModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-4 md:p-6">
                {/* Session Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900">Patient: </span>
                    <span className="text-sm text-gray-600">{selectedConversation.patientName}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Duration: </span>
                    <span className="text-sm text-gray-600">{selectedConversation.duration}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">AI Accuracy: </span>
                    <span className={`text-sm font-semibold ${selectedConversation.aiAccuracy >= 90 ? 'text-green-600' : selectedConversation.aiAccuracy >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedConversation.aiAccuracy}%
                    </span>
                  </div>
                </div>

                {/* Keywords */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConversation.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Conversation Messages */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Conversation:</h4>
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'patient'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <div className="text-sm">{message.message}</div>
                        <div className={`text-xs mt-1 ${message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.sender === 'patient' ? 'Patient' : 'AI Assistant'} • {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Admin Rating */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Admin Rating:</h4>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRateAccuracy(selectedConversation._id, star)}
                        className={`h-5 w-5 ${star <= selectedConversation.adminRating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({selectedConversation.adminRating}/5 stars)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ChatLogs
