"use client";
import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';




const Navbar = ({
  mobileMenuOpen,
  currentPage,
  toggleMobileMenu,
  closeMobileMenu,
  navigateTo,
  bookAppointment,
  ...props 
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const {isLoggedIn, firstname, handleLogout, loading} = useAuth();
  const navigate = useNavigate()

  const handleClickLogout = async() => {
    await handleLogout()
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-white shadow-sm border-b border-[#E3F2FD] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 max-sm:px-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1976D2] rounded-lg flex items-center justify-center">
              <img src="/mapoly-logo.png" alt="" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-[#1976D2] max-sm:text-lg">
                MAPOLY
              </h1>
              <span className="text-xs text-[#666] max-sm:hidden">
                Smart Clinic Assistant
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/">
            <button
              
              style={{
                color: currentPage === 'home' ? '#1976D2' : '#666',
                fontWeight: currentPage === 'home' ? '600' : '400'
              }}
              className="transition-colors duration-200 cursor-pointer"
            >
              Home
            </button>
            </Link>
            <Link to='/appointment'>
            <button
             
              className="text-[#666] font-medium transition-colors duration-200 cursor-pointer"
            >
              Book Appointment
            </button>
            </Link>
            <Link to='/faq'>
            
            <button
              style={{
                color: currentPage === 'contact' ? '#1976D2' : '#666',
                fontWeight: currentPage === 'contact' ? '600' : '400'
              }}
              className="transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
            </Link>
            
            {/* Conditional Login/User Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 text-[#666] font-medium transition-colors duration-200 cursor-pointer hover:text-[#1976D2]"
                >
                  <span>Welcome, {firstname}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleClickLogout}
                      className="w-full text-left px-4 py-2 text-[#666] hover:bg-[#F5F5F5] hover:text-[#1976D2] transition-colors duration-200 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to='/auth/login'>
                <button
                  
                  style={{
                    color: currentPage === 'login' ? '#1976D2' : '#666',
                    fontWeight: currentPage === 'login' ? '600' : '400'
                  }}
                  className="transition-colors duration-200 cursor-pointer"
                >
                  Login
                </button>
              </Link>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-[#F5F5F5] text-[#666] cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-semibold text-[#1976D2]">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg bg-[#F5F5F5] text-[#666] cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile User Welcome Section */}
          {isLoggedIn && (
            <div className="mb-6 p-3 bg-[#E3F2FD] rounded-lg">
              <p className="text-sm text-[#1976D2] font-medium">Welcome, {firstname}!</p>
            </div>
          )}

          <nav className="flex flex-col gap-4">
            <Link to='/'>
            <button
              style={{
                color: currentPage === 'home' ? '#1976D2' : '#666',
                backgroundColor: currentPage === 'home' ? '#E3F2FD' : 'transparent'
              }}
              className="p-3 rounded-lg font-medium transition-all duration-200 cursor-pointer text-left"
            >
              Home
            </button>
            </Link>
            <Link to='/appointment'>
            <button
              onClick={bookAppointment}
              className="p-3 rounded-lg font-medium text-[#666] transition-all duration-200 cursor-pointer text-left"
            >
              Book Appointment
            </button>
            </Link>

            <Link to='/faq'>
            <button
              
              style={{
                color: currentPage === 'contact' ? '#1976D2' : '#666',
                backgroundColor: currentPage === 'contact' ? '#E3F2FD' : 'transparent'
              }}
              className="p-3 rounded-lg font-medium transition-all duration-200 cursor-pointer text-left"
            >
              Contact
            </button>
            </Link>
            {/* Conditional Mobile Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleClickLogout}
                className="p-3 rounded-lg font-medium text-[#666] transition-all duration-200 cursor-pointer text-left hover:bg-[#F5F5F5] hover:text-[#1976D2]"
              >
                Logout
              </button>
            ) : (
              <Link to='/auth/login'>
              <button
                
                style={{
                  color: currentPage === 'login' ? '#1976D2' : '#666',
                  backgroundColor: currentPage === 'login' ? '#E3F2FD' : 'transparent'
                }}
                className="p-3 rounded-lg font-medium transition-all duration-200 cursor-pointer text-left"
              >
                Login
              </button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
