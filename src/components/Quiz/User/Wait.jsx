import React from "react";

export default function Wait() {
  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="w-full max-w-xl mx-auto bg-black/60 backdrop-blur-sm border border-purple-700/40 rounded-2xl p-6 sm:p-10 text-center text-white shadow-lg">
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
              Waiting for the quiz to start…
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-md">
              The host will start the quiz shortly. Stay ready — you'll be
              redirected when it begins.
            </p>
          </div>
        </div>
      </div>
  );
}
