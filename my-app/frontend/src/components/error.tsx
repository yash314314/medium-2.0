import React from "react";

interface ErrorComponentProps {
  message: string; // Error message to display
  onClose: () => void; // Function to handle closing the error component
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-red-600">Error</h2>
        <p className="text-gray-700 mt-2">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};
