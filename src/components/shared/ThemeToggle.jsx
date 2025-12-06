import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

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
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />

      {/* Sun icon - visible in light mode */}
      <FaSun className="swap-on fill-current w-6 h-6 text-warning" />

      {/* Moon icon - visible in dark mode */}
      <FaMoon className="swap-off fill-current w-6 h-6 text-base-content" />
    </label>
  )
}

export default ThemeToggle
