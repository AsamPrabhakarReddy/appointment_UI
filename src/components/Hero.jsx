import React, { useState, useEffect } from "react";
import Calendar from "./Calender";
import Information from "./Information";
import Review from "./Review";

const Hero = () => {
  const sections = [
    { id: 0, title: "Date & Time" },
    { id: 1, title: "Information" },
    { id: 2, title: "Review" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    saveInfo: false,
  });

  const handleIndex = (index) => {
    setSelectedIndex(index);
  };

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour12: false,
      });
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSlotSelect = (date, time) => {
    setSelectedSlot({ date, time });
    setSelectedIndex(1);
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  const handleEdit = (sectionId) => {
    setSelectedIndex(sectionId);
  };

  const renderFormContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <Calendar
            selectedSlot={selectedSlot}
            onSlotSelect={handleSlotSelect}
          />
        );
      case 1:
        return (
          <Information
            formData={formData}
            setFormData={handleFormDataChange}
            setSelectedIndex={handleIndex}
          />
        );
      case 2:
        return (
          <Review
            selectedSlot={selectedSlot}
            formData={formData}
            onEdit={handleEdit}
          />
        );
      default:
        return <Calendar />;
    }
  };

  return (
    <div className="w-full h-auto bg-gray-400">
      {/* Main Content */}
      <div className="text-3xl font-bold text-blue-900 mb-4 text-center p-4">
        Mannam and Associates
      </div>
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row gap-4 p-4 bg-white shadow-xl rounded-lg">
        {/* Side Menu */}
        <div className="w-full sm:w-1/4 bg-gray-200 p-4 border-r border-gray-300 flex flex-col gap-4">
          <ul className="space-y-4">
            {sections.map((section, index) => (
              <li
                key={section.id}
                className={`p-2 cursor-pointer rounded-lg ${
                  selectedIndex === index
                    ? "bg-blue-900 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => handleIndex(index)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`p-2 rounded-full w-6 h-6 flex items-center justify-center font-bold ${
                      selectedIndex === index
                        ? "bg-white text-blue-900"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h1 className="text-md">{section.title}</h1>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Content */}
        <div className="w-full sm:w-3/4 p-4">{renderFormContent()}</div>
      </div>

      <div className="text-right">
        <h1 className="text-font text-md text-gray-900 px-6 py-6">
          @Powered by Syndeo.com
        </h1>
      </div>
    </div>
  );
};

export default Hero;