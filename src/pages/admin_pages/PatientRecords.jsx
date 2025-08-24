import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Bell, Settings,Search,Plus,Eye,Edit,Trash2,
  Upload,FileText,Image,Download,Clock,User,Phone,Mail,MapPin,
  Calendar as CalendarIcon
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminHeader from "../../components/admin/AdminHeader";

const PatientRecords = ()  => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // 'name' or 'matric'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const location = useLocation();


  // Sample patient records data
  const [patients, setPatients] = useState([
    {
      id: 1,
      matricNo: "MED001",
      name: "John Smith",
      age: 28,
      gender: "Male",
      phone: "+1-234-567-8901",
      email: "john.smith@example.com",
      address: "123 Main St, City",
      lastVisit: "2024-01-10",
      bloodGroup: "O+",
      allergies: "Penicillin",
      medicalHistory: ["Hypertension", "Diabetes"],
      reports: [
        { name: "Blood Test Report.pdf", type: "pdf", date: "2024-01-10" },
        { name: "X-Ray.jpg", type: "image", date: "2024-01-05" }
      ]
    },
    {
      id: 2,
      matricNo: "MED002",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1-234-567-8902",
      email: "sarah.johnson@example.com",
      address: "456 Oak Ave, City",
      lastVisit: "2024-01-12",
      bloodGroup: "A+",
      allergies: "None",
      medicalHistory: ["Asthma"],
      reports: [
        { name: "Chest X-Ray.pdf", type: "pdf", date: "2024-01-12" }
      ]
    },
    {
      id: 3,
      matricNo: "MED003",
      name: "Mike Brown",
      age: 45,
      gender: "Male",
      phone: "+1-234-567-8903",
      email: "mike.brown@example.com",
      address: "789 Pine St, City",
      lastVisit: "2024-01-08",
      bloodGroup: "B+",
      allergies: "Latex",
      medicalHistory: ["Heart Disease", "High Cholesterol"],
      reports: [
        { name: "ECG Report.pdf", type: "pdf", date: "2024-01-08" },
        { name: "Blood Work.pdf", type: "pdf", date: "2024-01-08" }
      ]
    },
    {
      id: 4,
      matricNo: "MED004",
      name: "Lisa Davis",
      age: 29,
      gender: "Female",
      phone: "+1-234-567-8904",
      email: "lisa.davis@example.com",
      address: "321 Elm St, City",
      lastVisit: "2024-01-14",
      bloodGroup: "AB+",
      allergies: "Nuts",
      medicalHistory: ["Migraine"],
      reports: [
        { name: "MRI Scan.jpg", type: "image", date: "2024-01-14" }
      ]
    }
  ]);

  // Filter patients based on search
  const filteredPatients = patients.filter(patient => {
    if (searchType === "name") {
      return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return patient.matricNo.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // Handle patient actions
  const handleAddPatient = () => {
    setShowAddModal(true);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleEditPatient = (id) => {
    alert(`Edit patient ${id} - This would open an edit form`);
  };

  const handleDeletePatient = (id) => {
    if (confirm("Are you sure you want to delete this patient record?")) {
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUploadReport = (patientId) => {
    alert(`Upload medical report for patient ${patientId} - This would open file upload dialog`);
  };

  const handleDownloadReport = (reportName) => {
    alert(`Download ${reportName} - This would download the file`);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Health Records Management</h1>
            <p className="text-gray-600">Manage patient health records and medical history</p>
          </div>

          {/* Search and Actions Bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search Type Toggle */}
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Search by Name</option>
                  <option value="matric">Search by Matric No.</option>
                </select>

                {/* Search Input */}
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={searchType === "name" ? "Enter patient name..." : "Enter matric number..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Add Patient Button */}
              <button
                onClick={handleAddPatient}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </button>
            </div>
          </div>

          {/* Patient Cards - Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.matricNo} • {patient.age}y • {patient.gender}</p>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {patient.bloodGroup}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-3 space-y-1">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                </div>

                <div className="border-t pt-3 mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleViewPatient(patient)}
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handleEditPatient(patient.id)}
                    className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleUploadReport(patient.id)}
                    className="inline-flex items-center px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Patients Table - Desktop View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {patient.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.matricNo} • {patient.age}y • {patient.gender}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.phone}</div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          {patient.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleViewPatient(patient)}
                          className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleEditPatient(patient.id)}
                          className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleUploadReport(patient.id)}
                          className="inline-flex items-center px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-gray-900">
                {filteredPatients.length}
              </div>
              <div className="text-sm text-gray-500">Total Patients</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">
                {filteredPatients.filter(p => new Date(p.lastVisit) > new Date(Date.now() - 7*24*60*60*1000)).length}
              </div>
              <div className="text-sm text-gray-500">Recent Visits (7 days)</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">
                {filteredPatients.reduce((acc, p) => acc + p.reports.length, 0)}
              </div>
              <div className="text-sm text-gray-500">Medical Reports</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredPatients.filter(p => p.allergies !== "None").length}
              </div>
              <div className="text-sm text-gray-500">Patients with Allergies</div>
            </div>
          </div>
        </main>
      </div>

      {/* Patient Details Modal */}
      {showViewModal && selectedPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowViewModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-full overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Patient Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900 border-b pb-2">Personal Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm"><strong>Name:</strong> {selectedPatient.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm"><strong>Matric No:</strong> {selectedPatient.matricNo}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm"><strong>Age:</strong> {selectedPatient.age} years</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm"><strong>Gender:</strong> {selectedPatient.gender}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{selectedPatient.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900 border-b pb-2">Medical Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm"><strong>Last Visit:</strong> {new Date(selectedPatient.lastVisit).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm"><strong>Blood Group:</strong> 
                          <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            {selectedPatient.bloodGroup}
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="text-sm"><strong>Allergies:</strong> {selectedPatient.allergies}</span>
                      </div>
                      <div>
                        <span className="text-sm"><strong>Medical History:</strong></span>
                        <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                          {selectedPatient.medicalHistory.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Reports */}
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-900 border-b pb-2 mb-4">Medical Reports</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedPatient.reports.map((report, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {report.type === "pdf" ? 
                              <FileText className="h-5 w-5 text-red-500 mr-2" /> : 
                              <Image className="h-5 w-5 text-blue-500 mr-2" />
                            }
                            <div>
                              <div className="text-sm font-medium">{report.name}</div>
                              <div className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadReport(report.name)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowAddModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-2xl w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Add New Patient</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600">Add new patient form would go here with fields for:</p>
                <ul className="mt-4 list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Matric Number</li>
                  <li>Full Name</li>
                  <li>Age & Gender</li>
                  <li>Contact Information</li>
                  <li>Blood Group</li>
                  <li>Allergies</li>
                  <li>Medical History</li>
                </ul>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert("Save patient functionality would be implemented here");
                      setShowAddModal(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Patient
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
   

export default PatientRecords