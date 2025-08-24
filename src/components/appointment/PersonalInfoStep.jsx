"use client";
import React from 'react';
import { FormField } from '../appointment/FormField';


export function PersonalInfoStep({ formData, updateFormData, onNext, isValid }) {
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];
  const levelOptions = [
    { value: '', label: 'Select Level' },
    {value: 'ND I', label: 'ND I'},
    {value: 'ND II', label: 'ND II'},
    {value: 'HND I', label: 'HND I'},
    {value: 'HND II', label: 'HND II'}
  ]
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#1976D2] mb-6">
        Personal Information
      </h2>
      <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6">
        <FormField
          label="First Name"
          placeholder="Enter your full name"
          value={formData.lastName}
          onInput={(event) => updateFormData('fullName', event.target.value)}
          required
        />
        <FormField
          label="Last Name"
          placeholder="Enter your full name"
          value={formData.lastName}
          onInput={(event) => updateFormData('fullName', event.target.value)}
          required
        />
        <FormField
          label="Matric Number / Staff ID"
          placeholder="Enter your ID"
          value={formData.idNumber}
          onInput={(event) => updateFormData('idNumber', event.target.value)}
          required
        />
        <FormField
          label="Department"
          placeholder="Enter your department"
          value={formData.department}
          onInput={(event) => updateFormData('department', event.target.value)}
          required
        />
          <FormField
          label="Level"
          type="select"
          value={formData.level}
          onChange={(event) => updateFormData('level', event.target.value)}
          options={levelOptions}
          required
        />
        <FormField
          label="Gender"
          type="select"
          value={formData.gender}
          onChange={(event) => updateFormData('gender', event.target.value)}
          options={genderOptions}
          required
        />
        <FormField
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onInput={(event) => updateFormData('phoneNumber', event.target.value)}
          required
          
        />
      </div>
      <div className="flex justify-end mt-8">
        <button
          className="bg-[#1976D2] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#1565C0] disabled:bg-[#E0E0E0] disabled:text-[#999]"
          disabled={!isValid}
          onClick={onNext}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
