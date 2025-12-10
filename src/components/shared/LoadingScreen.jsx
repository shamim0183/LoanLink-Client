import React from "react"
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#2A2A4E] via-[#1A1A2E] to-[#16213E]">
      {/* Animated Logo/Brand */}
      <div className="text-center">
        {/* Spinning Loader */}
        <div className="relative mb-8 flex justify-center">
          {/* Outer Ring */}
          <div className="absolute h-24 w-24 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>

          {/* Inner Ring */}
          <div
            className="absolute h-24 w-24 animate-spin rounded-full border-4 border-transparent border-b-primary/60"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          ></div>

          {/* Center Icon */}
          <div className="flex h-24 w-24 items-center justify-center">
            <svg
              className="h-12 w-12 text-primary animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="mb-4 text-4xl font-bold text-white animate-fade-in">
          Loan<span className="text-primary">Link</span>
        </h1>

        {/* Loading Text */}
        <p className="text-base-content/70 animate-pulse">
          Loading your financial future...
        </p>

        {/* Dots Animation */}
        <div className="mt-4 flex justify-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce"></div>
          <div
            className="h-3 w-3 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-3 w-3 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
