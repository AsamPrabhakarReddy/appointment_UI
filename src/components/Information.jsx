import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const Information = ({ formData, setFormData, setSelectedIndex }) => {
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
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded">
      <div className="text-2xl font-bold text-primaryColor mb-4 text-center">
        Please provide your information
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        {/* Name Input */}
        {/* <div className="mb-4 text-start flex items-center">
          <label
            htmlFor="name"
            className="block text-lg text-gray-700 mb-2 w-[20%]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-[80%] shadow px-4 py-2 border border-gray-300 rounded"
          />
        </div> */}

        <div className="flex flex-col w-full p-2">
          <label
            htmlFor="name"
            className="md:text-lg text-sm text-blackColor font-semibold"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Please enter your full name"
            className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
          />
        </div>

        {/* Email Input */}
        {/* <div className="mb-4 flex items-center">
          <label
            htmlFor="email"
            className="block text-lg text-gray-700 mb-2 w-[20%]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-[80%] shadow px-4 py-2 border border-gray-300 rounded"
          />
        </div> */}

        <div className="flex flex-col w-full p-2">
          <label
            htmlFor="email"
            className="md:text-lg text-sm text-blackColor font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-white shadow p-3 rounded focus:outline-none w-full md:text-base text-sm"
            placeholder="Enter a valid email"
          />
        </div>

        {/* Email Text */}
        <div className="mb-4 p-2 rounded flex justify-center md:text-base text-sm">
          <p className="text-gray-600 leading-relaxed text-justify">
            Please send email to{" "}
            <a
              href="mailto:ravi@mannamlaw.com"
              className="text-blue-600 underline break-all"
            >
              ravi@mannamlaw.com
            </a>
            . <span className="text-gray-600">Copying to </span>
            <a
              href="mailto:Hemanth@mannamlaw.com"
              className="text-blue-600 underline break-all"
            >
              Hemanth@mannamlaw.com
            </a>
            ,{" "}
            <a
              href="mailto:sabirou@mannamlaw.com"
              className="text-blue-600 underline break-all"
            >
              sabirou@mannamlaw.com
            </a>
            ,{" "}
            <a
              href="mailto:kanchi@mannamlaw.com"
              className="text-blue-600 underline break-all"
            >
              kanchi@mannamlaw.com
            </a>
            ,{" "}
            <a
              href="mailto:shruti@mannamlaw.com"
              className="text-blue-600 underline break-all"
            >
              shruti@mannamlaw.com
            </a>
            . This email should provide a brief synopsis of the legal issue to
            be discussed. Please wait for Mr. Mannam&apos;s reply and/or call to
            confirm the appointment.
          </p>
        </div>

        {/* Save Info Checkbox */}
        <div className="mb-3 p-2 flex items-center justify-center">
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleInputChange}
            className="mr-2 bg-blue-900 text-blue-900"
          />
          <label
            htmlFor="saveInfo"
            className=" text-gray-700 md:text-base text-sm"
          >
            Save my information for future bookings
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center w-[100%] p-4">
          <button
            type="submit"
            className="px-6 py-2 flex flex-row items-center justify-center bg-primaryColor text-white rounded lg:w-2/4 w-full"
          >
            Continue
            <MdArrowRightAlt className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Information;
