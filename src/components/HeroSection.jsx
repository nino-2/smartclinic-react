"use client";
import React from 'react';
import { Link } from 'react-router-dom';
const HeroSection = ({ startChat, bookAppointment }) => {
  return (
    <section className="bg-gradient-to-br from-[#E3F2FD] to-[#F1F8E9] py-16 max-sm:py-12">
      <div className="max-w-7xl mx-auto px-4 max-sm:px-3">
        <div className="text-center mb-12">
          <h1 className="text-4xl max-sm:text-3xl font-bold text-[#1976D2] mb-4">
            Welcome to MAPOLY Smart Clinic Assistant
          </h1>
          <p className="text-lg max-sm:text-base text-[#666] max-w-2xl mx-auto">
            Your intelligent healthcare companion providing 24/7 support,
            appointment booking, and personalized medical assistance for
            the MAPOLY community.
          </p>
        </div>
        <div className="grid max-lg:grid-cols-1 grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 max-sm:p-6 shadow-lg border border-[#E3F2FD]">
              <h2 className="text-2xl max-sm:text-xl font-semibold text-[#1976D2] mb-4 flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-[#4CAF50]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                AI-Powered Healthcare
              </h2>
              <p className="text-[#666] mb-6">
                Get instant answers to your health questions, symptom
                guidance, and medical information from our advanced AI
                assistant trained specifically for university healthcare.
              </p>
              <Link to='/smartclinic'>
              <button
                onClick={startChat}
                className="w-full bg-[#1976D2] text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:bg-[#1565C0]"
              >
                💬 Chat with AI Assistant
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 max-sm:p-4 shadow-md border border-[#E8F5E8] text-center">
                <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 3h-4v2h4V6zm0 4h-4v2h4v-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1976D2] mb-2">
                  Quick Booking
                </h3>
                <p className="text-sm text-[#666]">
                  Schedule appointments in seconds
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 max-sm:p-4 shadow-md border border-[#FFF3E0] text-center">
                <div className="w-12 h-12 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1976D2] mb-2">
                  24/7 Support
                </h3>
                <p className="text-sm text-[#666]">
                  Always available when you need help
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/heroimg.jpg"
                alt="Students at clinic"
                className="rounded-2xl shadow-xl max-w-full "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1976D2]/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
