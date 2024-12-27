import React from "react";

const Information = ({ formData, setFormData ,setSelectedIndex }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setSelectedIndex(2);
    
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6">
      <div className="text-3xl font-bold text-blue-900 mb-4 text-center">
        Please provide your information
      </div>

      <form onSubmit={handleSubmit} className="w-full sm:w-1/2 ">
        {/* Name Input */}
        <div className="mb-4 text-start flex items-center">
          <label
            htmlFor="name"
            className="block text-lg text-gray-700 mb-2 w-[20%]"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-[80%] px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="email"
            className="block text-lg text-gray-700 mb-2 w-[20%]"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-[80%] px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Email Text */}
        <div className="mb-4 lg:ml-[20%] p-4 rounded-lg">
            <p className="text-gray-600 text-justify leading-relaxed">
                Please send an email to{" "}
                <a href="mailto:ravi@mannamlaw.com" className="text-blue-600 underline break-all">
                    ravi@mannamlaw.com
                </a>
                ,{" "}
                <span className="text-gray-600">Copying to </span>
                <a href="mailto:Hemanth@mannamlaw.com" className="text-blue-600 underline break-all">
                    Hemanth@mannamlaw.com
                </a>
                ,{" "}
                <a href="mailto:sabirou@mannamlaw.com" className="text-blue-600 underline break-all">
                    sabirou@mannamlaw.com
                </a>
                ,{" "}
                <a href="mailto:kanchi@mannamlaw.com" className="text-blue-600 underline break-all">
                    kanchi@mannamlaw.com
                </a>
                ,{" "}
                <a href="mailto:shruti@mannamlaw.com" className="text-blue-600 underline break-all">
                    shruti@mannamlaw.com
                </a>
                . This email should provide a brief synopsis of the legal issue to be
                discussed. Please wait for Mr. Mannam's reply and/or call to confirm
                the appointment.
            </p>
        </div>

        {/* Save Info Checkbox */}
        <div className="mb-4 ml-[20%] flex items-center">
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleInputChange}
            className="mr-2 bg-blue-900 text-blue-900"
          />
          <label htmlFor="saveInfo" className="text-lg text-gray-700">
            Save my information for future bookings
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg text-lg w-2/3"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Information;
