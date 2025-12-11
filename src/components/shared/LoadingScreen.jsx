import React from "react"
import { FaDollarSign } from "react-icons/fa"
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-200">
      {/* Add global keyframe animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes rotateY {
            0% { transform: rotateY(0deg); }
            70% { transform: rotateY(360deg); }
          }
        `,
        }}
      />

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

          {/* Center Icon - Rotating Dollar Sign */}
          <div className="flex h-24 w-24 items-center justify-center">
            <FaDollarSign
              className="h-12 w-12 text-primary"
              style={{
                animation: "rotateY 4s linear infinite",
              }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="mb-4 text-4xl font-bold text-base-content animate-fade-in">
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
