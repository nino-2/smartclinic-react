"use client";
import React from 'react';
import Form  from './Form';

const  AppointmentDetailsStep = ({ formData, updateFormData, onNext, onPrevious, isValid }) => {
  const timeOptions = [
    { value: '', label: 'Select Time' },
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
  ];

  const reasonTypeOptions = [
    { value: '', label: 'Select reason type' },
    { value: 'general', label: 'General Consultation' },
    { value: 'checkup', label: 'Health Checkup' },
    { value: 'mental', label: 'Mental Health' },
    { value: 'emergency', label: 'Urgent Care' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#1976D2] mb-6">
        Appointment Details
      </h2>
      <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6">
        <Form
          label="Preferred Date"
          type="date"
          value={formData.date}
          onInput={(event) => updateFormData('date', event.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />
        <Form
          label="Preferred Time"
          type="select"
          value={formData.time}
          onChange={(event) => updateFormData('time', event.target.value)}
          options={timeOptions}
          required
        />
        <div className="max-md:col-span-1 col-span-2">
          <Form
            label="Reason for Visit"
            type="select"
            value={formData.reasonType}
            onChange={(event) => updateFormData('reasonType', event.target.value)}
            options={reasonTypeOptions}
            required
            className="mb-4"
          />
          <Form
            type="textarea"
            placeholder="Please describe your symptoms or reason for visit..."
            value={formData.reasonDetails}
            onInput={(event) => updateFormData('reasonDetails', event.target.value)}
            rows={4}
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          className="bg-[#E0E0E0] text-[#666] px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#BDBDBD]"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="bg-[#1976D2] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#1565C0] disabled:bg-[#E0E0E0] disabled:text-[#999]"
          disabled={!isValid}
          onClick={onNext}
        >
          Review Booking
        </button>
      </div>
    </div>
  );
}
export default AppointmentDetailsStep;

