import React from 'react'
import Calendar from './Calender'
const Reschedule = () => {

    const handleSummaryClick = ()=>{
        navigate(`/cancel-reschedule/${appointmentId}`)
    }

  return (
    <div className='w-full h-screen bg-gray-400 p-4'>
               <div className='bg-white shadow h-full lg:w-[600px] sm:w-[550px] md:[500px] w-[450px] mx-auto rounded p-2 '>
                    <div className="flex flex-col items-center p-4 rounded space-y-4">
                        <div className="md:text-3xl text-2xl font-bold text-primaryColor mb-4 text-center tracking-tight">
                            <h4 className="ml-1 md:text-2xl text-xl text-mainColor font-bold cursor-pointer">
                                Mannam & <span className="text-headingColor">Associates</span>
                            </h4>
                        </div>
        
                        <div className=''>
                            <h1 className='md:text-3xl text-2xl text-gray-700 font-semibold'>Select a new time</h1>
                        </div>
        
                        <Calendar/>
                        
                       
        
                        <div className="flex justify-between w-[100%] p-4">
                            <button 
                                onClick={handleSummaryClick}    
                               className="px-6 py-2 flex flex-row items-center justify-center bg-primaryColor text-white rounded lg:w-1/3 "
                            >
                                <TiArrowLeft className="mr-2 text-2xl" />
                                 
                                Summary
                            </button>
                            <button 
                                // onClick={}    
                               className="px-6 py-2 flex flex-row items-center justify-center bg-primaryColor text-white rounded lg:w-1/3"
                            >
                                Review Reschedule
                              <TiArrowRight className="ml-2 text-2xl"/>
                            </button>   
                        </div>
        
                    </div>
               </div>
    </div>
  )
}

export default Reschedule