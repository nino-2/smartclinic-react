"use client";
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-16 max-sm:py-12 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 max-sm:px-3">
        <div className="text-center mb-12">
          <h2 className="text-3xl max-sm:text-2xl font-bold text-[#1976D2] mb-4">
            Why Choose MAPOLY Smart Clinic?
          </h2>
          <p className="text-lg max-sm:text-base text-[#666]">
            Advanced healthcare technology designed for students
          </p>
        </div>
        <div className="grid max-lg:grid-cols-1 grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#1976D2] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1976D2] mb-2">
                  Instant AI Assistance
                </h3>
                <p className="text-[#666]">
                  Get immediate answers to health questions with our
                  advanced AI trained on medical knowledge and
                  university-specific healthcare protocols.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#4CAF50] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1976D2] mb-2">
                  Smart Scheduling
                </h3>
                <p className="text-[#666]">
                  Book appointments seamlessly with automatic conflict
                  detection, reminder notifications, and integration with
                  your academic schedule.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFC107] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1976D2] mb-2">
                  Secure & Private
                </h3>
                <p className="text-[#666]">
                  Your health information is protected with
                  enterprise-grade security, HIPAA compliance, and strict
                  privacy controls.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 max-sm:p-6 shadow-xl">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="border-r border-[#E3F2FD] pr-6">
                <div className="text-3xl font-bold text-[#1976D2] mb-2">
                  24/7
                </div>
                <div className="text-sm text-[#666]">
                  AI Support Available
                </div>
              </div>
              <div className="pl-6">
                <div className="text-3xl font-bold text-[#4CAF50] mb-2">
                  5000+
                </div>
                <div className="text-sm text-[#666]">Students Served</div>
              </div>
              <div className="border-r border-[#E3F2FD] pr-6 pt-6">
                <div className="text-3xl font-bold text-[#FFC107] mb-2">
                  98%
                </div>
                <div className="text-sm text-[#666]">
                  Satisfaction Rate
                </div>
              </div>
              <div className="pl-6 pt-6">
                <div className="text-3xl font-bold text-[#1976D2] mb-2">
                  &lt;2min
                </div>
                <div className="text-sm text-[#666]">
                  Average Response
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
