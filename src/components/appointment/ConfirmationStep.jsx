"use client";
import React from 'react';
import {Form } from './Form';

export function ConfirmationStep({
  formData,
  updateFormData,
  onPrevious,
  onClear,
  onSubmit,
  onReset,
  isSubmitted,
  appointmentReference,
  formatDate,
  formatTime
}) {
  if (isSubmitted) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#4CAF50] mb-4">
            Your appointment has been booked!
          </h2>
          <p className="text-[#666] mb-6">
            Thank you for booking with MAPOLY Clinic. You will receive
            confirmation details shortly.
          </p>
          <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-[#333] mb-3">
              Appointment Reference:
            </h3>
            <p className="text-lg font-mono text-[#1976D2] mb-4">
              {appointmentReference}
            </p>
            <p className="text-sm text-[#666]">
              Please save this reference number for your records.
            </p>
          </div>
          <button
            className="bg-[#1976D2] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#1565C0]"
            onClick={onReset}
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#1976D2] mb-6">
        Review & Confirm
      </h2>
      <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#333] mb-4">
          Appointment Summary
        </h3>
        <div className="grid max-md:grid-cols-1 grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-[#666]">Name:</span>
            <span className="ml-2 text-[#333]">
              {formData.fullName}
            </span>
          </div>
          <div>
            <span className="font-medium text-[#666]">ID:</span>
            <span className="ml-2 text-[#333]">
              {formData.idNumber}
            </span>
          </div>
          <div>
            <span className="font-medium text-[#666]">
              Department:
            </span>
            <span className="ml-2 text-[#333]">
              {formData.department}
            </span>
          </div>
          <div>
            <span className="font-medium text-[#666]">
              Phone:
            </span>
            <span className="ml-2 text-[#333]">
              {formData.phoneNumber}
            </span>
          </div>
          <div>
            <span className="font-medium text-[#666]">Date:</span>
            <span className="ml-2 text-[#333]">
              {formatDate(formData.date)}
            </span>
          </div>
          <div>
            <span className="font-medium text-[#666]">Time:</span>
            <span className="ml-2 text-[#333]">
              {formatTime(formData.time)}
            </span>
          </div>
          <div className="max-md:col-span-1 col-span-2">
            <span className="font-medium text-[#666]">
              Reason:
            </span>
            <span className="ml-2 text-[#333]">
              {formData.reasonDetails}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#E3F2FD] rounded-lg p-4 mb-6">
        <Form
          type="checkbox"
          id="smsReminder"
          label="Send me SMS reminders about this appointment"
          checked={formData.smsReminder}
          onChange={(event) => updateFormData('smsReminder', event.target.checked)}
        />
        <div className="mt-3">
          <Form
            type="checkbox"
            id="emailReminder"
            label="Send me email reminders about this appointment"
            checked={formData.emailReminder}
            onChange={(event) => updateFormData('emailReminder', event.target.checked)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-[#E0E0E0] text-[#666] px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#BDBDBD]"
          onClick={onPrevious}
        >
          Previous
        </button>
        <div className="flex gap-3">
          <button
            className="bg-[#FF5722] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#E64A19]"
            onClick={onClear}
          >
            Clear Form
          </button>
          <button
            className="bg-[#4CAF50] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#45A049]"
            onClick={onSubmit}
          >
            Submit Booking
          </button>
        </div>
      </div>
    </div>
  );
}
