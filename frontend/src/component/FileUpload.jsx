import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          onFileUpload(fileContent);
        };
        reader.readAsText(file);
      });
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 bg-gray-100 hover:bg-gray-200 p-6 rounded-lg cursor-pointer w-full max-w-xl mx-auto my-6 flex items-center justify-center text-center transition-all duration-200 ease-in-out"
    >
      <input {...getInputProps()} className="hidden" />
      <p className="text-gray-600 text-lg">
        Drag & drop GeoJSON or KML files here, or click to select files
      </p>
    </div>
  );
};

export default FileUpload;
