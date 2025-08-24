import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ChatHeader from '../components/chatinterface/ChatHeader'
import ChatInput from '../components/chatinterface/ChatInput'
import ChatMessage from '../components/chatinterface/ChatMessage'
import QuickSuggestions from '../components/chatinterface/QuickSuggestions'
import TypingIndicator from '../components/chatinterface/TypingIndicator'
import Footer from '../components/Footer'


const ChatWithAI = () => {
  const [endChat, setEndChat] = useState(() => null);
  const [messages, setMessages] = useState(() => null);
  const [isTyping, setIsTyping] = useState(() => null);
  const [sendQuickMessage, setSendQuickMessage] = useState(() => null);
  const [currentMessage, setCurrentMessage] = useState(() => null);
  const [sendMessage, setSendMessage] = useState(() => null);
  const [toggleRecording, setToggleRecording] = useState(() => null);
  const [isRecording, setIsRecording] = useState(() => null);

  return (
    <>
      <Navbar />
            <main className="flex-1 bg-[#F8F9FA]">
      <div className="h-screen flex flex-col">
        <ChatHeader endChat={endChat} />

        <div className="flex-1 overflow-y-auto px-4 py-6 max-sm:px-3 max-sm:pb-32">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#E3F2FD] text-[#1976D2] px-4 py-2 rounded-full text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Chat started with AI Assistant
              </div>
            </div>

            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">
                Hey @FIRSTNAME, What can I help with?
              </h2>
            </div>

            {messages?.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            <TypingIndicator isTyping={isTyping} />
          </div>
        </div>

        <div className="bg-white border-t border-[#E3F2FD] px-4 py-4 max-sm:px-3">
          <div className="max-w-4xl mx-auto">
            <QuickSuggestions sendQuickMessage={sendQuickMessage} />
            <ChatInput
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              sendMessage={sendMessage}
              toggleRecording={toggleRecording}
              isRecording={isRecording}
            />
          </div>
        </div>
      </div>
     </main>
    <Footer/>
    </>
  )
}

export default ChatWithAI