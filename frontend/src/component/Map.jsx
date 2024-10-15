import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import DownloadButton from "./DownloadButton"; // Importing the DownloadButton

const Map = ({ geojsonData }) => {
  const [drawnShapes, setDrawnShapes] = useState([]);

  const handleDrawCreated = (event) => {
    const { layerType, layer } = event;
    const shapeData = {};
    if (layerType === "polygon") {
      shapeData.type = "Polygon";
      shapeData.coordinates = layer
        .getLatLngs()
        .map((latlng) => [latlng.lng, latlng.lat]);
    } else if (layerType === "circle") {
      shapeData.type = "Circle";
      shapeData.center = [layer.getLatLng().lng, layer.getLatLng().lat];
      shapeData.radius = layer.getRadius();
    }
    setDrawnShapes([...drawnShapes, shapeData]);
  };

  const geoJSONData = {
    type: "FeatureCollection",
    features: drawnShapes.map((shape) => ({
      type: "Feature",
      geometry: {
        type: shape.type === "Polygon" ? "Polygon" : "Point",
        coordinates:
          shape.type === "Polygon" ? [shape.coordinates] : shape.center,
      },
      properties: shape.type === "Polygon" ? {} : { radius: shape.radius },
    })),
  };

  return (
    <>
      <DownloadButton geoJSONData={geoJSONData} />
      <div className="w-11/12 h-[80vh] mx-auto rounded-md">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {geojsonData && <GeoJSON data={JSON.parse(geojsonData)} />}
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={handleDrawCreated}
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
