import React from "react"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { FaCalendar } from "react-icons/fa"

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Approved Applications</h1>
        <div className="text-sm opacity-70">{applications.length} approved</div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Applied Date</th>
              <th>Approved Date</th>
              <th>Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="font-mono text-xs">{app._id.slice(-8)}</td>
                <td>
                  <div>
                    <div className="font-semibold">
                      {app.firstName} {app.lastName}
                    </div>
                    <div className="text-xs opacity-70">
                      {app.userId?.email}
                    </div>
                  </div>
                </td>
                <td>{app.loanId?.title}</td>
                <td className="font-semibold text-success">
                  ${app.loanAmount?.toLocaleString()}
                </td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-success" />
                    {new Date(app.approvedAt).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <span
                    className={`badge badge-lg flex justify-center items-center py-4 ${
                      app.applicationFeeStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {app.applicationFeeStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-70">No approved applications yet</p>
        </div>
      )}
    </div>
  )
}

export default ApprovedApplications
