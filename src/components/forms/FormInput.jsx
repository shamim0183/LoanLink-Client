import PropTypes from "prop-types"
import React from "react"

/**
 * Reusable Form Input Component
 * Used across Register, ApplyLoan, Profile, Contact, and other forms
 *
 * @param {string} label - Input label text
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {object} error - Error object from react-hook-form
 * @param {string} placeholder - Placeholder text
 * @param {object} rest - Other props passed to input (register, etc.)
 */
const FormInput = React.forwardRef(
  (
    { label, type = "text", error, placeholder, className = "", ...rest },
    ref
  ) => {
    return (
      <div className="form-control">
        {label && <label className="form-label">{label}</label>}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`input-field ${error ? "border-error" : ""} ${className}`}
          {...rest}
        />
        {error && <span className="error-text">{error.message}</span>}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
}

export default FormInput
