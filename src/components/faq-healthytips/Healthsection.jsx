import React, { useState } from 'react'

const Healthsection = () => {
      const [activeTip, setActiveTip] = useState({
            tip1: false,
            tip2: false,
            tip3: false,
            tip4: false,
            tip5: false,
        });
        const toogleDown = (dropd) => {
        setActiveTip((prev) => ({
          ...prev,
          [dropd]: !prev[dropd],
        }));
      };
      const healthTipsData = [
        {
          id: "tip1",
          question: "Stay Hydrated for Better Health",
          answer:
            "Drinking adequate water is essential for optimal body function. Aim for 8-10 glasses daily, increase intake during hot weather or exercise, and monitor your urine color as a hydration indicator.",
        //   category: "Nutrition & Wellness",
        },
        {
          id: "tip2",
          question: "Manage Stress Effectively",
          answer:
            "Practice deep breathing exercises, maintain a regular sleep schedule, engage in physical activity, and don't hesitate to seek support when feeling overwhelmed. Your mental health is just as important as physical health.",
        //   category: "Mental Health",
        },
        {
          id: "tip3",
          question: "Boost Your Immune System",
          answer:
            "Eat a balanced diet rich in fruits and vegetables, get adequate sleep (7-9 hours), exercise regularly, wash hands frequently, and consider vitamin supplements after consulting with healthcare providers.",
        //   category: "Preventive Care",
        },
        {
          id: "tip4",
          question: "Maintain Good Posture",
          answer:
            "Keep your back straight while sitting, take regular breaks from desk work, adjust your computer screen to eye level, and perform stretching exercises to prevent back and neck pain.",
        //   category: "Physical Health",
        },
        {
          id: "tip5",
          question: "Practice Good Sleep Hygiene",
          answer:
            "Establish a consistent bedtime routine, avoid screens before sleep, keep your bedroom cool and dark, limit caffeine intake in the evening, and create a relaxing environment for better rest.",
        //   category: "Sleep & Recovery",
        }
      ];
  return (
    <>
        <div className='mb-20 max-sm:mb-16'>
            <h2 className='text-3xl max-sm:text-2xl font-bold text-[#4CAF50] mb-10 max-sm:mb-8 flex items-center gap-4 max-sm:gap-3'>
                <div className='w-10 h-10 max-sm:w-8 max-sm:h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center'>
                    <svg className='w-6 h-6 max-sm:w-5 max-sm:h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M9.5 15.5l1.5 1.5 5-5-1.5-1.5L11 14l-1.5-1.5zM20 12c0-1.1-.9-2-2-2h-1V8c0-3.3-2.7-6-6-6S5 4.7 5 8v2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8zM7 8c0-2.2 1.8-4 4-4s4 1.8 4 4v2H7V8z' />
                    </svg>
                  </div>
                  Health Tips & Wellness
                </h2>
                <div className='space-y-6 max-sm:space-y-4'>
                  <div className='flex flex-col gap-4 max-sm:gap-3'>
                {/*Rendering Health Tips Data*/}
                  {
                    healthTipsData.map((health, index)=>(
                        <div key={index} className={`border-2 border-[#C8E6C9] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#F1F8E9] to-[#E8F5E8] hover:border-[#4CAF50] ${activeTip[health.id] ? 'bg-gradient-to-r from-[#F8FDFF] to-[#F0F8FF]' : 'bg-white'}`}>
                            <button
                                className={`w-full px-8 cursor-pointer max-sm:px-6 py-6 max-sm:py-5 text-left bg-gradient-to-r from-[#E8F5E8] to-[#F1F8E9] hover:from-[#C8E6C9] hover:to-[#E8F5E8] transition-all duration-300 flex items-center justify-between group ${activeTip[health.id] ? 'bg-gradient-to-r from-[#E3F2FD] to-[#F0F8FF] hover:from-[#BBDEFB] hover:to-[#E3F2FD]' : 'bg-gradient-to-r from-white to-white'} transition-all duration-300 flex items-center justify-between group`}
                                onClick={() => toogleDown(health.id)}>
                                <span className='font-bold text-[#2E7D32] text-xl max-sm:text-lg group-hover:text-[#388E3C] transition-colors duration-200 pr-4 leading-relaxed'>
                                 {health.question}
                                </span>
                                <svg className='w-8 h-8 max-sm:w-7 max-sm:h-7 text-[#4CAF50] transition-all duration-300 group-hover:scale-110 flex-shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M19 9l-7 7-7-7' />
                                </svg>
                            </button>
                            {activeTip[health.id] && (
                                <div className='p-6 max-sm:p-5 bg-white'>
                                    <p className='text-[#333] text-base max-sm:text-sm leading-relaxed'>{health.answer}</p>
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

export default Healthsection