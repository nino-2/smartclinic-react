"use client";
import React, { useState } from 'react';
import  StepIndicator  from '../components/appointment/StepIndicator';
import  PersonalInfoStep  from '../components/appointment/PersonalInfoStep'; 
import  ConfirmationStep  from '../components/appointment/ConfirmationStep';
import AppointmentDetailsStep  from '../components/appointment/AppointmentDetailsStep';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AppointmentBooking = ()  => {
  const [appointmentStep, setAppointmentStep] = useState(1);
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  const [appointmentReference, setAppointmentReference] = useState('');

  const [appointmentForm, setAppointmentForm] = useState({
    fullName: '',
    idNumber: '',
    department: '',
    gender: '',
    phoneNumber: '',
    date: '',
    time: '',
    reasonType: '',
    reasonDetails: '',
    smsReminder: false,
    emailReminder: false
  });

  const updateFormData = (field, value) => {
    setAppointmentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStep1Valid = () => {
    return appointmentForm.fullName &&
           appointmentForm.idNumber &&
           appointmentForm.department &&
           appointmentForm.gender &&
           appointmentForm.phoneNumber;
  };

  const isStep2Valid = () => {
    return appointmentForm.date &&
           appointmentForm.time &&
           appointmentForm.reasonType &&
           appointmentForm.reasonDetails;
  };

  const nextStep = () => {
    setAppointmentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setAppointmentStep(prev => prev - 1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const generateReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'APT-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const clearForm = () => {
    setAppointmentForm({
      fullName: '',
      idNumber: '',
      department: '',
      gender: '',
      phoneNumber: '',
      date: '',
      time: '',
      reasonType: '',
      reasonDetails: '',
      smsReminder: false,
      emailReminder: false
    });
    setAppointmentStep(1);
  };

  const submitAppointment = () => {
    const reference = generateReference();
    setAppointmentReference(reference);
    setAppointmentSubmitted(true);
  };

  const resetForm = () => {
    clearForm();
    setAppointmentSubmitted(false);
    setAppointmentReference('');
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 max-sm:px-3">
        <header className="bg-white border-b border-[#E3F2FD] px-6 py-6 rounded-t-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1976D2] to-[#4CAF50] rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1976D2]">
                Book Appointment
              </h1>
              <p className="text-sm text-[#666]">
                Schedule your visit with MAPOLY Clinic
              </p>
            </div>
          </div>
          <StepIndicator currentStep={appointmentStep} />
        </header>

        <main className="bg-white rounded-b-xl shadow-lg">
          {appointmentStep === 1 && (
            <PersonalInfoStep
              formData={appointmentForm}
              updateFormData={updateFormData}
              onNext={nextStep}
              isValid={isStep1Valid()}
            />
          )}

          {appointmentStep === 2 && (
            <AppointmentDetailsStep
              formData={appointmentForm}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrevious={previousStep}
              isValid={isStep2Valid()}
            />
          )}

          {appointmentStep === 3 && (
            <ConfirmationStep
              formData={appointmentForm}
              updateFormData={updateFormData}
              onPrevious={previousStep}
              onClear={clearForm}
              onSubmit={submitAppointment}
              onReset={resetForm}
              isSubmitted={appointmentSubmitted}
              appointmentReference={appointmentReference}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          )}
        </main>
      </div>
    </div>
    <Footer/>
    </>
  );
}
export default AppointmentBooking;


