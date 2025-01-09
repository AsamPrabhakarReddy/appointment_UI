import axios from "axios";
import { useState, useEffect } from "react";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { useParams, useNavigate } from "react-router-dom";

const Reschedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slotsData, setSlotsData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const handleSummaryClick = () => {
    navigate(`/cancel-reschedule/${appointmentId}`);
  };

    

  const fetchSlots = async () => {
    try {
    //   const response = await axios.get("http://localhost:9090/api/getDateAndSlots");
      const response = await axios.get("https://appointment-backend-syyd.onrender.com/api/getDateAndSlots");
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

  useEffect(() => {
    fetchSlots();
    const intervalId = setInterval(() => {
      fetchSlots();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [lastUpdated]);

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

  const handleNavigation = (type, step) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (type === "week") newDate.setDate(prev.getDate() + step * 7);
      if (type === "month") newDate.setMonth(prev.getMonth() + step);
      if (type === "year") newDate.setFullYear(prev.getFullYear() + step);
      return newDate;
    });
  };

  const isPastSlot = (date, time) => {
    const now = new Date();
    const [hours, minutes] = time.split(":");
    const period = time.split(" ")[1];
    const formattedHours = period === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours);
    const formattedMinutes = parseInt(minutes);

    const slotDate = new Date(date);
    slotDate.setHours(formattedHours, formattedMinutes, 0, 0);
    return slotDate < now;
  };

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

  const onSlotSelect = (date, time) => {
    const selected = { date, time };
    setSelectedSlot(selected);
    console.log("Slot selected: ", selected); // Log selected slot for debugging
  };



//   useEffect(() => {
//     if (selectedSlot) {
//       console.log("Updated selected slot:", selectedSlot);
//     }
//   }, [selectedSlot]);

  const [appointmentData, setAppointmentData] = useState(null);

  // Only fetch appointment data on mount
  useEffect(() => {
    if (appointmentId) {
      const fetchAppointmentData = async () => {
        try {

        //   const response = await fetch('http://localhost:9090/api/getDataById', {
            const response = await fetch('https://appointment-backend-syyd.onrender.com/api/getDataById', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Id: appointmentId }),
          });
          const data = await response.json();
          setAppointmentData(data);
        } catch (error) {
          console.error('Error fetching appointment details:', error);
        }
      };

      fetchAppointmentData();
    }
  }, [appointmentId]); // Dependency array ensures this only runs once

  // If appointment data is still loading, show a loading message
  if (!appointmentData) {
    return <div className="w-full h-screen bg-gray-400 p-4">Loading...</div>;
  }
  console.log("old data : ", appointmentData);

  const handleSelectedSlot = () => {
    if (selectedSlot) {
      alert(`You selected: ${selectedSlot.date.toDateString()} at ${selectedSlot.time}`);
      alert(`You selected: ${appointmentData.date} at ${appointmentData.time}`);
    }
  };


  return (
    <div className="w-full h-auto bg-gray-400 p-4">
      <div className="bg-white shadow h-full lg:w-[700px] sm:w-[550px] md:[500px] w-[450px] mx-auto rounded p-2">
        <div className="flex flex-col items-center p-4 rounded space-y-4">
          <div className="md:text-3xl text-2xl font-bold text-primaryColor mb-4 text-center tracking-tight">
            <h4 className="ml-1 md:text-2xl text-xl text-mainColor font-bold cursor-pointer">
              Mannam & <span className="text-headingColor">Associates</span>
            </h4>
          </div>

          <h1 className="md:text-3xl text-2xl text-gray-700 font-semibold">Select a new time</h1>

          <div className="flex flex-col items-center bg-gray-100 p-4 rounded">
            <div className="flex justify-between items-center bg-primaryColor text-white px-4 py-2 rounded w-full max-w-full cursor-pointer">
              <button onClick={() => handleNavigation("year", -1)} className="px-2 font-semibold hover:bg-[#1a1a1a]">{"<<"}</button>
              <button onClick={() => handleNavigation("month", -1)} className="px-2 font-semibold hover:bg-[#1a1a1a]">{"<"}</button>
              <h1 className="text-sm sm:text-lg font-semibold truncate max-w-[120px] sm:max-w-[200px]">
                {currentMonth} {currentYear}
              </h1>
              <button onClick={() => handleNavigation("month", 1)} className="px-2 font-semibold hover:bg-[#1a1a1a]">{">"}</button>
              <button onClick={() => handleNavigation("year", 1)} className="px-2 font-semibold hover:bg-[#1a1a1a]">{">>"}</button>
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
                        className={`text-center text-xs sm:text-sm lg:py-2 py-[6px] border-[0.5px] shadow-sm hover:shadow-none hover:border-none transition ease-in-out duration-300 rounded font-medium text-gray-700 ${isPastSlot(date, slot) || isBookedSlot(date, slot) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-200 cursor-pointer"}`}
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

            {selectedSlot && (
              <div className="mt-4 text-primaryColor font-semibold text-xs sm:text-base px-4">
                Selected Slot: {selectedSlot.date.toDateString()} at {selectedSlot.time}
              </div>
            )}

            <div className="flex justify-between w-[100%] p-4">
              <button
                onClick={handleSummaryClick}
                className="px-6 py-2 flex flex-row items-center justify-center bg-primaryColor text-white rounded lg:w-1/3"
              >
                <TiArrowLeft className="mr-2 text-2xl" />
                Summary
              </button>
              <button
                onClick={handleSelectedSlot}
                className="px-6 py-2 flex flex-row items-center justify-center bg-primaryColor text-white rounded lg:w-1/3"
              >
                Review Reschedule
                <TiArrowRight className="ml-2 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reschedule;
