import React from 'react';

// Main App component for the 404 page
const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-inter">
      <div className="text-center bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700 max-w-lg w-full">
        {/* Large 404 text */}
        <h1 className="text-9xl font-extrabold text-indigo-600 mb-4 animate-bounce">
          404
        </h1>

        {/* Page Not Found message */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        {/* Descriptive text */}
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Button to go back home */}
        <a
          href="/" // Link to your home page
          className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {/* Icon for the button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
