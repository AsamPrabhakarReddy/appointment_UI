import React, { useState } from "react";

const Calendar = ({ selectedSlot, onSlotSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    return Array.from({ length: 6 }, (_, i) => {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      return weekDate;
    });
  };

  const currentWeek = getWeekDates(currentDate);
  const currentMonth = currentWeek[0].toLocaleString("default", { month: "long" });
  const currentYear = currentWeek[0].getFullYear();

  const timeSlots = [
    "08:30 AM",
    "09:30 AM",
    "10:30 AM",
    "11:30 AM",
    "12:30 PM",
    "01:30 PM",
    "02:30 PM",
    "03:30 PM",
    "04:30 PM",
    "05:30 PM"
  ];

  // Handlers for navigation
  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const handlePreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextYear = () => {
    const nextYear = new Date(currentDate);
    nextYear.setFullYear(currentDate.getFullYear() + 1);
    setCurrentDate(nextYear);
  };

  const handlePreviousYear = () => {
    const prevYear = new Date(currentDate);
    prevYear.setFullYear(currentDate.getFullYear() - 1);
    setCurrentDate(prevYear);
  };

  const isSlotSelected = (date, time) => {
    if (!selectedSlot) return false;
    return (
      date.toDateString() === selectedSlot.date.toDateString() &&
      time === selectedSlot.time
    );
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 w-full max-w-full">
      <div className="text-3xl font-bold text-blue-900 mb-4 text-center">
        Pick a Date & Time
      </div>
  
      {/* Calendar Header */}
      <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-md w-full max-w-full">
        <button
          onClick={handlePreviousYear}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {"<<"}
        </button>
        <button
          onClick={handlePreviousMonth}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {"<"}
        </button>
        <h1 className="text-lg font-bold truncate max-w-[150px] sm:max-w-[200px]">
          {currentMonth} {currentYear}
        </h1>
        <button
          onClick={handleNextMonth}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {">"}
        </button>
        <button
          onClick={handleNextYear}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {">>"}
        </button>
      </div>
  
      {/* Week Navigation */}
      <div className="flex justify-between items-center w-full max-w-full mt-4 px-4">
        <button
          onClick={handlePreviousWeek}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Previous Week
        </button>
        <button
          onClick={handleNextWeek}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Next Week
        </button>
      </div>
  
      {/* Weekday Row */}
      <div className="lg:ml-[100px] grid grid-cols-7 gap-4 mt-4 w-full px-4">
        {currentWeek.map((date, index) => {
          const isPastDate = date < new Date().setHours(0, 0, 0, 0); // Check if the date is in the past
          return (
            <div
              key={index}
              className={`flex flex-col items-center bg-white shadow-md rounded-md p-2 cursor-pointer ${
                selectedSlot && date.toDateString() === selectedSlot.date.toDateString()
                  ? "border-2 border-blue-500"
                  : isPastDate
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                if (!isPastDate) {
                  // Allow only if the date is not in the past
                  onSlotSelect(date, null);
                }
              }}
            >
              <span className="font-bold text-gray-700 truncate w-full text-center">
                {date.toLocaleString("default", { weekday: "short" })}
              </span>
              <span className="text-gray-500">{date.getDate()}</span>
            </div>
          );
        })}

        {/* Time Slots in One Row */}
        <div className="grid grid-cols-7 gap-4 col-span-7 mt-4">
          {currentWeek.map((date, dayIndex) => {
            const isPastDate = date < new Date().setHours(0, 0, 0, 0); // Check if the date is in the past
            return (
              <div key={dayIndex} className="flex flex-col bg-white shadow-md rounded-md p-2">
                {timeSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    style={{ width: "100%" }}
                    className={`text-center text-gray-700 text-sm py-1 border-b last:border-none ${
                      isPastDate
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-100 cursor-pointer"
                    } ${
                      selectedSlot &&
                      date.toDateString() === selectedSlot.date.toDateString() &&
                      slot === selectedSlot.time
                        ? "bg-blue-200"
                        : ""
                    }`}
                    onClick={() => {
                      if (!isPastDate) {
                        onSlotSelect(date, slot);
                      }
                    }}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
  
      {/* Selected Slot Display */}
      {selectedSlot && (
        <div className="mt-4 text-green-600 font-semibold px-4">
          Selected Slot: {selectedSlot.date.toDateString()} at {selectedSlot.time}
        </div>
      )}
    </div>
  );
};

export default Calendar;
