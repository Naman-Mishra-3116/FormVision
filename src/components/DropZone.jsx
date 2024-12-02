import React from "react";

const Dropzone = ({ setImage }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col items-center justify-center p-10 border-4 border-orange-400 rounded-lg bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-700 hover:shadow-lg transition-shadow duration-300 ease-in-out"
      onClick={() => document.getElementById("fileInput").click()}
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mb-3 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4H7a4 4 0 00-4 4v6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 10l-4-4m0 0l-4 4m4-4v12"
          />
        </svg>
        <p className="font-semibold text-sm">
          Drag and drop a file here, or{" "}
          <span className="text-blue-600 underline">browse</span>
        </p>
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default React.memo(Dropzone);
