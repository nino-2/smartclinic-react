"use client";
import React from "react";

function ChatHeader({ endChat }) {
  return (
    <header className="bg-white border-b border-[#E3F2FD] px-4 py-4 max-sm:px-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1976D2] to-[#4CAF50] rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#1976D2]">
              MAPOLY AI Assistant
            </h1>
            <p className="text-sm text-[#4CAF50] flex items-center gap-1">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
              Online & Ready to Help
            </p>
          </div>
        </div>
        <button
          className="bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#E64A19] max-sm:px-3 max-sm:text-sm"
          onClick={(event) => endChat()}
        >
          End Chat
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
