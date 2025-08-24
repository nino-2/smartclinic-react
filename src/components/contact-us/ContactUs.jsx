import React from 'react'
import {  AlertTriangle, Mail, MapPinIcon,PhoneIcon } from 'lucide-react'
const ContactUs = () => {
    const contactData = [
        {
            icon: PhoneIcon,
            name: 'Main Line',
            info: '+234 123 4567',
            status: 'Blue'
        },
        {
            icon: AlertTriangle,
            name: 'Emergency',
            info: '+234 987 6543',
            status: 'Red'
        },
        {
            icon: Mail,
            name: 'Email',
            info: 'clinic@mapoly.edu.ng',
            status: 'Green'
        },
        {
            icon: MapPinIcon,
            name: 'Location',
            info: 'MAPOLY Campus, Abeokuta',
            status: 'Yellow'
        }
    ]
    const statusColors = {
        Blue: '#1976D2',
        Red: '#EF4444',
        Green: '#4CAF50',
        Yellow: '#FF9800'
    }
        
    
  return (
    <>
      <div className='bg-gradient-to-br from-[#F1F8E9] via-[#E8F5E8] to-[#F1F8E9] rounded-2xl p-8 max-sm:p-6 shadow-xl border-2 border-[#C8E6C9]'>
         <h3 className='text-3xl max-sm:text-2xl font-bold text-[#0D47A1] mb-8 max-sm:mb-6 flex items-center gap-4 max-sm:gap-3'>
           <div className='w-10 h-10 max-sm:w-8 max-sm:h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center'>
                <Mail className='w-6 h-6 max-sm:w-5 max-sm:h-5 text-white' />
           </div>
            Contact Details
         </h3>
         <div className='space-y-6 max-sm:space-y-4'>
            {/*Rendering Contact Data*/}

            {
                contactData.map((contact, index) => (
                   <div key={index}>
                    <div className='flex items-center gap-4 max-sm:gap-3 p-4 max-sm:p-3 bg-white rounded-xl shadow-lg border border-[#E0E0E0]'>
                      <div className='w-12 h-12 max-sm:w-10 max-sm:h-10  rounded-full flex items-center justify-center shadow-md'
                        style={{ backgroundColor: statusColors[contact.status] }}>
                        <contact.icon className='w-6 h-6 max-sm:w-6 max-sm:h-6 text-white' />
                      </div>
                      <div>
                        <p className='font-bold text-[#1A237E] text-sm max-sm:text-xs mb-1'>{contact.name}</p>
                        <p className='text-[#0D47A1] font-bold text-lg max-sm:text-base'
                         style={{ color: statusColors[contact.status] }}
                        >{contact.info}</p>
                      </div>
                      
                    </div>

                   </div>
                ))
            }
         </div>
      </div>
    </>
  )
}

export default ContactUs