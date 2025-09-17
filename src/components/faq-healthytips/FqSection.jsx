import React, { useState } from 'react'

const FqSection = () => {

    const [activeFaq, setActiveFaq] = useState({
        faq1: false,
        faq2: false,
        faq3: false,
        faq4: false,
        faq5: false,
    });
    const toogleDown = (dropd) => {
    setActiveFaq((prev) => ({
      ...prev,
      [dropd]: !prev[dropd],
    }));
  };
   const faqData = [
    {
      id: "faq1",
      question: "What are the clinic operating hours?",
      answer:
        "Our clinic is open Monday-Friday from 8:00 AM to 6:00 PM, and Saturday from 8:00 AM to 6:00 PM. Emergency services are available 24/7 for urgent medical needs.",
    },
    {
      id: "faq2",
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment through our online booking system, call our reception desk, or use our AI assistant. We recommend booking in advance to secure your preferred time slot.",
    },
    {
      id: "faq3",
      question: "What services does MAPOLY Clinic offer?",
      answer:
        "We provide comprehensive healthcare services including general consultations, health screenings, mental health support, emergency care, preventive medicine, and specialized treatments for students and staff.",
    },
    {
      id: "faq4",
      question: "Do I need to bring any documents for my appointment?",
      answer:
        "Please bring your student ID or staff ID, any previous medical records, current medications list, and insurance information if applicable. This helps us provide better care.",
    },
    {
      id: "faq5",
      question: "What should I do in case of a medical emergency?",
      answer:
        "For life-threatening emergencies, call 911 immediately. For urgent but non-emergency situations, contact our emergency line at +234 (0) 803 911 0000. Our emergency services are available 24/7.",
    },
  ]

  return (
    <>
      <div className='mb-20 max-sm:mb-16'>
        <h2 className='text-3xl max-sm:text-2xl font-bold text-[#1976D2] mb-10 max-sm:mb-8 flex items-center gap-4 max-sm:gap-3'>
          <div className='w-10 h-10 max-sm:w-8 max-sm:h-8 bg-[#1976D2] rounded-lg flex items-center justify-center'>
            <svg className='w-6 h-6 max-sm:w-5 max-sm:h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' />
            </svg>
            
          </div>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6 max-sm:space-y-4'>
          <div className='flex flex-col gap-4 max-sm:gap-3'>
          {
            faqData.map((faq, index)=>(
                <div key={index} className={`border-2 border-[#B3E5FC] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${activeFaq[faq.id] ? 'bg-gradient-to-r from-[#F8FDFF] to-[#F0F8FF]' : 'bg-white'}`}>
                    <button
                        className={`w-full px-8 max-sm:px-6 py-6 max-sm:py-5 text-left ${activeFaq[faq.id] ? 'bg-gradient-to-r from-[#E3F2FD] to-[#F0F8FF] hover:from-[#BBDEFB] hover:to-[#E3F2FD]' : 'bg-gradient-to-r from-white to-white'} transition-all duration-300 flex items-center justify-between group`}
                        onClick={() => toogleDown(faq.id)}>
                        <span className='font-bold text-[#0D47A1] text-xl max-sm:text-lg group-hover:text-[#1976D2] transition-colors duration-200 pr-4 leading-relaxed'>
                         {faq.question}
                        </span>
                        <svg className='w-8 h-8 max-sm:w-7 max-sm:h-7 text-[#1976D2] transition-all duration-300 group-hover:scale-110 flex-shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M19 9l-7 7-7-7' />
                        </svg>
                    </button>
                    {activeFaq[faq.id] && (
                        <div className='p-6 max-sm:p-5 bg-white'>
                            <p className='text-[#333] text-base max-sm:text-sm leading-relaxed'>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default FqSection