import React, { useEffect, useState } from "react";
import axios from "axios";

const Calendar = ({ selectedSlot, onSlotSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slotsData, setSlotsData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null); 
  
  const fetchSlots = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/getDateAndSlots');
      // const response = await axios.get('https://appointment-backend-syyd.onrender.com/api/getDateAndSlots');
      
      console.log("Data fetched successfully:", response.data);
      const { results, lastUpdated: newLastUpdated } = response.data;
      if (lastUpdated !== newLastUpdated) {
        setSlotsData(results);
        setLastUpdated(newLastUpdated);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSlots(); 
    const intervalId = setInterval(() => {
      fetchSlots(); 
    }, 60000); 
    return () => clearInterval(intervalId);
  }, [lastUpdated]);

  // Helper function to get weekdays from today
  const getWeekDatesFromToday = (startDate) => {
    return Array.from({ length: 7 }, (_, i) => {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + i);
      return weekDate;
    }).filter((date) => date.getDay() !== 0 && date.getDay() !== 6); // Exclude Sundays
  };

  const currentWeek = getWeekDatesFromToday(currentDate);
  const currentMonth = currentWeek[0]?.toLocaleString("default", {
    month: "long",
  });
  const currentYear = currentWeek[0]?.getFullYear();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  // Navigation functions
  const handleNavigation = (type, step) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (type === "week") newDate.setDate(prev.getDate() + step * 7);
      if (type === "month") newDate.setMonth(prev.getMonth() + step);
      if (type === "year") newDate.setFullYear(prev.getFullYear() + step);
      return newDate;
    });
  };

  const isSlotSelected = (date, time) => {
    if (!selectedSlot) return false;
    return (
      date.toDateString() === selectedSlot.date.toDateString() &&
      time === selectedSlot.time
    );
  };

  // Function to check if a time slot is in the past
  const isPastSlot = (date, time) => {
    const now = new Date();
    const [hours, minutes] = time.split(":");
    const period = time.split(" ")[1]; // AM/PM
    const formattedHours = period === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours);
    const formattedMinutes = parseInt(minutes);

    const slotDate = new Date(date);
    slotDate.setHours(formattedHours, formattedMinutes, 0, 0);
    return slotDate < now;
  };

  console.log("finally slot details: ",slotsData);
  // Function to check if a slot is booked
  const isBookedSlot = (date, time) => {
    const dateString = date.toISOString().split("T")[0]; 
    return slotsData.some((slot) => {
      const bookedDate = new Date(slot.date);
      const bookedTime = slot.time;
      return (
        bookedDate.toISOString().split("T")[0] === dateString &&
        bookedTime === time
      );
    });
  };
  

  
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded">
      <div className="md:text-3xl text-2xl font-bold text-primaryColor mb-4 text-center tracking-tight">
        Pick a Date & Time
      </div>

      {/* Calendar Header */}
      <div className="flex justify-between items-center bg-primaryColor text-white px-4 py-2 rounded w-full max-w-full cursor-pointer">
        <button onClick={() => handleNavigation("year", -1)} className="px-2 font-semibold hover:bg-[#1a1a1a] ">{"<<"}</button>
        <button onClick={() => handleNavigation("month", -1)} className="px-2 font-semibold hover:bg-[#1a1a1a] ">{"<"}</button>
        <h1 className="text-sm sm:text-lg font-semibold truncate max-w-[120px] sm:max-w-[200px]">
          {currentMonth} {currentYear}
        </h1>
        <button onClick={() => handleNavigation("month", 1)} className="px-2 font-semibold hover:bg-[#1a1a1a] ">{">"}</button>
        <button onClick={() => handleNavigation("year", 1)} className="px-2 font-semibold hover:bg-[#1a1a1a] ">{">>"}</button>
      </div>

      {/* Week Navigation */}
      <div className="flex justify-between items-center w-full max-w-full mt-4">
        <button onClick={() => handleNavigation("week", -1)} className="bg-primaryColor lg:px-6 px-4 py-2 rounded text-white md:text-base text-sm">Last Week</button>
        <div className="flex gap-2">
          <button  className="bg-primaryColor lg:px-6 px-4 py-2 rounded text-white md:text-base text-sm">Timezone : EST</button>
          {/* <button className="bg-headingColor lg:px-6 px-4 py-2 rounded text-white md:text-base text-sm">EST</button> */}
        </div>
        <button onClick={() => handleNavigation("week", 1)} className="bg-primaryColor lg:px-6 px-4 py-2 rounded text-white md:text-base text-sm">Next Week</button>
      </div>

      {/* Weekday and Time Slots */}
      <div className="py-4 grid lg:grid-cols-5 grid-cols-2 gap-4 mt-4 w-full px-2">
        {currentWeek.map((date, index) => (
          <div
            key={index}
            className={`flex flex-col items-center bg-white shadow-md rounded p-2 cursor-pointer text-xs sm:text-base ${date < new Date().setHours(0, 0, 0, 0) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex flex-row">
              <span className="font-semibold text-gray-700 truncate w-full text-center">
                {date.getDate()}
              </span>
              <span className="font-semibold ml-[4px] text-gray-700 w-full text-center">
                {date.toLocaleString("default", { weekday: "short" })}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-[7px] mt-2 w-[100%] rounded">
              {timeSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`text-center text-xs sm:text-sm lg:py-2 py-[6px] border-[0.5px] shadow-sm hover:shadow-none hover:border-none transition ease-in-out duration-300 rounded font-medium text-gray-700 ${
                    isPastSlot(date, slot) || isBookedSlot(date, slot) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-200 cursor-pointer"
                  } ${isSlotSelected(date, slot) ? "bg-blue-200" : ""}`}
                  onClick={() => {
                    if (!isPastSlot(date, slot) && !isBookedSlot(date, slot)) {
                      onSlotSelect(date, slot);
                    }
                  }}
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Slot Display */}
      {selectedSlot && (
        <div className="mt-4 text-primaryColor font-semibold text-xs sm:text-base px-4">
          Selected Slot: {selectedSlot.date.toDateString()} at {selectedSlot.time}
        </div>
      )}

      <div className="mt-2 text-primaryColor font-semibold text-xs sm:text-base px-4">
        <p className="flex items-center">
          Please note that Mannam & Associates is available for work from Monday to Friday at 9AM TO 5PM EST Time.
        </p>
      </div>
    </div>
  );
};

export default Calendar;
