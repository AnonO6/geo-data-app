import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for token in localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleButtonClick = () => {
    if (token) {
      navigate("/main"); // Navigate to the draw page if token is present
    } else {
      navigate("/login"); // Otherwise, navigate to the login page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overscroll-y-contain bg-gradient-to-r from-rose-100 via-purple-100 to-teal-100 animate-text">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-blue-950 mb-6">
          Welcome to GeoDraw
        </h1>
        <p className="text-lg text-blue-900 mb-6">
          The Geo Draw App allows you to manage and visualize geospatial data
          with ease. Upload GeoJSON or KML files, draw custom shapes on a map,
          and save them to your account.
        </p>
        <p className="text-lg text-blue-900 mb-8">
          {token
            ? "Start drawing your geospatial data now!"
            : "Get started by logging in to your account!"}
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 hover:text-black transition-all"
        >
          {token ? "Draw" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
