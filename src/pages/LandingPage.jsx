import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import QuickActions from '../components/QuickActions';
import FeaturesSection from '../components/FeaturesSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import { motion } from 'framer-motion';
// LandingPage component
const LandingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    closeMobileMenu();
  };

  const startChat = () => {
    setChatStarted(true);
    setShowNotification(true);
    setNotificationMessage('AI Assistant is ready to help you!');
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const bookAppointment = () => {
    setShowNotification(true);
    setNotificationMessage('Redirecting to appointment booking...');
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] font-[Inter]">
      <Notification show={showNotification} message={notificationMessage} />

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        currentPage={currentPage}
        toggleMobileMenu={toggleMobileMenu}
        closeMobileMenu={closeMobileMenu}
        navigateTo={navigateTo}
        bookAppointment={bookAppointment}
      />

      <main className="flex-1">
        <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        
        >
        <HeroSection
          startChat={startChat}
          bookAppointment={bookAppointment}
        />
        </motion.div>

        <motion.div 
        variants={fadeInUp}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.2 }}>

        <QuickActions
          bookAppointment={bookAppointment}
          navigateTo={navigateTo}
        />
        </motion.div>

        <motion.div 
        variants={fadeInUp}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.2 }}>
        <FeaturesSection />
          </motion.div>

        <motion.div 
        variants={fadeInUp}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.2 }}>

        <CallToAction
          startChat={startChat}
          bookAppointment={bookAppointment}
        />
        </motion.div>

      </main>

      <Footer
        navigateTo={navigateTo}
        bookAppointment={bookAppointment}
        startChat={startChat}
      />
    </div>
  )
}

export default LandingPage



