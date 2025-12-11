import React from "react"
import StatCard from "./StatCard"

const RoleBasedStats = ({ role, statsData }) => {
  if (role === "borrower") {
    return (
      <>
        <StatCard
          title="My Applications"
          value={statsData?.myApplications || 0}
          valueColor="text-primary"
        />
        <StatCard
          title="Approved"
          value={statsData?.approvedApplications || 0}
          valueColor="text-success"
        />
        <StatCard
          title="Total Borrowed"
          value={`$${(statsData?.totalBorrowed || 0).toLocaleString()}`}
          valueColor="text-secondary"
        />
      </>
    )
  }

  if (role === "manager") {
    return (
      <>
        <StatCard
          title="My Loans"
          value={statsData?.myLoans || 0}
          valueColor="text-primary"
        />
        <StatCard
          title="Applications"
          value={statsData?.pendingApplications || 0}
          valueColor="text-warning"
        />
        <StatCard
          title="Approved"
          value={statsData?.approvedApplications || 0}
          valueColor="text-success"
        />
      </>
    )
  }

  if (role === "admin") {
    return (
      <>
        <StatCard
          title="Total Users"
          value={statsData?.totalUsers || 0}
          valueColor="text-primary"
        />
        <StatCard
          title="Total Loans"
          value={statsData?.totalLoans || 0}
          valueColor="text-secondary"
        />
        <StatCard
          title="Applications"
          value={
            (statsData?.pendingApplications || 0) +
            (statsData?.approvedApplications || 0)
          }
          valueColor="text-success"
        />
      </>
    )
  }

  return null
}

export default RoleBasedStats
