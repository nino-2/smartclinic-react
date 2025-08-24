import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import PageLayout from '@/components/admin/PageLayout';
import FilterBar from '@/components/admin/FilterBar';
import Table from '@/components/admin/Table';
import Button from '@/components/admin/Button';
import Modal, { ModalFooter, ModalButton } from '@/components/admin/Modal';
import { formatDate } from '@/utils/status';

const AdminPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { toast } = useToast();

  // Sample data
  const patients = [
    {
      id: 1, firstName: "John", lastName: "Doe", matricNo: "MAPOLY/2023/001",
      email: "john.doe@student.mapoly.edu.ng", phone: "+234 801 234 5678",
      bloodGroup: "O+", lastVisit: "2024-01-10", totalVisits: 5
    },
    {
      id: 2, firstName: "Jane", lastName: "Smith", matricNo: "MAPOLY/2023/002",
      email: "jane.smith@student.mapoly.edu.ng", phone: "+234 802 345 6789",
      bloodGroup: "A+", lastVisit: "2024-01-12", totalVisits: 12
    }
  ];

  const filteredData = patients.filter(item =>
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.matricNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Actions
  const handleView = (patient) => {
    setSelectedPatient(patient);
    setModalType('view');
    setShowModal(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this patient record?')) {
      toast({ title: "Deleted", description: "Patient record deleted" });
    }
  };

  const handleAdd = () => {
    setSelectedPatient(null);
    setModalType('add');
    setShowModal(true);
  };

  // Page header
  const headerActions = [
    <Button key="add" variant="primary" icon={Plus} onClick={handleAdd}>
      Add Patient
    </Button>
  ];

  // Filters
  const filters = [
    {
      type: 'search',
      placeholder: 'Search by name, matric no...',
      value: searchTerm,
      onChange: setSearchTerm,
      span: 'col-span-2'
    }
  ];

  // Table columns
  const columns = [
    {
      header: "Patient Info",
      render: (item) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-[#1976D2] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="ml-4">
            <div className="font-medium">{item.firstName} {item.lastName}</div>
            <div className="text-sm text-gray-500">{item.matricNo}</div>
          </div>
        </div>
      )
    },
    {
      header: "Contact",
      render: (item) => (
        <div>
          <div className="text-sm">{item.phone}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      )
    },
    { header: "Blood Group", key: "bloodGroup" },
    { header: "Last Visit", render: (item) => formatDate(item.lastVisit) },
    { header: "Total Visits", key: "totalVisits" },
    {
      header: "Actions",
      render: (item) => (
        <div className="flex gap-1">
          <Button variant="primary" icon={Eye} onClick={() => handleView(item)}>View</Button>
          <Button variant="warning" icon={Edit} onClick={() => handleEdit(item)}>Edit</Button>
          <Button variant="danger" icon={Trash2} onClick={() => handleDelete(item.id)}>Delete</Button>
        </div>
      )
    }
  ];

  // Mobile card
  const renderMobileCard = (item, index) => (
    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-[#1976D2] rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="ml-3">
          <div className="font-medium">{item.firstName} {item.lastName}</div>
          <div className="text-sm text-gray-500">{item.matricNo}</div>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-3">
        {item.phone} • {item.bloodGroup} • {item.totalVisits} visits
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={() => handleView(item)}>View</Button>
        <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
        <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Health Records Management"
      subtitle="Manage patient records and medical history"
      actions={headerActions}
    >
      <FilterBar filters={filters} onClear={() => setSearchTerm('')} />

      <Table
        title="Patient Records"
        data={filteredData}
        columns={columns}
        renderMobileCard={renderMobileCard}
      />

      {/* Patient Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'view' ? 'Patient Details' : modalType === 'edit' ? 'Edit Patient' : 'Add Patient'}
        size={modalType === 'view' ? 'large' : 'medium'}
        footer={modalType !== 'view' && (
          <ModalFooter>
            <ModalButton variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </ModalButton>
            <ModalButton onClick={() => {
              toast({ title: "Saved", description: "Patient information saved" });
              setShowModal(false);
            }}>
              Save
            </ModalButton>
          </ModalFooter>
        )}
      >
        {modalType === 'view' && selectedPatient ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#0D47A1] mb-3">Personal Information</h4>
              <div className="space-y-2">
                <div><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</div>
                <div><strong>Matric No:</strong> {selectedPatient.matricNo}</div>
                <div><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#0D47A1] mb-3">Contact Information</h4>
              <div className="space-y-2">
                <div><strong>Email:</strong> {selectedPatient.email}</div>
                <div><strong>Phone:</strong> {selectedPatient.phone}</div>
                <div><strong>Total Visits:</strong> {selectedPatient.totalVisits}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Matric Number</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Blood Group</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
}
export default AdminPatient;
