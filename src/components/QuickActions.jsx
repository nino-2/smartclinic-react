"use client";
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <section className="py-16 max-sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 max-sm:px-3">
        <div className="text-center mb-12">
          <h2 className="text-3xl max-sm:text-2xl font-bold text-[#1976D2] mb-4">
            Quick Actions
          </h2>
          <p className="text-lg max-sm:text-base text-[#666]">
            Everything you need for your healthcare journey
          </p>
        </div>
        <div className="grid max-lg:grid-cols-1 grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#E3F2FD] to-white rounded-2xl p-8 max-sm:p-6 text-center shadow-lg border border-[#E3F2FD] transition-all duration-200 hover:shadow-xl">
            <div className="w-16 h-16 bg-[#1976D2] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 3h-4v2h4V6zm0 4h-4v2h4v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1976D2] mb-3">
              Book Appointment
            </h3>
            <p className="text-[#666] mb-6">
              Schedule your visit with our medical professionals quickly
              and easily.
            </p>

            <Link to='/appointment'>
            <button
            
              className="w-full bg-[#1976D2] text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-[#1565C0] cursor-pointer"
            >
              Book Now
            </button>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-[#F1F8E9] to-white rounded-2xl p-8 max-sm:p-6 text-center shadow-lg border border-[#E8F5E8] transition-all duration-200 hover:shadow-xl">
            <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1976D2] mb-3">
              Health Information
            </h3>
            <p className="text-[#666] mb-6">
              Access comprehensive health resources, FAQs, and wellness
              tips.
            </p>
            <Link to="/faq">
            <button
              
              className="w-full bg-[#4CAF50] text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-[#45A049] cursor-pointer"
            >
              Learn More
            </button>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-[#FFF8E1] to-white rounded-2xl p-8 max-sm:p-6 text-center shadow-lg border border-[#FFF3E0] transition-all duration-200 hover:shadow-xl">
            <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 2.5l3.5 2.5-3.5 2.5V6.5zm-2 4.5H4v-1h9v1zm0-2H4V8h9v1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1976D2] mb-3">
              Contact Support
            </h3>
            <p className="text-[#666] mb-6">
              Get in touch with our support team for any questions or
              assistance.
            </p>
            <Link to='/faq'>
            <button
              
              className="w-full bg-[#FFC107] text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-[#FFB300] cursor-pointer"
            >
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
