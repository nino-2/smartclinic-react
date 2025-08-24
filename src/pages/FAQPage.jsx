import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Healthsection from '../components/faq-healthytips/Healthsection'
import OperatingHours from '../components/contact-us/OperatingHours'
import ContactUs from '../components/contact-us/ContactUs'
import Needmore from '../components/faq-healthytips/Needmore'
import FqSection from '../components/faq-healthytips/FqSection'

const FAQPage = () => {
  return (
    <>
        <Navbar/>
        <main className='flex-1 bg-[#F8F9FA]'>
        <div className='min-h-screen py-8 bg-gradient-to-br from-[#F8FDFF] via-[#FFFFFF] to-[#F1F8E9]'>
           <div className='max-w-6xl mx-auto px-4 max-sm:px-3'>
            {/* Header Section */}
             <div className='bg-white border border-[#E3F2FD] px-8 max-sm:px-6 py-6 max-sm:py-6 rounded-t-2xl shadow-lg'>
                <div className='flex items-center gap-4 mb-6'>
                    <div className='w-16 h-16 max-sm:w-12 max-sm:h-12 bg-gradient-to-br from-[#1976D2] via-[#2196F3] to-[#4CAF50] rounded-2xl flex items-center justify-center shadow-lg'>
                        <svg className='w-8 h-8 max-sm:w-6 max-sm:h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-4xl max-sm:text-2xl font-bold bg-gradient-to-r from-[#1976D2] to-[#4CAF50] bg-clip-text text-transparent'>FAQ & Health Information</h1>
                        <p className='text-sm text-[#666]'>Find answers to common questions and essential health tips from MAPOLY Clinic</p>
                    </div>
                </div>
             </div>
            {/* FAQ, Healthy tips, Contact Details */}
            <div className='bg-white rounded-b-2xl shadow-xl border border-[#E3F2FD] border-t-0'>
               <div className='p-7 max-sm:p-6'>
                {/*Urgent Notice*/}
                <div className='bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-2xl p-4 max-sm:p-4 mb-12 max-sm:mb-8 shadow-lg'>
                   <div className='flex items-center gap-4 mb-6'>
                     <div className='w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg'>
                        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                     </div>
                     <h3 className='text-2xl max-sm:text-xl font-bold text-red-600'>Urgent Notice</h3>
                   </div>
                   <p className='text-red-700 font-bold mb-4'>Flu Season Alert - Vaccination Available </p>
                   <p className='text-red-600 leading-relaxed text-base max-sm:text-sm'>Flu season is here! Get your flu vaccination at our clinic. If you have symptoms of fever, body aches, or respiratory issues, please call ahead before visiting. Free flu shots available for all our students and staffs.</p>
                </div>
                {/* FAQ Section */}
                 <FqSection/>
                {/* Healthy Tips Section */}
                <Healthsection/>
                {/* Operating Hours & Contact Details Section */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 max-sm:gap-8 mb-20 max-sm:mb-16'>
                    <OperatingHours/>
                    <ContactUs/>
                </div>
                { /* Additional Information Section */}
                <Needmore/>
               </div>
            </div>
           </div>
        </div>
        </main>
        <Footer/>
    </>
  )
}

export default FAQPage