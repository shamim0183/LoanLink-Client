import React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { FaCheck, FaEye, FaTimes } from "react-icons/fa"
import Swal from "sweetalert2"

const PendingApplications = () => {
  const [selectedApp, setSelectedApp] = useState(null)
  const queryClient = useQueryClient()

  // Fetch pending applications using TanStack Query
  const { data: applications = [], isLoading: loading } = useQuery({
    queryKey: ["pending-applications"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/manager/applications/pending`,
        { withCredentials: true }
      )
      return data || []
    },
  })

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (appId) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/applications/${appId}/approve`,
        {},
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-applications"])
      queryClient.invalidateQueries(["approved-applications"])
    },
  })

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ appId, reason }) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/applications/${appId}/reject`,
        { reason },
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-applications"])
    },
  })

  const handleApprove = async (appId) => {
    const result = await Swal.fire({
      title: "Approve Application?",
      text: "Are you sure you want to approve this loan application?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    })

    if (!result.isConfirmed) return

    try {
      await approveMutation.mutateAsync(appId)

      Swal.fire({
        title: "Approved!",
        text: "The application has been approved successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Failed to approve application",
        icon: "error",
      })
    }
  }

  const handleReject = async (appId) => {
    const result = await Swal.fire({
      title: "Reject Application?",
      text: "Please provide a reason for rejection:",
      icon: "warning",
      input: "textarea",
      inputPlaceholder: "Enter rejection reason here...",
      inputAttributes: {
        "aria-label": "Rejection reason",
      },
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Reject Application",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a rejection reason!"
        }
      },
    })

    if (!result.isConfirmed) return

    try {
      await rejectMutation.mutateAsync({
        appId,
        reason: result.value,
      })

      Swal.fire({
        title: "Rejected!",
        text: "The application has been rejected.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Failed to reject application",
        icon: "error",
      })
    }
  }

  const handleView = (app) => {
    setSelectedApp(app)
    document.getElementById("view_app_modal").showModal()
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
        <h1 className="text-3xl font-bold">Pending Applications</h1>
        <div className="text-sm opacity-70">{applications.length} pending</div>
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
              <th>Date</th>
              <th>Actions</th>
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
                <td className="font-semibold text-primary">
                  ${app.loanAmount?.toLocaleString()}
                </td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-success gap-1"
                      onClick={() => handleApprove(app._id)}
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      className="btn btn-sm btn-error gap-1"
                      onClick={() => handleReject(app._id)}
                    >
                      <FaTimes /> Reject
                    </button>
                    <button
                      className="btn btn-sm btn-info gap-1"
                      onClick={() => handleView(app)}
                    >
                      <FaEye /> View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-70">No pending applications</p>
        </div>
      )}

      {/* View Modal */}
      <dialog id="view_app_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">Application Details</h3>

          {selectedApp && (
            <div className="space-y-4">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold">Applicant</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm opacity-70">Name</p>
                      <p>
                        {selectedApp.firstName} {selectedApp.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Contact</p>
                      <p>{selectedApp.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">National ID</p>
                      <p>{selectedApp.nationalId}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Monthly Income</p>
                      <p>${selectedApp.monthlyIncome?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold">Loan Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm opacity-70">Loan Amount</p>
                      <p className="text-lg font-bold text-primary">
                        ${selectedApp.loanAmount?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Interest Rate</p>
                      <p>{selectedApp.interestRate}%</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm opacity-70">Reason</p>
                      <p>{selectedApp.reasonForLoan}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("view_app_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default PendingApplications
