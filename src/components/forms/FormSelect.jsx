import PropTypes from "prop-types"
import React from "react"

/**
 * Reusable Form Select Component
 * Used for dropdowns in Register, ApplyLoan, and other forms
 *
 * @param {string} label - Select label text
 * @param {object} error - Error object from react-hook-form
 * @param {array} options - Array of {value, label} objects
 * @param {string} placeholder - Placeholder option text
 * @param {object} rest - Other props (register, etc.)
 */
const FormSelect = React.forwardRef(
  (
    {
      label,
      error,
      options = [],
      placeholder = "Select an option",
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className="form-control">
        {label && <label className="form-label">{label}</label>}
        <select
          ref={ref}
          className={`select-field ${error ? "border-error" : ""} ${className}`}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="error-text">{error.message}</span>}
      </div>
    )
  }
)

FormSelect.displayName = "FormSelect"

FormSelect.propTypes = {
  label: PropTypes.string,
  error: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  className: PropTypes.string,
}

export default FormSelect
