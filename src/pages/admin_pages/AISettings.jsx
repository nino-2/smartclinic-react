import { useState } from "react";
import { 
  Bot, Brain, MessageSquare, Volume2, VolumeX, BarChart3, 
  Plus, Edit, Trash2, Save, X, Settings, Mic, MicOff,
  TrendingUp, Users, Clock, Zap
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import AdminHeader from "../../components/admin/AdminHeader.jsx";



const AISettings = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);

  // Sample FAQ database
  const [faqDatabase, setFaqDatabase] = useState([
    {
      id: 1,
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment by calling our front desk at (555) 123-4567 or using our online booking system available 24/7.",
      category: "Appointments",
      usage: 145
    },
    {
      id: 2,
      question: "What should I bring to my appointment?",
      answer: "Please bring a valid ID, insurance cards, list of current medications, and any relevant medical records or test results.",
      category: "General",
      usage: 98
    },
    {
      id: 3,
      question: "What are your office hours?",
      answer: "We're open Monday-Friday 8AM-6PM, Saturday 9AM-3PM, and closed on Sundays. Emergency services are available 24/7.",
      category: "General",
      usage: 87
    },
    {
      id: 4,
      question: "How do I get my test results?",
      answer: "Test results are available through our patient portal within 24-48 hours. You'll receive an email notification when they're ready.",
      category: "Medical",
      usage: 76
    }
  ]);

  // Fallback responses
  const [fallbackResponses, setFallbackResponses] = useState([
    "I apologize, but I don't have specific information about that. Please contact our staff for assistance.",
    "I'm not sure about that particular question. Would you like me to connect you with a healthcare professional?",
    "That's a great question! For the most accurate information, please speak with one of our medical staff members.",
    "I don't have that information readily available. Please call our office at (555) 123-4567 for assistance."
  ]);

  // AI Usage Analytics (sample data)
  const analyticsData = {
    totalInteractions: 1247,
    successfulResponses: 1089,
    fallbackTriggers: 158,
    averageResponseTime: "0.8s",
    topCategories: [
      { category: "Appointments", count: 456, percentage: 36.6 },
      { category: "General", count: 389, percentage: 31.2 },
      { category: "Medical", count: 235, percentage: 18.9 },
      { category: "Billing", count: 167, percentage: 13.4 }
    ],
    weeklyStats: [
      { day: "Mon", interactions: 195 },
      { day: "Tue", interactions: 203 },
      { day: "Wed", interactions: 187 },
      { day: "Thu", interactions: 221 },
      { day: "Fri", interactions: 234 },
      { day: "Sat", interactions: 134 },
      { day: "Sun", interactions: 73 }
    ]
  };

  const tabs = [
    { id: "faq", name: "FAQ Database", icon: MessageSquare },
    { id: "fallback", name: "Fallback Responses", icon: Brain },
    { id: "voice", name: "Voice Settings", icon: Volume2 },
    { id: "analytics", name: "Usage Analytics", icon: BarChart3 }
  ];

  const handleSaveFAQ = (faqData) => {
    if (editingFAQ) {
      setFaqDatabase(prev => prev.map(faq => 
        faq.id === editingFAQ.id ? { ...faq, ...faqData } : faq
      ));
      setEditingFAQ(null);
    } else {
      const newFAQ = {
        id: Date.now(),
        ...faqData,
        usage: 0
      };
      setFaqDatabase(prev => [...prev, newFAQ]);
    }
    setShowAddFAQ(false);
  };

  const handleDeleteFAQ = (id) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqDatabase(prev => prev.filter(faq => faq.id !== id));
    }
  };

  const handleEditFAQ = (faq) => {
    setEditingFAQ(faq);
    setShowAddFAQ(true);
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
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Assistant Settings</h1>
                <p className="text-gray-600">Customize AI responses and knowledge base</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Database Tab */}
          {activeTab === "faq" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">FAQ Database</h2>
                <button
                  onClick={() => setShowAddFAQ(true)}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </button>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Frequently Asked Questions</h3>
                    <span className="text-sm text-gray-500">{faqDatabase.length} total</span>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {faqDatabase.map((faq) => (
                    <div key={faq.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-900">{faq.question}</h4>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {faq.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{faq.answer}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Used {faq.usage} times
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleEditFAQ(faq)}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFAQ(faq.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fallback Responses Tab */}
          {activeTab === "fallback" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Fallback Responses</h2>
                <p className="text-sm text-gray-600">These responses are used when the AI can't provide a specific answer</p>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Default Responses</h3>
                </div>
                <div className="p-6 space-y-4">
                  {fallbackResponses.map((response, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={response}
                          onChange={(e) => {
                            const newResponses = [...fallbackResponses];
                            newResponses[index] = e.target.value;
                            setFallbackResponses(newResponses);
                          }}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          rows={2}
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newResponses = fallbackResponses.filter((_, i) => i !== index);
                          setFallbackResponses(newResponses);
                        }}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setFallbackResponses([...fallbackResponses, ""])}
                    className="inline-flex items-center px-3 py-2 text-sm text-purple-600 hover:text-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Response
                  </button>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Voice Settings Tab */}
          {activeTab === "voice" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Voice Assistant Settings</h2>
                <p className="text-sm text-gray-600">Configure voice interaction preferences</p>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6 space-y-6">
                  {/* Voice Enable/Disable */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {voiceEnabled ? <Volume2 className="w-5 h-5 text-green-600 mr-3" /> : <VolumeX className="w-5 h-5 text-gray-400 mr-3" />}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Voice Assistant</h3>
                        <p className="text-sm text-gray-500">Enable voice interaction for patients</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        voiceEnabled ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Voice Settings (only show if enabled) */}
                  {voiceEnabled && (
                    <>
                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Voice Configuration</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Voice Type</label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                              <option>Female - Natural</option>
                              <option>Male - Professional</option>
                              <option>Female - Friendly</option>
                              <option>Male - Calm</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Speech Speed</label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                              <option>Slow</option>
                              <option>Normal</option>
                              <option>Fast</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                              <option>English (US)</option>
                              <option>English (UK)</option>
                              <option>Spanish</option>
                              <option>French</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Wake Word</label>
                            <input 
                              type="text" 
                              defaultValue="Hey Assistant"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Audio Settings</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Response Volume</label>
                            <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Microphone Sensitivity</label>
                            <input type="range" min="0" max="100" defaultValue="60" className="w-full" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Usage Analytics</h2>
                <p className="text-sm text-gray-600">Monitor AI assistant performance and usage patterns</p>
              </div>

              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Interactions</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.totalInteractions.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <Zap className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round((analyticsData.successfulResponses / analyticsData.totalInteractions) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.averageResponseTime}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <Brain className="w-8 h-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Fallback Triggers</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.fallbackTriggers}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Usage Chart */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Weekly Interactions</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-end space-x-2 h-64">
                    {analyticsData.weeklyStats.map((stat, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-purple-600 rounded-t"
                          style={{ height: `${(stat.interactions / Math.max(...analyticsData.weeklyStats.map(s => s.interactions))) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2">{stat.day}</span>
                        <span className="text-xs font-medium text-gray-900">{stat.interactions}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Categories */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Top Question Categories</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {analyticsData.topCategories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-900">{category.category}</span>
                            <span className="text-sm text-gray-600">{category.count} ({category.percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit FAQ Modal */}
      {showAddFAQ && (
        <FAQModal
          faq={editingFAQ}
          onSave={handleSaveFAQ}
          onClose={() => {
            setShowAddFAQ(false);
            setEditingFAQ(null);
          }}
        />
      )}
    </div>
  );
}

// FAQ Modal Component
function FAQModal({ faq, onSave, onClose }) {
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    category: faq?.category || "General"
  });

  const categories = ["General", "Appointments", "Medical", "Billing", "Emergency"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.question.trim() && formData.answer.trim()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              {faq ? "Edit FAQ" : "Add New FAQ"}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter the question..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={4}
                placeholder="Enter the answer..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                {faq ? "Update FAQ" : "Add FAQ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AISettings
