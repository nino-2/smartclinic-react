"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

function QuickSuggestions({ sendQuickMessage }) {
  const navigate = useNavigate();

  const suggestions = [
    {
      text: "📅 Book Appointment",
      action: "route",
      route: "/appointment",
    },
    {
      text: "🕒 Clinic Hours",
      action: "route",
      route: "/faq",
    },
    {
      text: "🩺 Health Concern",
      action: "ai",
      prompt: "Guide me on what to do if I have health concerns",
    },
    {
      text: "🧠 Mental Health",
      action: "ai",
      prompt: "Provide advice on mental health support for students",
    },
  ];

  const handleClick = (suggestion) => {
    if (suggestion.action === "route" && suggestion.route) {
      navigate(suggestion.route);
    } else if (suggestion.action === "ai") {
      sendQuickMessage(suggestion.prompt || suggestion.text);
    }
  };

  return (
    <div className="mb-4">
      <p className="text-sm text-[#666] mb-3 text-center">Quick suggestions:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-[#E3F2FD] text-[#1976D2] hover:bg-[#1976D2] hover:text-white`}
            onClick={() => handleClick(suggestion)}
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickSuggestions;
