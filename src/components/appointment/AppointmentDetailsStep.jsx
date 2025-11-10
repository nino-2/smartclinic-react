"use client";
import React from "react";

const AppointmentDetailsStep = ({ formik, onNext, onPrevious }) => {
  const timeOptions = [
    { value: "", label: "Select Time" },
    { value: "08:00", label: "8:00 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
  ];

  const reasonTypeOptions = [
    { value: "", label: "Select reason type" },
    { value: "general", label: "General Consultation" },
    { value: "checkup", label: "Health Checkup" },
    { value: "mental", label: "Mental Health" },
    { value: "emergency", label: "Urgent Care" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#1976D2] mb-6">
        Appointment Details
      </h2>
      <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Preferred Date</label>
          <input
            name="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
          />
          {formik.touched.date && formik.errors.date && (
            <p className="text-red-500 text-sm">{formik.errors.date}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Preferred Time</label>
          <select
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
          >
            {timeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {formik.touched.time && formik.errors.time && (
            <p className="text-red-500 text-sm">{formik.errors.time}</p>
          )}
        </div>

        <div className="max-md:col-span-1 col-span-2">
          <label className="block mb-2">Reason for Visit</label>
          <select
            name="reasontype"
            value={formik.values.reasontype}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded mb-4"
          >
            {reasonTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {formik.touched.reasontype && formik.errors.reasontype && (
            <p className="text-red-500 text-sm">{formik.errors.reasontype}</p>
          )}

          <textarea
            name="reasondetails"
            rows="4"
            placeholder="Describe reason for visit..."
            value={formik.values.reasondetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
          />
          {formik.touched.reasondetails && formik.errors.reasondetails && (
            <p className="text-red-500 text-sm">{formik.errors.reasondetails}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="bg-[#E0E0E0] text-[#666] px-8 py-3 rounded-lg cursor-pointer"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="bg-[#1976D2] text-white px-8 py-3 rounded-lg cursor-pointer"
          onClick={onNext}
        >
          Review Booking
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetailsStep;


