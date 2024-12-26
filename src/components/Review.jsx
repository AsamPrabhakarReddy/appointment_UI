import React from "react";
import Swal from "sweetalert2";

const Review = ({ selectedSlot, formData, onEdit }) => {
  // Format the selected date
  const formattedDate = selectedSlot
    ? selectedSlot.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

    const handleSubmit = (e)=>{
        e.preventDefault();
        Swal.fire({
            icon: "success", 
            title: "Booking was successful",
            text: `Your slot is booked for : ${selectedSlot.date.toDateString()} at ${selectedSlot.time}.
                   Name : ${JSON.stringify(formData.name)}\n
                   Email : ${JSON.stringify(formData.email)}\n
                   ` 
        });
        
    }
  return (
    <div className="flex flex-col items-center bg-gray-100 p-6">
      <div className="text-3xl font-bold text-blue-900 mb-4 text-center">
        Review your information and complete your booking
      </div>

      {/* Timezone */}
      <div className="flex flex-col w-full mb-4">
        <div className="flex items-center justify-between">
          <label className="text-lg text-gray-700 font-bold">Timezone</label>
          <span className="text-sm text-gray-500 font-bold">US | EST</span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={formattedDate ? `${formattedDate} at ${selectedSlot.time}` : ""}
            readOnly
            className="shadow-xl p-2 rounded-lg w-full"
            placeholder="Select a date and time"
          />
          <button
            onClick={() => onEdit(0)} // Navigate to Calendar
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white rounded-lg p-1 w-[80px]"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Service */}
      <div className="flex flex-col w-full mb-4">
        <label className="text-lg text-gray-700 font-bold">Service</label>
        <input
          type="text"
          value="Immigration Consultation 1 hour"
          readOnly
          className="shadow-xl p-2 rounded-lg"
          placeholder="Immigration Consultation 1 hour"
        />
      </div>

      {/* Staff Member */}
      <div className="flex flex-col w-full mb-4">
        <label className="text-lg text-gray-700 font-bold">Staff Member</label>
        <input
          type="text"
          value="Mannam & Associates, LLC [Attorney / Paralegal]"
          readOnly
          className="shadow-xl p-2 rounded-lg"
          placeholder="Mannam & Associates, LLC [Attorney / Paralegal]"
        />
      </div>

      {/* Your Information - Name */}
      <div className="flex flex-col w-full mb-4">
        <label className="text-lg text-gray-700 font-bold">Your Information</label>
        <div className="relative">
          <label className="text-lg text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            readOnly
            className="bg-white shadow-xl p-2 rounded-lg w-full"
            placeholder="Name"
          />
          <button
            onClick={() => onEdit(1)} // Navigate to Information
            className="absolute right-2 top-1/2 transform -translate-y-1/5 bg-blue-900 text-white rounded-lg p-1 w-[80px]"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Your Information - Email */}
      <div className="flex flex-col w-full mb-4">
        <label className="text-lg text-gray-700">Email</label>
        <div className="relative">
          <input
            type="email"
            value={formData.email}
            readOnly
            className="shadow-xl p-2 rounded-lg w-full"
            placeholder="Email"
          />
          <button
            onClick={() => onEdit(1)} // Navigate to Information
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white rounded-lg p-1 w-[80px]"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Confirm Booking Button */}
      <div className="mt-6 flex justify-center">
        <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-lg">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Review;
