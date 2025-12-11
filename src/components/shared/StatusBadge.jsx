import React from "react"
import PropTypes from "prop-types"

const StatusBadge = ({ status, className = "" }) => {
  // Normalize status to lowercase for comparison
  const normalizedStatus = status?.toLowerCase()

  // Determine badge color based on status
  const getBadgeColor = () => {
    switch (normalizedStatus) {
      case "approved":
      case "active":
      case "completed":
      case "paid":
      case "success":
        return "badge-success"

      case "pending":
      case "processing":
        return "badge-warning"

      case "rejected":
      case "failed":
      case "cancelled":
      case "inactive":
      case "suspended":
        return "badge-error"

      default:
        return "badge-info"
    }
  }

  // Capitalize first letter for display
  const displayText = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : "Unknown"

  return (
    <span className={`badge ${getBadgeColor()} ${className}`}>
      {displayText}
    </span>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default StatusBadge
