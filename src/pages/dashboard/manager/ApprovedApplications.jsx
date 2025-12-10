import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { FaCalendar } from "react-icons/fa"
import { DataTable, StatusBadge } from "../../../components/dashboard"
import { formatDate, formatRelativeTime } from "../../../utils/dateUtils"

const ApprovedApplications = () => {
  // Fetch approved applications using TanStack Query
  const { data: applications = [], isLoading: loading } = useQuery({
    queryKey: ["approved-applications"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/manager/applications/approved`,
        { withCredentials: true }
      )
      return data || []
    },
  })

  // Define table columns
  const columns = [
    {
      key: "_id",
      label: "Loan ID",
      render: (app) => (
        <span className="font-mono text-xs">{app._id.slice(-8)}</span>
      ),
    },
    {
      key: "user",
      label: "User Info",
      render: (app) => (
        <div>
          <div className="font-semibold">
            {app.firstName} {app.lastName}
          </div>
          <div className="text-xs opacity-70">{app.userId?.email}</div>
        </div>
      ),
    },
    {
      key: "loan",
      label: "Loan",
      render: (app) => app.loanId?.title,
    },
    {
      key: "amount",
      label: "Amount",
      render: (app) => (
        <span className="font-semibold text-success">
          ${app.loanAmount?.toLocaleString()}
        </span>
      ),
    },
    {
      key: "appliedDate",
      label: "Applied Date",
      render: (app) => (
        <span className="cursor-help" title={formatRelativeTime(app.createdAt)}>
          {formatDate(app.createdAt)}
        </span>
      ),
    },
    {
      key: "approvedDate",
      label: "Approved Date",
      render: (app) => (
        <div className="flex items-center gap-2">
          <FaCalendar className="text-success" />
          <span
            className="cursor-help"
            title={formatRelativeTime(app.approvedAt)}
          >
            {formatDate(app.approvedAt)}
          </span>
        </div>
      ),
    },
    {
      key: "feeStatus",
      label: "Fee Status",
      render: (app) => (
        <StatusBadge
          status={app.applicationFeeStatus === "paid" ? "Paid" : "Unpaid"}
          type="payment"
          className="badge-lg py-4"
        />
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Approved Applications</h1>
        <div className="text-sm opacity-70">{applications.length} approved</div>
      </div>

      <DataTable
        columns={columns}
        data={applications}
        loading={loading}
        emptyMessage="No approved applications yet"
      />
    </div>
  )
}

export default ApprovedApplications
