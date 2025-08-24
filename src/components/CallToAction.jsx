"use client";
import React from 'react';

const CallToAction = ({ startChat, bookAppointment }) => {
  return (
    <section className="py-16 max-sm:py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 max-sm:px-3 text-center">
        <h2 className="text-3xl max-sm:text-2xl font-bold text-[#1976D2] mb-8">
          Ready to Get Started?
        </h2>
        <p className="text-lg max-sm:text-base text-[#666] mb-8">
          Join thousands of MAPOLY students who trust our smart clinic
          assistant for their healthcare needs.
        </p>
        <div className="flex max-sm:flex-col gap-4 justify-center">
          <button
            onClick={startChat}
            className="bg-[#1976D2] text-white py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:bg-[#1565C0]"
          >
            💬 Start Chatting Now
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
          <button
            onClick={bookAppointment}
            className="bg-white text-[#1976D2] border-2 border-[#1976D2] py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-[#E3F2FD]"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
