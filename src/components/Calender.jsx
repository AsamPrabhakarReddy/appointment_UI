import React, { useState } from "react";

const Calendar = ({ selectedSlot, onSlotSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDatesFromToday = (startDate) => {
    return Array.from({ length: 7 }, (_, i) => {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + i);
      return weekDate;
    }).filter((date) => date.getDay() !== 0); // Exclude Sundays
  };

  const currentWeek = getWeekDatesFromToday(currentDate);
  const currentMonth = currentWeek[0]?.toLocaleString("default", { month: "long" });
  const currentYear = currentWeek[0]?.getFullYear();

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
    "05:30 PM",
  ];

  const handleNavigation = (type, amount) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (type === "week") newDate.setDate(prev.getDate() + amount * 7);
      if (type === "month") newDate.setMonth(prev.getMonth() + amount);
      if (type === "year") newDate.setFullYear(prev.getFullYear() + amount);
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

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 w-full max-w-4xl mx-auto">
      <div className="text-xl sm:text-3xl font-bold text-blue-900 mb-4 text-center">
        Pick a Date & Time
      </div>

      {/* Calendar Header */}
      <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-md w-full max-w-full">
        <button
          onClick={() => handleNavigation("year", -1)}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {"<<"}
        </button>
        <button
          onClick={() => handleNavigation("month", -1)}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {"<"}
        </button>
        <h1 className="text-sm sm:text-lg font-bold truncate max-w-[120px] sm:max-w-[200px]">
          {currentMonth} {currentYear}
        </h1>
        <button
          onClick={() => handleNavigation("month", 1)}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {">"}
        </button>
        <button
          onClick={() => handleNavigation("year", 1)}
          className="px-2 font-bold hover:bg-blue-700 rounded"
        >
          {">>"}
        </button>
      </div>

      {/* Week Navigation */}
      <div className="flex justify-between items-center w-full max-w-full mt-4">
        <button
          onClick={() => handleNavigation("week", -1)}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 text-sm sm:text-base"
        >
          Previous Week
        </button>
        <button
          onClick={() => handleNavigation("week", 1)}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 text-sm sm:text-base"
        >
          Next Week
        </button>
      </div>

      {/* Weekday and Time Slots */}
      <div className="lg:ml-[100px] grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-4 w-full px-2 sm:px-4">
        {currentWeek.map((date, index) => (
          <div
            key={index}
            className={`flex flex-col items-center bg-white shadow-md rounded-md p-2 cursor-pointer text-xs sm:text-base ${
              selectedSlot && date.toDateString() === selectedSlot.date.toDateString()
                ? "border-2 border-blue-500"
                : date < new Date().setHours(0, 0, 0, 0)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => {
              if (date >= new Date().setHours(0, 0, 0, 0)) {
                onSlotSelect(date, null);
              }
            }}
          >
            <span className="font-bold text-gray-700 truncate w-full text-center">
              {date.toLocaleString("default", { weekday: "short" })}
            </span>
            <span className="text-gray-500">{date.getDate()}</span>
            <div className="grid grid-cols-1 gap-1 mt-2">
              {timeSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`text-center text-xs sm:text-sm py-1 border-b last:border-none ${
                    date < new Date().setHours(0, 0, 0, 0)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-100 cursor-pointer"
                  } ${
                    isSlotSelected(date, slot) ? "bg-blue-200" : ""
                  }`}
                  onClick={() => {
                    if (date >= new Date().setHours(0, 0, 0, 0)) {
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
        <div className="mt-4 text-green-600 font-semibold text-xs sm:text-base px-4">
          Selected Slot: {selectedSlot.date.toDateString()} at {selectedSlot.time}
        </div>
      )}
    </div>
  );
};

export default Calendar;
