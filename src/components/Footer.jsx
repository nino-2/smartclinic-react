"use client";
import React from 'react';
import {  FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1976D2] text-white py-12 max-sm:py-8">
      <div className="max-w-7xl mx-auto px-4 max-sm:px-3">
        <div className="grid max-lg:grid-cols-1 grid-cols-4 gap-8">
          <div className="max-lg:col-span-1 col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img src="/mapoly-logo.png" alt="" />
              </div>
              <div>
                <h3 className="text-xl font-bold">MAPOLY Smart Clinic</h3>
                <p className="text-[#B3E5FC] text-sm">
                  Intelligent Healthcare Assistant
                </p>
              </div>
            </div>
            <p className="text-[#B3E5FC] mb-4">
              Providing advanced AI-powered healthcare support to the MAPOLY
              community with 24/7 availability, smart scheduling, and
              personalized medical assistance.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#45A049] transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#45A049] transition-colors">
               <TwitterIcon className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#45A049] transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-[#B3E5FC]">
              <li>
                <Link to='/'>
                <button
                 
                  className="cursor-pointer transition-colors duration-200 hover:text-white"
                >
                  Home
                </button>
                </Link>
              </li>

              
              <li>
                <Link to='/appointment'>
                <button
                  
                  className="cursor-pointer transition-colors duration-200 hover:text-white"
                >
                  Book Appointment
                </button>
                </Link>
              </li>

              <li>
                <button 
                  className="cursor-pointer transition-colors duration-200 hover:text-white"
                >
                  Health Info
                </button>
              </li>

              <Link to='/smartclinic'>
              <li>
                <button
                  className="cursor-pointer transition-colors duration-200 hover:text-white"
                >
                  AI Assistant
                </button>
              </li>
              </Link>

            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-[#B3E5FC]">
              <li>
                <Link to='/faq'>
                <button 
                  className="cursor-pointer transition-colors duration-200 hover:text-white"
                >
                  Contact Us
                </button>
                </Link>
              </li>
              <li>
                <button className="cursor-pointer transition-colors duration-200 hover:text-white">
                  Help Center
                </button>
              </li>
              <li>
                <button className="cursor-pointer transition-colors duration-200 hover:text-white">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="cursor-pointer transition-colors duration-200 hover:text-white">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
