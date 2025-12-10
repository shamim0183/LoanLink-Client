/**
 * Form Validation Rules
 * Reusable validation patterns for react-hook-form
 */

/**
 * Email validation rules
 */
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
}

/**
 * Password validation rules
 */
export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
  validate: {
    hasUpperCase: (value) =>
      /[A-Z]/.test(value) ||
      "Password must contain at least one uppercase letter",
    hasLowerCase: (value) =>
      /[a-z]/.test(value) ||
      "Password must contain at least one lowercase letter",
  },
}

/**
 * Name validation rules
 */
export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters",
  },
}

/**
 * Phone number validation rules
 */
export const phoneValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^[0-9+\-\s()]+$/,
    message: "Invalid phone number format",
  },
}

/**
 * Amount validation rules
 * @param {number} min - Minimum amount
 * @param {number} max - Maximum amount
 */
export const amountValidation = (min = 0, max = 1000000) => ({
  required: "Amount is required",
  min: {
    value: min,
    message: `Minimum amount is $${min}`,
  },
  max: {
    value: max,
    message: `Maximum amount is $${max}`,
  },
})

/**
 * National ID validation
 */
export const nationalIdValidation = {
  required: "National ID is required",
  pattern: {
    value: /^[A-Z0-9-]+$/i,
    message: "Invalid National ID format",
  },
}
