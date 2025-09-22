import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ChatHeader from '../components/chatinterface/ChatHeader'
import ChatInput from '../components/chatinterface/ChatInput'
import ChatMessage from '../components/chatinterface/ChatMessage'
import QuickSuggestions from '../components/chatinterface/QuickSuggestions'
import TypingIndicator from '../components/chatinterface/TypingIndicator'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const ChatWithAI = () => {
  
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null)
  const {firstname} = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

   // End chat
  const endChat = () => {
    setMessages([]);
    setCurrentMessage("");
  };

   // Send normal message
  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setCurrentMessage("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/chat/message`, // adjust backend URL
        { message: userMsg.text, sessionId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            },
        }   
      );

      // store new session id from first message
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }
      

      const aiMsg = {
        id: Date.now() + 1,
        type: "ai",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

   // Send quick suggestion
  const sendQuickMessage = (text) => {
    setCurrentMessage(text);
    sendMessage();
  };

  // Toggle voice recording (placeholder)
  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <>
      <Navbar
       mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        closeMobileMenu={() => setMobileMenuOpen(false)}
      />
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
                Hey {firstname}, What can I help with?
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