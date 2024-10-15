// src/components/LandingPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to Geo Data App
        </h1>
        <p className="text-lg text-white mb-6">
          The Geo Data App allows you to manage and visualize geospatial data
          with ease. Upload GeoJSON or KML files, draw custom shapes on a map,
          and save them to your account.
        </p>
        <p className="text-lg text-white mb-8">
          Get started by logging in to your account!
        </p>
        <button
          onClick={handleLoginClick}
          className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
