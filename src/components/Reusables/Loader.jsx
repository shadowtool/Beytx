import React from "react";

const Loader = ({ customMessage }) => {
  return (
    <div className="min-h-[90%] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <svg
          className="absolute top-0 left-0 w-full h-full animate-spin"
          viewBox="0 0 240 240"
        >
          <circle
            className="stroke-green-300"
            cx="120"
            cy="120"
            r="105"
            fill="none"
            strokeWidth={20}
            strokeDasharray="660"
            strokeDashoffset="330"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute top-0 left-0 w-full h-full animate-spin-slow"
          viewBox="0 0 240 240"
        >
          <circle
            className="stroke-green-400"
            cx="120"
            cy="120"
            r="70"
            fill="none"
            strokeWidth={20}
            strokeDasharray="440"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute top-0 left-0 w-full h-full animate-spin-reverse"
          viewBox="0 0 240 240"
        >
          <circle
            className="stroke-green-500"
            cx="120"
            cy="120"
            r="35"
            fill="none"
            strokeWidth={20}
            strokeDasharray="220"
            strokeDashoffset="110"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {customMessage?.length > 0 && (
        <h5 className="  mt-6 text-green-900">{customMessage}</h5>
      )}
    </div>
  );
};

export default Loader;
