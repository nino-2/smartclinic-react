"use client";
import React from "react";

const ConfirmationStep = ({
  formik,
  onPrevious,
  onSubmit,
  isSubmitted,
  setAppointmentSubmitted,
  setAppointmentStep,
  appointmentReference,
  formatDate,
  formatTime,
}) => {
  if (isSubmitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Appointment Confirmed!
        </h2>
        <p className="mt-2">Reference: {appointmentReference}</p>
        <button
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
          onClick={()=> {
             setAppointmentSubmitted(false);
             setAppointmentStep(1);
             formik.resetForm();
          }} 
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#1976D2] mb-6">
        Review & Confirm
      </h2>
      <div className="space-y-3">
        <h1 className="text-xl font-semibold ">Appointment Summary</h1>
        <p>Name: {formik.values.firstname} {formik.values.lastname}</p>
        <p>Matric No: {formik.values.matric}</p>
        <p>Department: {formik.values.department}</p>
        <p>Phone: {formik.values.phonenumber}</p>
        <p>Date: {formatDate(formik.values.date)}</p>
        <p>Time: {formatTime(formik.values.time)}</p>
        <p>Reason: {formik.values.reasontype}</p>
      </div>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="bg-gray-300 px-8 py-3 rounded"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="bg-green-600 text-white px-8 py-3 rounded cursor-pointer"
          onClick={onSubmit}
        >
          Submit Booking
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;


