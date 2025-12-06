import React from "react"
const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const spinner = (
    <div className="flex items-center justify-center">
      <div
        className={`loading loading-spinner loading-lg text-primary ${sizeClasses[size]}`}
      ></div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
