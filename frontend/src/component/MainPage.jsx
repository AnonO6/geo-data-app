// src/components/MainPage.jsx

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Map from "./Map";

const MainPage = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  const handleFileUpload = (fileContent) => {
    setGeojsonData(fileContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-100 via-purple-100 to-teal-100 animate-text p-8">
      <h2 className="text-4xl font-bold text-center text-blue-950 mb-8">
        Mark Maps With Ease
        <p className="text-xl text-blue-900 mb-8">
          You can upload GeoJSON and KML files, visualize them on a map, draw
          custom shapes, and download the created shapes for further use.
        </p>
      </h2>
      <div className="grid grid-cols-1 gap-8">
        <FileUpload onFileUpload={handleFileUpload} />
        <Map geojsonData={geojsonData} />
      </div>
    </div>
  );
};

export default MainPage;
