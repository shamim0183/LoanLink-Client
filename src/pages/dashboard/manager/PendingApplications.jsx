import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { useState } from "react"
import { FaCheck, FaEye, FaTimes } from "react-icons/fa"
import Swal from "sweetalert2"
import { ApplicationModal, DataTable } from "../../../components/dashboard"
import { formatDate, formatRelativeTime } from "../../../utils/dateUtils"

const PendingApplications = () => {
  const [selectedApp, setSelectedApp] = useState(null)
  const [showModal, setShowModal] = useState(false)
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
      // Check if manager is suspended
      if (error.response?.status === 403 && error.response?.data?.suspended) {
        const { suspensionReason, suspendUntil } = error.response.data
        const untilDate = suspendUntil
          ? new Date(suspendUntil).toLocaleString()
          : "indefinitely"
        Swal.fire({
          title: "Account Suspended!",
          html: `<p><strong>Reason:</strong> ${
            suspensionReason || "No reason provided"
          }</p><p><strong>Suspended until:</strong> ${untilDate}</p>`,
          icon: "error",
        })
      } else {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.error || "Failed to approve application",
          icon: "error",
        })
      }
    }
  }

  const handleReject = async (appId) => {
    const result = await Swal.fire({
      title: "Reject Application?",
      text: "Please provide a reason for rejection:",
      input: "textarea",
      inputPlaceholder: "Enter rejection reason...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a reason!"
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
      // Check if manager is suspended
      if (error.response?.status === 403 && error.response?.data?.suspended) {
        const { suspensionReason, suspendUntil } = error.response.data
        const untilDate = suspendUntil
          ? new Date(suspendUntil).toLocaleString()
          : "indefinitely"
        Swal.fire({
          title: "Account Suspended!",
          html: `<p><strong>Reason:</strong> ${
            suspensionReason || "No reason provided"
          }</p><p><strong>Suspended until:</strong> ${untilDate}</p>`,
          icon: "error",
        })
      } else {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.error || "Failed to reject application",
          icon: "error",
        })
      }
    }
  }

  const handleView = (app) => {
    setSelectedApp(app)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedApp(null)
  }

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
        <span className="font-semibold text-primary">
          ${app.loanAmount?.toLocaleString()}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (app) => (
        <span className="cursor-help" title={formatRelativeTime(app.createdAt)}>
          {formatDate(app.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (app) => (
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
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pending Applications</h1>
        <div className="text-sm opacity-70">{applications.length} pending</div>
      </div>

      <DataTable
        columns={columns}
        data={applications}
        loading={loading}
        emptyMessage="No pending applications"
      />

      {/* Application Modal */}
      {selectedApp && (
        <ApplicationModal
          application={selectedApp}
          isOpen={showModal}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
          showActions={true}
        />
      )}
    </div>
  )
}

export default PendingApplications
