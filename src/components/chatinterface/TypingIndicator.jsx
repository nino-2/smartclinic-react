"use client";
import React from "react";

function TypingIndicator({ isTyping }) {
  if (!isTyping) return null;

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] max-sm:max-w-[90%]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1976D2] to-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="bg-white border border-[#E3F2FD] rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#1976D2] rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-[#1976D2] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-[#1976D2] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
