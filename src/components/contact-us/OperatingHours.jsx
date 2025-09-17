import React from 'react'


const OperatingHours = () => {
    const Operations = [
        {
            day: 'Monday - Friday',
            hours: '8:00 AM - 6:00 PM'
        },
        {
            day: 'Saturday',
            hours: '8:00 AM - 6:00PM'
        },
        {
            day: 'Sunday',
            hours: 'Closed',
            status: 'red'
        },
        {
            day: 'Emergency Services',
            hours: '24/7 available',
            status: 'green'
        }
    ]
  return (
    <>
      <div className='bg-gradient-to-br from-[#F0F8FF] via-[#E1F5FE] to-[#E3F2FD] rounded-2xl p-8 max-sm:p-6 shadow-xl border-2 border-[#B3E5FC]'>
        <h3 className='text-3xl max-sm:text-2xl font-bold text-[#0D47A1] mb-8 max-sm:mb-6 flex items-center gap-4 max-sm:gap-3'>
          <div className='w-10 h-10 max-sm:w-8 max-sm:h-8 bg-[#1976D2] rounded-lg flex items-center justify-center'>
            <svg
              className='w-6 h-6 max-sm:w-5 max-sm:h-5 text-white'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' />
            </svg>
          </div>
          Clinic Operating Hours
        </h3>
        <div className='space-y-6 max-sm:space-y-4'>
            {/*Rendering Operation Hours Data*/}
            {
                Operations.map((operation,index)=>(
                <div key={index}>
                  {
                    operation.status === 'green' ? (
                        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 py-4 max-sm:py-3 bg-gradient-to-r from-[#E8F5E8] to-[#F1F8E9] rounded-xl px-4 border-2 border-[#4CAF50] shadow-lg'>
                          <span className='font-bold text-[#2E7D32] text-lg max-sm:text-base'>{operation.day}</span>
                          <span className='text-[#388E3C] font-bold text-lg max-sm:text-base'>{operation.hours}</span>
                        </div>
                    ) : (
                      <div  className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 py-4 max-sm:py-3 border-b-2 border-[#B3E5FC] bg-white rounded-xl px-4 shadow-sm'>
                            <span className='font-bold text-[#1A237E] text-lg max-sm:text-base'>{operation.day}</span>
                            {
                                operation.status === 'red' ? (
                                <span className='text-[#D32F2F] font-bold text-lg max-sm:text-base'>{operation.hours}</span>
                                ) : (
                                <span className='text-[#0D47A1] font-bold text-lg max-sm:text-base'>{operation.hours}</span>
                                )
                            }  
                        </div>
                    )
                   }     
                </div>
                ))
            }

        </div>
      </div>
    </>
  )
}

export default OperatingHours