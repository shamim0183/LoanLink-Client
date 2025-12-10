import React from "react"
/**
 * Reusable StatusBadge component for consistent status display
 * @param {Object} props
 * @param {string} props.status - The status value (e.g., 'pending', 'approved', 'active')
 * @param {string} props.type - The badge context ('application', 'user', 'payment')
 * @param {string} props.className - Additional CSS classes
 */
const StatusBadge = ({ status, type = "application", className = "" }) => {
  const getStatusStyle = () => {
    const normalized = status?.toLowerCase()

    // Application statuses
    if (type === "application") {
      const styles = {
        pending: "badge-warning",
        approved: "badge-success",
        rejected: "badge-error",
        cancelled: "badge-ghost",
      }
      return styles[normalized] || "badge-info"
    }

    // User statuses
    if (type === "user") {
      const styles = {
        active: "badge-success",
        suspended: "badge-error",
        inactive: "badge-ghost",
      }
      return styles[normalized] || "badge-info"
    }

    // Payment statuses
    if (type === "payment") {
      const styles = {
        completed: "badge-success",
        paid: "badge-success",
        pending: "badge-warning",
        unpaid: "badge-warning",
        failed: "badge-error",
      }
      return styles[normalized] || "badge-info"
    }

    return "badge-info"
  }

  if (!status) return null

  return (
    <span
      className={`badge ${getStatusStyle()} flex justify-center items-center py-3 ${className}`}
    >
      {status}
    </span>
  )
}

export default StatusBadge
