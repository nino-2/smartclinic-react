"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import StepIndicator from "../components/appointment/StepIndicator";
import PersonalInfoStep from "../components/appointment/PersonalInfoStep";
import AppointmentDetailsStep from "../components/appointment/AppointmentDetailsStep";
import ConfirmationStep from "../components/appointment/ConfirmationStep";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const AppointmentBooking = () => {
  const [appointmentStep, setAppointmentStep] = useState(1);
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  const [appointmentReference, setAppointmentReference] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ firstname: "", lastname: "" });
  
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch user data for prefill
  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get(`${API_URL}/auth/profile`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data.status) {
          setUserData({
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
          });
          formik.setFieldValue("firstname", res.data.user.firstname);
          formik.setFieldValue("lastname", res.data.user.lastname);
        }
      })
      .catch(() => {});
  }, []);

  // Validation Schemas for each step
  const validationSchema = [
    // Step 1
    Yup.object({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      matric: Yup.string().required("Matric No is required"),
      department: Yup.string().required("Department is required"),
      level: Yup.string().required("Level is required"),
      gender: Yup.string().required("Gender is required"),
      phonenumber: Yup.string().required("Phone number is required"),
     
    }),
    // Step 2
    Yup.object({
      date: Yup.string().required("Date is required"),
      time: Yup.string().required("Time is required"),
      reasontype: Yup.string().required("Reason type is required"),
      reasondetails: Yup.string().required("Reason details are required"),
    }),
    // Step 3 - No extra validation, just review
    Yup.object(),
  ];

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      firstname:  userData?.firstname || "",
      lastname:  userData?.lastname || "",
      matric: "",
      department: "",
      gender: "",
      level: "",
      phonenumber: "",
      date: "",
      time: "",
      reasontype: "",
      reasondetails: "",
    },
    validationSchema: validationSchema[appointmentStep - 1],
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${API_URL}/appointment/book`,
          values,
          { 
            headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }}
          
        );
        if (response.data.status) {
          setAppointmentReference(generateReference());
          setAppointmentSubmitted(true);
        }
      } catch (error) {
        console.error("Booking failed", error);
      }
    },
    enableReinitialize: true,
  });

  // Reference Generator
  const generateReference = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "APT-";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Step Handlers
  const nextStep = async () => {
    try {
      await validationSchema[appointmentStep - 1].validate(formik.values, { abortEarly: false });
      setAppointmentStep((prev) => prev + 1);
    } catch (validationErrors) {
      validationErrors.inner.forEach((err) => {
        formik.setFieldError(err.path, err.message);
      });
    }
  };

  const previousStep = () => setAppointmentStep((prev) => prev - 1);

  // Formatters
  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <>
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        closeMobileMenu={() => setMobileMenuOpen(false)}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 max-sm:px-3">
          <header className="bg-white border-b border-[#E3F2FD] px-6 py-6 rounded-t-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1976D2] to-[#4CAF50] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1976D2]">Book Appointment</h1>
                <p className="text-sm text-[#666]">Schedule your visit with MAPOLY Clinic</p>
              </div>
            </div>
            <StepIndicator currentStep={appointmentStep} />
          </header>

          <main className="bg-white rounded-b-xl shadow-lg sm:px-6 lg:px-8">
            {appointmentStep === 1 && (
              <PersonalInfoStep
                formik={formik}
                onNext={nextStep}
              />
            )}
            {appointmentStep === 2 && (
              <AppointmentDetailsStep
                formik={formik}
                onNext={nextStep}
                onPrevious={previousStep}
              />
            )}
            {appointmentStep === 3 && (
              <ConfirmationStep
                formik={formik}
                onPrevious={previousStep}
                onSubmit={formik.handleSubmit}
                isSubmitted={appointmentSubmitted}
                setAppointmentSubmitted={setAppointmentSubmitted} 
                setAppointmentStep={setAppointmentStep}
                appointmentReference={appointmentReference}
                formatDate={formatDate}
                formatTime={formatTime}
              />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentBooking;
