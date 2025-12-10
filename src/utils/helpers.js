/**
 * Utility Functions for Client Application
 * Reusable helper functions to keep code DRY
 */

/**
 * Format currency to USD
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted datetime string
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ""
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

/**
 * Get status badge color based on status
 * @param {string} status - Status string
 * @returns {string} Badge color class
 */
export const getStatusColor = (status) => {
  const statusColors = {
    pending: "badge-warning",
    approved: "badge-success",
    rejected: "badge-error",
    completed: "badge-success",
    paid: "badge-success",
    unpaid: "badge-warning",
    active: "badge-success",
    suspended: "badge-error",
  }
  return statusColors[status?.toLowerCase()] || "badge-ghost"
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

/**
 * Calculate loan monthly payment (simplified)
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (percentage)
 * @param {number} months - Loan term in months
 * @returns {number} Monthly payment amount
 */
export const calculateMonthlyPayment = (principal, annualRate, months) => {
  const monthlyRate = annualRate / 100 / 12
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  return isNaN(payment) ? 0 : payment
}

/**
 * Sleep/delay function for async operations
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
