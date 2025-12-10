import PropTypes from "prop-types";
import React, { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const PasswordInput = React.forwardRef(
  (
    {
      label = "Password",
      placeholder = "Enter your password",
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="form-control">
        {label && <label className="form-label">{label}</label>}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className={`input-field ${
              error ? "border-error" : ""
            } ${className}`}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {error && <span className="error-text">{error.message}</span>}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

PasswordInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.object,
  className: PropTypes.string,
}

export default PasswordInput
