import React from "react"
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaEye, FaFilter } from "react-icons/fa"

const LoanApplications = () => {
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredApplications(applications)
    } else {
      setFilteredApplications(
        applications.filter((app) => app.status === statusFilter)
      )
    }
  }, [statusFilter, applications])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/applications`,
        {
          withCredentials: true,
        }
      )
      setApplications(data)
      setFilteredApplications(data)
    } catch (error) {
      toast.error("Failed to fetch applications")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (app) => {
    setSelectedApp(app)
    document.getElementById("view_application_modal").showModal()
  }

  const getStatusBadge = (status) => {
    const badges = {
      Pending: "badge-warning",
      Approved: "badge-success",
      Rejected: "badge-error",
      Cancelled: "badge-ghost",
    }
    return `badge ${badges[status] || "badge-info"}`
  }

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
        <h1 className="text-3xl font-bold">Loan Applications</h1>
        <div className="text-sm opacity-70">
          {filteredApplications.length} applications
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <FaFilter className="text-xl" />
          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User</th>
              <th>Loan Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id}>
                <td className="font-mono text-xs">{app._id.slice(-8)}</td>
                <td>
                  <div>
                    <div className="font-semibold">
                      {app.user?.name || "N/A"}
                    </div>
                    <div className="text-xs opacity-70">{app.user?.email}</div>
                  </div>
                </td>
                <td>{app.loan?.title || "N/A"}</td>
                <td>
                  <span className="badge badge-primary">
                    {app.loan?.category || "N/A"}
                  </span>
                </td>
                <td className="font-semibold">
                  ${app.loanAmount?.toLocaleString()}
                </td>
                <td>
                  <span className={getStatusBadge(app.status)}>
                    {app.status}
                  </span>
                </td>
                <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleView(app)}
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Application Modal */}
      <dialog id="view_application_modal" className="modal">
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-lg mb-4">Application Details</h3>

          {selectedApp && (
            <div className="space-y-4">
              {/* User Info */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold">Applicant Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-70">Name</p>
                      <p className="font-semibold">
                        {selectedApp.firstName} {selectedApp.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Email</p>
                      <p className="font-semibold">{selectedApp.user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Contact Number</p>
                      <p className="font-semibold">
                        {selectedApp.contactNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">National ID</p>
                      <p className="font-semibold">{selectedApp.nationalId}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Info */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold">Loan Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-70">Loan Title</p>
                      <p className="font-semibold">{selectedApp.loan?.title}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Category</p>
                      <p className="font-semibold">
                        {selectedApp.loan?.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Requested Amount</p>
                      <p className="font-semibold text-primary text-lg">
                        ${selectedApp.loanAmount?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Interest Rate</p>
                      <p className="font-semibold">
                        {selectedApp.interestRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold">Financial Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-70">Income Source</p>
                      <p className="font-semibold">
                        {selectedApp.incomeSource}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Monthly Income</p>
                      <p className="font-semibold">
                        ${selectedApp.monthlyIncome?.toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm opacity-70">Reason for Loan</p>
                      <p className="font-semibold">
                        {selectedApp.reasonForLoan}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address & Notes */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold">Additional Information</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm opacity-70">Address</p>
                      <p>{selectedApp.address}</p>
                    </div>
                    {selectedApp.extraNotes && (
                      <div>
                        <p className="text-sm opacity-70">Extra Notes</p>
                        <p>{selectedApp.extraNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold">Status Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-70">Application Status</p>
                      <span className={getStatusBadge(selectedApp.status)}>
                        {selectedApp.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Fee Status</p>
                      <span
                        className={`badge ${
                          selectedApp.feeStatus === "Paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {selectedApp.feeStatus}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Applied Date</p>
                      <p>
                        {new Date(selectedApp.appliedDate).toLocaleString()}
                      </p>
                    </div>
                    {selectedApp.approvedAt && (
                      <div>
                        <p className="text-sm opacity-70">Approved Date</p>
                        <p>
                          {new Date(selectedApp.approvedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                setSelectedApp(null)
                document.getElementById("view_application_modal").close()
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default LoanApplications
