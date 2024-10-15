import React from "react";

const DownloadButton = ({ geoJSONData }) => {
  const handleDownloadGeoJSON = () => {
    const blob = new Blob([JSON.stringify(geoJSONData)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drawn_shapes.geojson";
    a.click();
  };

  return (
    <button
      onClick={handleDownloadGeoJSON}
      className="bg-gray-700 hover:bg-gray-900 max-w-fit place-self-center text-white font-bold py-2 px-4 rounded"
    >
      Download GeoJSON
    </button>
  );
};

export default DownloadButton;
