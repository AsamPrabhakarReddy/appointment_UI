import React, { useState } from "react";

const Calendar = ({ selectedSlot, onSlotSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    return Array.from({ length: 5 }, (_, i) => {
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
    <div className="flex flex-col items-center bg-gray-100 p-6">
      <div className="text-3xl font-bold text-blue-900 mb-4 text-center ">
        Pick a Date & Time
      </div>
      {/* Calendar Header */}
      <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-md w-full max-w-lg">
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
        <h1 className="text-lg font-bold">
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
      <div className="flex justify-between items-center w-full max-w-lg mt-4">
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
      <div className="grid grid-cols-5 gap-4 mt-4 w-full max-w-lg">
        {currentWeek.map((date, index) => (
          <div
            key={index}
            className={`flex flex-col items-center bg-white shadow-md rounded-md p-2 cursor-pointer ${
              selectedSlot &&
              date.toDateString() === selectedSlot.date.toDateString()
                ? "border-2 border-blue-500"
                : ""
            }`}
            onClick={() => {
              // Optionally, select the entire day or handle differently
            }}
          >
            <span className="font-bold text-gray-700">
              {date.toLocaleString("default", { weekday: "short" })} {/* Mon, Tue */}
            </span>
            <span className="text-gray-500">{date.getDate()}</span>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-5 gap-4 mt-4 w-full max-w-lg">
        {currentWeek.map((date, dayIndex) => (
          <div key={dayIndex} className="flex flex-col bg-white shadow-md rounded-md p-2">
            {timeSlots.map((slot, idx) => (
              <div
                key={idx}
                className={`text-center text-gray-700 text-sm py-1 border-b last:border-none hover:bg-blue-100 cursor-pointer ${
                  selectedSlot &&
                  date.toDateString() === selectedSlot.date.toDateString() &&
                  slot === selectedSlot.time
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => onSlotSelect(date, slot)}
              >
                {slot}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Selected Slot Display */}
      {selectedSlot && (
        <div className="mt-4 text-green-600 font-semibold">
          Selected Slot: {selectedSlot.date.toDateString()} at {selectedSlot.time}
        </div>
      )}
    </div>
  );
};

export default Calendar;
