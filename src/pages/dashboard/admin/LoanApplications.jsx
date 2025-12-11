import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import { FaEye, FaFilter } from "react-icons/fa"
import {
  ApplicationModal,
  DataTable,
  StatusBadge,
} from "../../../components/dashboard"
import useDocumentTitle from "../../../hooks/useDocumentTitle"

const LoanApplications = () => {
  useDocumentTitle("Loan Applications - LoanLink")

  const queryClient = useQueryClient()
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApp, setSelectedApp] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Fetch all loan applications using TanStack Query
  const { data: applications = [], isLoading: loading } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/applications`,
        { withCredentials: true }
      )
      return data || []
    },
  })

  // Use useMemo for filtering instead of useEffect + setState
  const filteredApplications = useMemo(() => {
    if (statusFilter === "all") {
      return applications
    }
    return applications.filter((app) => app.status === statusFilter)
  }, [statusFilter, applications])

  // Approve application mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/applications/${id}/approve`,
        {},
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      toast.success("Application approved successfully")
      setSelectedApp(null)
      setShowModal(false)
      queryClient.invalidateQueries(["admin-applications"])
      queryClient.invalidateQueries(["pending-applications"])
      queryClient.invalidateQueries(["approved-applications"])
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to approve")
    },
  })

  // Reject application mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/applications/${id}/reject`,
        {},
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      toast.success("Application rejected")
      setSelectedApp(null)
      setShowModal(false)
      queryClient.invalidateQueries(["admin-applications"])
      queryClient.invalidateQueries(["pending-applications"])
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to reject")
    },
  })

  const handleView = (app) => {
    setSelectedApp(app)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedApp(null)
  }

  const handleApprove = (id) => {
    approveMutation.mutate(id)
  }

  const handleReject = (id) => {
    rejectMutation.mutate(id)
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
      label: "User",
      render: (app) => (
        <div>
          <div className="font-semibold">{app.userId?.name || "N/A"}</div>
          <div className="text-xs opacity-70">{app.userId?.email}</div>
        </div>
      ),
    },
    {
      key: "loan",
      label: "Loan Title",
      render: (app) => app.loanId?.title || "N/A",
    },
    {
      key: "category",
      label: "Category",
      render: (app) => (
        <span className="badge badge-primary flex justify-center items-center py-4">
          {app.loanId?.category || "N/A"}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (app) => (
        <span className="font-semibold">
          ${app.loanAmount?.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (app) => (
        <StatusBadge status={app.status} type="application" className="py-4" />
      ),
    },
    {
      key: "date",
      label: "Applied Date",
      render: (app) => new Date(app.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (app) => (
        <button
          className="btn btn-neutral btn-info"
          onClick={() => handleView(app)}
        >
          <FaEye /> View
        </button>
      ),
    },
  ]

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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredApplications}
        loading={loading}
        emptyMessage="No applications found"
      />

      {/* Application Modal */}
      {selectedApp && (
        <ApplicationModal
          application={selectedApp}
          isOpen={showModal}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
          showActions={selectedApp.status === "pending"}
        />
      )}
    </div>
  )
}

export default LoanApplications
