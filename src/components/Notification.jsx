"use client";
import React from 'react';

const Notification = ({ show, message }) => {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#4CAF50] text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Notification;
