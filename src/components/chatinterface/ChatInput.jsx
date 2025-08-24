"use client";
import React from "react";

function ChatInput({
  currentMessage,
  setCurrentMessage,
  sendMessage,
  toggleRecording,
  isRecording
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full px-4 py-3 pr-12 border border-[#E3F2FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent shadow-md"
            value={currentMessage}
            onInput={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            onClick={(event) => toggleRecording()}
            style={{
              backgroundColor: isRecording ? "#FF5722" : "#E3F2FD",
              color: isRecording ? "white" : "#1976D2",
            }}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
            </svg>
          </button>
        </div>
        <button
          className="w-12 h-12 bg-[#1976D2] text-white rounded-xl font-medium transition-all duration-200 hover:bg-[#1565C0] flex items-center justify-center"
          onClick={(event) => sendMessage()}
        >
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
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
        </button>
      </div>

      {isRecording && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF5722] text-white px-4 py-2 rounded-full text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Recording... Speak now
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatInput;
