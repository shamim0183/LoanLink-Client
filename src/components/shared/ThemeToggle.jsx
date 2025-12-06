import React from "react"
import { useEffect, useState } from "react"
const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "loanlink"
  )

  useEffect(() => {
    // Set theme on HTML element for DaisyUI
    document.documentElement.setAttribute("data-theme", theme)
    // Save to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "loanlink" ? "dark" : "loanlink")
  }

  return (
    <label className="flex items-center cursor-pointer gap-2 p-1">
      {/* Sun icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-yellow-500 flex-shrink-0 pointer-events-none"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>

      {/* Toggle input */}
      <input
        type="checkbox"
        value="dark"
        className="toggle theme-controller bg-primary border-primary"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />

      {/* Moon icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-400 flex-shrink-0 pointer-events-none"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  )
}

export default ThemeToggle
