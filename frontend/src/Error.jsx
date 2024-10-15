// src/components/ErrorPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-red-600 mb-6">404</h1>
      <p className="text-lg text-gray-700 mb-8">Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
