import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { saveAs } from "file-saver"; // For saving the GeoJSON as a file

const Map = ({ geojsonData }) => {
  const [drawnShapes, setDrawnShapes] = useState([]);
  const featureGroupRef = useRef(); // Reference for FeatureGroup

  // Handle shape creation
  const handleDrawCreated = (event) => {
    const layer = event.layer;
    const shapeData = layer.toGeoJSON(); // Convert the drawn shape to GeoJSON
    setDrawnShapes((prev) => [...prev, shapeData]); // Store the shape
  };

  // Handle shape edits or deletions
  const handleDrawEdited = (event) => {
    const layers = event.layers;
    const updatedShapes = [];
    layers.eachLayer((layer) => {
      updatedShapes.push(layer.toGeoJSON());
    });
    setDrawnShapes(updatedShapes); // Update state with the edited shapes
  };

  // Export the drawn shapes as a GeoJSON file
  const exportGeoJSON = () => {
    const geojson = {
      type: "FeatureCollection",
      features: drawnShapes,
    };
    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "map_data.geojson"); // Use file-saver to download the file
  };

  return (
    <>
      <button
        onClick={exportGeoJSON}
        className="bg-gray-700 hover:bg-gray-900 max-w-fit place-self-center text-white font-bold py-2 px-4 rounded"
      >
        Download GeoJSON
      </button>
      <div className="w-11/12 h-[80vh] mx-auto rounded-lg relative ">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          className="h-full w-full boreder-2 border-black"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Render the uploaded GeoJSON data */}
          {geojsonData && <GeoJSON data={geojsonData} />}

          <FeatureGroup ref={featureGroupRef}>
            <EditControl
              position="topright"
              onCreated={handleDrawCreated}
              onEdited={handleDrawEdited}
              onDeleted={handleDrawEdited}
              draw={{
                rectangle: false,
                marker: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
