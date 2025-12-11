import React from "react"
const StatCard = ({ title, value, valueColor = "text-primary" }) => {
  return (
    <div className="stat bg-base-200 rounded-lg">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${valueColor}`}>{value}</div>
    </div>
  )
}

export default StatCard
