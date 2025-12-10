import PropTypes from "prop-types"
import React from "react"

/**
 * Reusable Textarea Component
 * Used in Contact, ApplyLoan, and other forms
 *
 * @param {string} label - Textarea label text
 * @param {object} error - Error object from react-hook-form
 * @param {string} placeholder - Placeholder text
 * @param {number} rows - Number of rows
 * @param {object} rest - Other props (register, etc.)
 */
const FormTextarea = React.forwardRef(
  ({ label, error, placeholder, rows = 4, className = "", ...rest }, ref) => {
    return (
      <div className="form-control">
        {label && <label className="form-label">{label}</label>}
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={`textarea-field ${
            error ? "border-error" : ""
          } ${className}`}
          {...rest}
        />
        {error && <span className="error-text">{error.message}</span>}
      </div>
    )
  }
)

FormTextarea.displayName = "FormTextarea"

FormTextarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
}

export default FormTextarea
