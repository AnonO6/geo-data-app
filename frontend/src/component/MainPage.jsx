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
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Geo Data Management
        <p className="text-xl text-gray-800 mb-8">
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
