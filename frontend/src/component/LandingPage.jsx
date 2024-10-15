// src/components/LandingPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
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
          Get started by logging in to your account!
        </p>
        <button
          onClick={handleLoginClick}
          className="bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 hover:text-black transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
