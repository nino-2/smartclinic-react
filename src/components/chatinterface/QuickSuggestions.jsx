"use client";
import React from "react";

function QuickSuggestions({ sendQuickMessage }) {
  const suggestions = [
    {
      text: "📅 Book Appointment",
      bgColor: "bg-[#E3F2FD]",
      textColor: "text-[#1976D2]",
      hoverBg: "hover:bg-[#1976D2]",
      hoverText: "hover:text-white"
    },
    {
      text: "🕒 Clinic Hours",
      bgColor: "bg-[#E8F5E8]",
      textColor: "text-[#4CAF50]",
      hoverBg: "hover:bg-[#4CAF50]",
      hoverText: "hover:text-white"
    },
    {
      text: "🩺 Health Concern",
      bgColor: "bg-[#FFF3E0]",
      textColor: "text-[#FFC107]",
      hoverBg: "hover:bg-[#FFC107]",
      hoverText: "hover:text-white"
    },
    {
      text: "🧠 Mental Health",
      bgColor: "bg-[#F3E5F5]",
      textColor: "text-[#9C27B0]",
      hoverBg: "hover:bg-[#9C27B0]",
      hoverText: "hover:text-white"
    }
  ];

  return (
    <div className="mb-4">
      <p className="text-sm text-[#666] mb-3 text-center">
        Quick suggestions:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className={`${suggestion.bgColor} ${suggestion.textColor} px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${suggestion.hoverBg} ${suggestion.hoverText}`}
            onClick={(event) => sendQuickMessage(suggestion.text)}
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickSuggestions;
