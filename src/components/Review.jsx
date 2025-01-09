import React, { useState } from "react";
import Swal from "sweetalert2";
import { MdArrowRightAlt } from "react-icons/md";
import axios from "axios";
import success from "../assets/success.png"
const Review = ({ selectedSlot, formData, onEdit,setSelectedIndex }) => {

  const [serviceFlag, setServiceFlag] = useState(false);
  const [service, setService] = useState("Immigration Consultation 1 hour");
  const [staffMember, setStaffMember] = useState("Mannam & Associates, LLC [Attorney / Paralegal]");
  const handleServiceFlag = () => {
    setServiceFlag(!serviceFlag);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };


  // Format the selected date
  const formattedDate = selectedSlot
    ? selectedSlot.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (
          formData.name !== "" &&
          formData.email !== "" &&
          selectedSlot.date.toDateString() !== "" &&
          selectedSlot.time !== ""
      ) {
          try {
              // conversion from local time to utc time
              const localDate = new Date(selectedSlot.date); 
              const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString(); 

              const requestData = {
                  selectedSlot: {
                      date: utcDate, 
                      time: selectedSlot.time,
                  },
                  formData: {
                      name: formData.name,
                      email: formData.email,
                  },
                  service,
                  staffMember
              };
  
              console.log("Request Data:", requestData);
  
              // Make POST request
              // const response = await axios.post("http://localhost:9090/api/BookingSlot", requestData);
              const response = await axios.post("https://appointment-backend-syyd.onrender.com/api/BookingSlot", requestData);
              
              // Handle success response
              const style = document.createElement('style');
              style.innerHTML = `
                .swal-custom-ok-button {
                  background-color: #0A3161; /* Custom color */
                  color:white;
                  border: none;
                  padding: 10px 20px;
                  font-size: 16px;
                  border-radius: 5px;
                }

                .swal-custom-ok-button:hover {
                  background-color:rgb(69, 93, 122); /* Hover color */
                }
              `;
              document.head.appendChild(style);

              // Handle success response
              if (response.status === 201) {
                  Swal.fire({
                      html: `
                          <div style="display: flex; flex-direction: column; align-items: center;">
                            <!-- Logo and Title Section -->
                            <div style="display: flex; text-align: left; margin-bottom: 20px;">
                              <h4 style="margin: 0; font-size: 1.5rem; font-weight: bold; color: #B31942; margin-right: 15px;">
                                Mannam & <span style="color: #0A3161;">Associates</span>
                              </h4>
                            </div>
  
                            <!-- Success Image (Centered) -->
                            <div>
                              <img src="${success}" alt="Success" style="width: 60px; height: 60px; margin: 0 10px;" />
                            </div>
  
                            <!-- Title (left-aligned) -->
                            <div style="width: 100%; text-align: center; margin-bottom: 20px;">
                              <h1 style="margin: 0; font-size: 30px;">Your Consultation is Confirmed</h1>
                            </div>
                          </div>
  
                          <!-- Appointment Details (Centered) -->
                          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                            <p>Your Consultation is Confirmed for: <strong>${selectedSlot.date.toDateString()} at ${selectedSlot.time}</strong></p>
                            <p>Name: ${formData.name}</p>
                            <p>Email: ${formData.email}</p>
                          </div>
                      `,
                      customClass: {
                          confirmButton: 'swal-custom-ok-button'
                      }
                  });
  
                  setSelectedIndex(0);
              } else {
                  Swal.fire({
                      icon: "warning",
                      title: "Booking failed",
                      text: "Booking completed, but there was an unexpected response from the server.",
                  });
              }
          } catch (error) {
              console.error("Error booking slot:", error);
              Swal.fire({
                  icon: "error",
                  title: "Booking failed",
                  text: "An error occurred while booking your slot. Please try again.",
              });
          }
      } else {
          Swal.fire({
              icon: "error",
              title: "Required fields are missing",
              text: "Please fill out all required fields!",
          });
      }
  }
  

   

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded">
      <div className="md:text-3xl text-2xl font-bold text-primaryColor mb-4 text-center tracking-tight">
        Review & confirm your booking
      </div>

      {/* Timezone */}
      <div className="flex flex-col w-full p-2">
        <div className="flex items-center justify-between">
          <label className="md:text-lg text-sm text-blackColor font-semibold">
            Timezone
          </label>
          <span className="text-sm text-blackColor font-semibold">
            US | EST
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={
              formattedDate ? `${formattedDate} at ${selectedSlot.time}` : ""
            }
            readOnly
            className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
            placeholder="Select a date and time"
          />
          <button
            onClick={() => onEdit(0)} // Navigate to Calendar
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primaryColor text-white text-sm rounded p-1 w-[60px]"
          >
            Edit
          </button>
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
            value={service}
            readOnly={!serviceFlag}  
            onChange={handleServiceChange}  
            onFocus={(e) => e.target.select()} 
            className={`bg-white shadow p-3 rounded focus:outline-none w-full  md:text-base text-sm ${serviceFlag ? "border-2 border-gray-600 shadow-lg " : ""}`}
            placeholder="Immigration Consultation 1 hour"
          />
          <button
            onClick={() => handleServiceFlag()}  
            className="absolute right-2 top-1/2 transform -translate-y-1/5 bg-primaryColor text-white text-sm rounded p-1 w-[60px]"
          >
            {serviceFlag ? "Save" : "Edit"}
          </button>
        </div>
      </div>


      {/* Staff Member */}
      <div className="flex flex-col w-full p-2">
        <label className="md:text-lg text-sm text-blackColor font-semibold">
          Staff Member
        </label>
        <input
          type="text"
          value="Mannam & Associates, LLC [Attorney / Paralegal]"
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
            value={formData.name}
            readOnly
            className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
            placeholder="Name"
          />
          <button
            onClick={() => onEdit(1)} // Navigate to Information
            className="absolute right-2 top-1/2 transform -translate-y-1/5 bg-primaryColor text-white text-sm rounded p-1 w-[60px]"
          >
            Edit
          </button>
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
            value={formData.email}
            readOnly
            className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
            placeholder="Email"
          />
          <button
            onClick={() => onEdit(1)} // Navigate to Information
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primaryColor text-white text-sm rounded p-1 w-[60px]"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Confirm Booking Button */}
      {/* <div className="mt-6 flex justify-center border-2 border-red-500 w-[100%]">
        <button
          onClick={handleSubmit}
          className="px-12 py-2 bg-primaryColor text-white rounded text-lg"
        >
          Confirm Booking
        </button>
      </div> */}

      <div className="flex justify-center w-[100%] p-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 flex flex-row items-center justify-center bg-primaryColor text-white rounded lg:w-2/4 w-full"
        >
          Confirm Booking
          <MdArrowRightAlt className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Review;
