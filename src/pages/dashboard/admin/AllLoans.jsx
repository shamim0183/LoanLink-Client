import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"

const AllLoans = () => {
  const queryClient = useQueryClient()
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})

  // Fetch all loans using TanStack Query
  const { data: loans = [], isLoading: loading } = useQuery({
    queryKey: ["admin-all-loans"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/loans`,
        { withCredentials: true }
      )
      return data || []
    },
  })

  // Toggle showOnHome mutation
  const toggleShowOnHomeMutation = useMutation({
    mutationFn: async ({ loanId, showOnHome }) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/loans/${loanId}/show-home`,
        { showOnHome },
        { withCredentials: true }
      )
    },
    onSuccess: (_, variables) => {
      toast.success(
        `Loan ${variables.showOnHome ? "added to" : "removed from"} home page`
      )
      queryClient.invalidateQueries(["admin-all-loans"])
      queryClient.invalidateQueries(["featured-loans"])
    },
    onError: () => {
      toast.error("Failed to update loan visibility")
    },
  })

  // Delete loan mutation
  const deleteMutation = useMutation({
    mutationFn: async (loanId) => {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/loans/${loanId}`,
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      toast.success("Loan deleted successfully")
      queryClient.invalidateQueries(["admin-all-loans"])
      queryClient.invalidateQueries(["featured-loans"])
      queryClient.invalidateQueries(["all-loans"])
    },
    onError: () => {
      toast.error("Failed to delete loan")
    },
  })

  // Update loan mutation
  const updateMutation = useMutation({
    mutationFn: async ({ loanId, data }) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/loans/${loanId}`,
        data,
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      toast.success("Loan updated successfully")
      setEditMode(false)
      setSelectedLoan(null)
      document.getElementById("edit_loan_modal").close()
      queryClient.invalidateQueries(["admin-all-loans"])
      queryClient.invalidateQueries(["featured-loans"])
      queryClient.invalidateQueries(["all-loans"])
    },
    onError: () => {
      toast.error("Failed to update loan")
    },
  })

  const handleToggleShowOnHome = (loanId, currentStatus) => {
    toggleShowOnHomeMutation.mutate({
      loanId,
      showOnHome: !currentStatus,
    })
  }

  const handleDelete = (loanId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this loan? This action cannot be undone."
      )
    )
      return

    deleteMutation.mutate(loanId)
  }

  const handleEdit = (loan) => {
    setSelectedLoan(loan)
    setFormData({
      title: loan.title,
      description: loan.description,
      category: loan.category,
      interestRate: loan.interestRate,
      maxLoanLimit: loan.maxLoanLimit,
    })
    setEditMode(true)
    document.getElementById("edit_loan_modal").showModal()
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    updateMutation.mutate({
      loanId: selectedLoan._id,
      data: formData,
    })
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
        <h1 className="text-3xl font-bold">All Loans</h1>
        <div className="text-sm opacity-70">{loans.length} total loans</div>
      </div>

      {/* Loans Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Max Limit</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>
                  <div className="avatar">
                    <div className="w-16 h-16 rounded">
                      <img
                        src={
                          loan.images?.[0] || "https://via.placeholder.com/64"
                        }
                        alt={loan.title}
                      />
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>
                  <span className="badge badge-primary flex justify-center items-center py-3">
                    {loan.category}
                  </span>
                </td>
                <td>${loan.maxLoanLimit?.toLocaleString()}</td>
                <td>{loan.createdBy?.name || "N/A"}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      loan.showOnHome ? "btn-success" : "btn-ghost"
                    }`}
                    onClick={() =>
                      handleToggleShowOnHome(loan._id, loan.showOnHome)
                    }
                  >
                    {loan.showOnHome ? (
                      <FaToggleOn className="text-xl" />
                    ) : (
                      <FaToggleOff className="text-xl" />
                    )}
                  </button>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleEdit(loan)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(loan._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Loan Modal */}
      <dialog id="edit_loan_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Edit Loan</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Loan Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Interest Rate (%)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="input input-bordered"
                  value={formData.interestRate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interestRate: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Max Loan Limit ($)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.maxLoanLimit || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxLoanLimit: Number(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setEditMode(false)
                  setSelectedLoan(null)
                  document.getElementById("edit_loan_modal").close()
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Loan
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default AllLoans
