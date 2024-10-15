import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as omnivore from "leaflet-omnivore"; // For parsing KML

const FileUpload = ({ onFileUpload }) => {
  const [error, setError] = useState(""); // State to manage errors

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setError(""); // Reset error message on each new drop
      if (fileRejections.length > 0) {
        setError(
          "Unsupported file format. Please upload a GeoJSON or KML file."
        );
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;

          // Check file type by extension
          if (file.name.endsWith(".geojson") || file.name.endsWith(".json")) {
            try {
              const geojson = JSON.parse(fileContent); // Parse GeoJSON
              onFileUpload(geojson); // Pass the parsed data to the map
            } catch (err) {
              setError("Invalid GeoJSON file format.");
            }
          } else if (file.name.endsWith(".kml")) {
            try {
              // Use omnivore to parse KML into GeoJSON format
              const kmlLayer = omnivore.kml.parse(fileContent);
              onFileUpload(kmlLayer.toGeoJSON()); // Convert to GeoJSON
            } catch (err) {
              setError("Invalid KML file format.");
            }
          } else {
            setError(
              "Unsupported file format. Please upload a GeoJSON or KML file."
            );
          }
        };
        reader.readAsText(file);
      });
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.google-earth.kml+xml": [], // KML file
      "application/geo+json": [], // GeoJSON file
    },
    onDropRejected: () => {
      setError("Unsupported file format. Please upload a GeoJSON or KML file.");
    },
  });

  return (
    <div className="w-full max-w-xl mx-auto my-6">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 bg-gray-100 hover:bg-gray-200 p-6 rounded-lg cursor-pointer flex items-center justify-center text-center transition-all duration-200 ease-in-out"
      >
        <input {...getInputProps()} className="hidden" />
        <p className="text-gray-600 text-lg">
          Drag & drop GeoJSON or KML files here, or click to select files
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p> // Error message
      )}
    </div>
  );
};

export default FileUpload;
