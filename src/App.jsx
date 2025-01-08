import Hero from "./components/Hero";
import { useState } from "react";
import Lottie from "lottie-react";
import Anime from "./assets/Home.json";
import CancelOrReschedule from "./components/CancelOrReschedule";
import Calendar from "./components/Calender";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cancel from "./components/Cancel";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col space-x-2">
              <Lottie
                animationData={Anime}
                loop={true}
                className="w-full h-auto "
              />
              <div>
                <h1 className="text-gray-600 font-medium">
                  You are being directed to Syndèo appointment scheduling platform...
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/cancel-reschedule/:appointmentId" element={<CancelOrReschedule />} />
            <Route path="/cancel/:appointmentId" element={<Cancel />} />
          </Routes>
        )}
      </BrowserRouter>  
    </>
  );
}

export default App;
