import React from 'react'
import { MdArrowRightAlt } from "react-icons/md";
import { useLocation, useNavigate,  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const CancelOrReschedule = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [appointmentData, setAppointmentData] = useState(null);
    const { appointmentId } = useParams();
    console.log("id ", appointmentId);
    useEffect(() => {
        if (appointmentId) {
            fetch('http://localhost:9090/api/getDataById',
            // fetch('https://appointment-backend-syyd.onrender.com/api/getDataById',
                {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: appointmentId,  
                }),
            })
            .then((response) => response.json())  
            .then((data) => {
                setAppointmentData(data);  
            })
            .catch((error) => {
                console.error('Error fetching appointment details:', error);
            });
        }
        
    }, [appointmentId]);

      // Check if appointmentData is null or undefined
      if (!appointmentData) {
        return <div className='w-full h-screen bg-gray-400 p-4'>Loading...</div>;
    }


    console.log(appointmentData);

    const handleCancel = () => {
        navigate(`/cancel/${appointmentId}`);  
    }

  return (
    <div className='w-full h-screen bg-gray-400 p-4'>
       <div className='bg-white shadow h-full lg:w-[600px] sm:w-[550px] md:[500px] w-[450px] mx-auto rounded p-2 '>
            <div className="flex flex-col items-center p-4 rounded space-y-2">
                <div className="md:text-3xl text-2xl font-bold text-primaryColor mb-4 text-center tracking-tight">
                    <h4 className="ml-1 md:text-2xl text-xl text-mainColor font-bold cursor-pointer">
                        Mannam & <span className="text-headingColor">Associates</span>
                    </h4>
                </div>

                <div className='flex gap-8'>
                    <button
        
                    className="bg-primaryColor lg:px-6 px-4 py-2 rounded text-white md:text-base text-sm">Reschedule</button>
                    <button 
                        onClick={handleCancel}
                    className="bg-primaryColor lg:px-6 px-4 py-2 rounded text-white md:text-base text-sm">Cancel</button>
                </div>

                <div className="flex flex-col w-full p-2">
                    <div className="flex items-center justify-between">
                        <label className="md:text-lg text-sm text-blackColor font-semibold">
                            Timezone
                        </label>
                        <span className="text-sm text-blackColor font-semibold">
                            US | EST
                        </span>
                    </div>
                    <div className="">
                        <input
                            type="text"
                            value={appointmentData.date + " At "+ appointmentData.time}
                            readOnly
                            className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
                            placeholder="Select a date and time"
                        />
                    </div>
                </div>

                 {/* Service */}
                <div className="flex flex-col w-full p-2">
                    <div className="relative">
                    <label className="md:text-lg text-sm text-blackColor font-semibold">
                        Service
                    </label>
                    <input
                        type="text"
                        value={appointmentData.service}
                        readOnly
                        // onChange={handleServiceChange}  
                        // onFocus={(e) => e.target.select()} 
                        className={`bg-white shadow p-3 rounded focus:outline-none w-full  md:text-base text-sm`}
                        placeholder="Immigration Consultation 1 hour"
                    />
                    </div>
                </div>


                {/* Staff Member */}
                <div className="flex flex-col w-full p-2">
                    <label className="md:text-lg text-sm text-blackColor font-semibold">
                    Staff Member
                    </label>
                    <input
                    type="text"
                    value={appointmentData.staffMember}
                    readOnly
                    className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
                    placeholder="Mannam & Associates, LLC [Attorney / Paralegal]"
                    />
                </div>

                {/* Your Information - Name */}
                <div className="flex flex-col w-full p-2">
                    <div className="relative">
                    <label className="md:text-lg text-sm text-blackColor font-semibold">
                        Name
                    </label>
                    <input
                        type="text"
                        value={appointmentData.name}
                        readOnly
                        className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
                        placeholder="Name"
                    />
                
                    </div>
                </div>

                {/* Your Information - Email */}
                <div className="flex flex-col w-full p-2">
                    <label className="md:text-lg text-sm text-blackColor font-semibold">
                    Email
                    </label>
                    <div className="relative">
                    <input
                        type="email"
                        value={appointmentData.email}
                        readOnly
                        className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
                        placeholder="Email"
                    />
                   
                    </div>
                </div>

                <div className="flex justify-center w-[100%] p-4">
                    <button 
                        // onClick={handleSubmit}    
                       className="px-6 py-2 flex flex-row items-center justify-center bg-primaryColor text-white rounded lg:w-2/4 w-full"
                    >
                        Book Another 
                      <MdArrowRightAlt className="ml-2" />
                    </button>
                </div>

            </div>
       </div>
    </div>
  )
}

export default CancelOrReschedule