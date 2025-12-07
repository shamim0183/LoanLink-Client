import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa"

const ManageLoans = () => {
  const [loans, setLoans] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLoans, setFilteredLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingLoan, setEditingLoan] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchLoans()
  }, [])

  useEffect(() => {
    const filtered = loans.filter(
      (loan) =>
        loan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredLoans(filtered)
  }, [searchTerm, loans])

  const fetchLoans = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/manager/my-loans`,
        {
          withCredentials: true,
        }
      )
      setLoans(data)
      setFilteredLoans(data)
    } catch (error) {
      toast.error("Failed to fetch loans")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (loanId) => {
    if (!window.confirm("Are you sure you want to delete this loan?")) return

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/manager/loans/${loanId}`,
        {
          withCredentials: true,
        }
      )
      toast.success("Loan deleted successfully")
      fetchLoans()
    } catch (error) {
      toast.error("Failed to delete loan")
      console.error(error)
    }
  }

  const handleEdit = (loan) => {
    setEditingLoan(loan)
    setShowEditModal(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/loans/${editingLoan._id}`,
        editingLoan,
        { withCredentials: true }
      )
      toast.success("Loan updated successfully")
      setShowEditModal(false)
      fetchLoans()
    } catch (error) {
      toast.error("Failed to update loan")
      console.error(error)
    }
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
        <h1 className="text-3xl font-bold">Manage My Loans</h1>
        <div className="text-sm opacity-70">{filteredLoans.length} loans</div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="form-control">
          <div className="input-group">
            <span>
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search by title or category..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoans.map((loan) => (
          <div key={loan._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={loan.images?.[0] || "https://via.placeholder.com/400x200"}
                alt={loan.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {loan.title}
                <span className="badge badge-primary flex justify-center items-center py-3">{loan.category}</span>
              </h2>
              <p>{loan.description?.substring(0, 100)}...</p>

              <div className="grid grid-cols-2 gap-2 my-2 text-sm">
                <div>
                  <span className="opacity-70">Interest:</span>
                  <span className="font-semibold ml-2">
                    {loan.interestRate}%
                  </span>
                </div>
                <div>
                  <span className="opacity-70">Max Limit:</span>
                  <span className="font-semibold ml-2">
                    ${loan.maxLoanLimit?.toLocaleString()}
                  </span>
                </div>
              </div>

              {loan.showOnHome && (
                <div className="badge badge-success badge-sm flex justify-center items-center py-3"> 
                    Shown on Home
                  </div>
              )}

              <div className="card-actions justify-end mt-4 gap-2">
                <button
                  className="btn btn-sm btn-info gap-2"
                  onClick={() => handleEdit(loan)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn btn-sm btn-error gap-2"
                  onClick={() => handleDelete(loan._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-70">No loans found</p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingLoan && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-4">Edit Loan</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label">Title</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={editingLoan.title}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">Description</label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={editingLoan.description}
                  onChange={(e) =>
                    setEditingLoan({
                      ...editingLoan,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">Category</label>
                  <select
                    className="select select-bordered"
                    value={editingLoan.category}
                    onChange={(e) =>
                      setEditingLoan({
                        ...editingLoan,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered"
                    value={editingLoan.interestRate}
                    onChange={(e) =>
                      setEditingLoan({
                        ...editingLoan,
                        interestRate: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">Maximum Loan Limit ($)</label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={editingLoan.maxLoanLimit}
                  onChange={(e) =>
                    setEditingLoan({
                      ...editingLoan,
                      maxLoanLimit: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">Image URL</label>
                <input
                  type="url"
                  className="input input-bordered"
                  value={editingLoan.images?.[0] || ""}
                  onChange={(e) =>
                    setEditingLoan({
                      ...editingLoan,
                      images: [e.target.value],
                    })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={editingLoan.showOnHome}
                    onChange={(e) =>
                      setEditingLoan({
                        ...editingLoan,
                        showOnHome: e.target.checked,
                      })
                    }
                  />
                  <span>Show on Home Page</span>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Loan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageLoans
