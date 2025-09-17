"use client";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const ChatMessage = ({ message}) => {
  const {firstname} = useAuth()
  if (message.type === "ai") {
    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          {/* AI Avatar */}
          <div
            className="w-8 h-8 bg-gradient-to-br from-[#1976D2] to-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0"
            aria-label="AI assistant"
            title="AI assistant"
          >
            <span className="text-white text-xs font-bold">AI</span>
          </div>

          {/* AI Message */}
          <div className="bg-white border border-[#E3F2FD] rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
            {message.id === 1 ? (
              <div className="text-center">
                <p className="text-lg font-semibold text-[#1976D2] mb-3">
                  Hey {firstname}, what can I help with?
                </p>
              </div>
            ) : (
              <p className="text-[#333] leading-relaxed">{message.text}</p>
            )}
            <p className="text-xs text-[#999] mt-2">{message.timestamp}</p>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === "user") {
    return (
      <div className="w-full">
        <div className="flex items-start gap-3 justify-end">
          {/* User Message */}
          <div
            className="bg-[#1976D2] text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm"
            aria-label="Your message"
          >
            <p className="leading-relaxed">{message.text}</p>
            <p className="text-xs text-[#B3E5FC] mt-2">{message.timestamp}</p>
          </div>

          {/* User Avatar */}
          <div
            className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0"
            aria-label="You"
            title="You"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default ChatMessage;
