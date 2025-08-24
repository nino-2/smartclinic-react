import { Calendar, MessageSquareText } from 'lucide-react'
import React from 'react'

const Needmore = () => {
    const moreSection = [
        {
            icon: Calendar,
            name: 'Book Appointment',
            info: 'Schedule a consultation with our medical professionals',
            status: 'Blue'
        },
        {
            icon: MessageSquareText,
            name: 'AI Assitant',
            info: 'Get instant answers from our smarthealth assistant',
            status: 'Green'
        }
    ]
    const statusColors = {
        Blue: '#1976D2',
        Green: '#4CAF50',
    }
  return (
    <>
      <div className='bg-gradient-to-r from-[#E3F2FD] via-[#F0F8FF] to-[#F1F8E9] rounded-2xl p-10 max-sm:p-8 shadow-xl border-2 border-[#B3E5FC]'>
         <div className='text-center mb-10 max-sm:mb-8'>
            <h3 className='text-4xl max-sm:text-3xl font-bold bg-gradient-to-r from-[#1976D2] to-[#4CAF50] bg-clip-text text-transparent mb-6 max-sm:mb-4'>Need More Help?</h3>
            <p className='text-[#666] max-w-3xl mx-auto text-xl max-sm:text-lg leading-relaxed'>
                Can't find what you're looking for? Our team is here to help you with any questions or concerns about your health and wellness. 
            </p>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-sm:gap-6'>
            {
                moreSection.map((more,index)=>(
                  <div key={index}>
                    <div className='flex flex-col items-center gap-6 max-sm:gap-4 p-5 max-sm:p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='w-20 h-20 max-sm:w-16 max-sm:h-16  rounded-full flex items-center justify-center mx-auto mb-5 max-sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg'
                     style={{ backgroundColor: statusColors[more.status] }}>
                        <more.icon className='w-8 h-8 max-sm:w-8 max-sm:h-8 text-white' />
                    </div>
                    
                    <h4 className='font-bold  mb-2 text-2xl max-sm:text-xl'
                        style={{ color: statusColors[more.status] }}
                        >{more.name}
                </h4>
                <p className='text-[#666] text-center leading-relaxed text-sm max-sm:text-base'>{more.info}</p>
                </div>
                <div className='text-center mt-4 max-sm:mt-3'>
                    
                </div>
                
               </div>
                ))
            }
         </div>
      </div>
    </>
  )
}

export default Needmore