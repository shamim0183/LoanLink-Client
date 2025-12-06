import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa"

const ManageLoans = () => {
  const [loans, setLoans] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLoans, setFilteredLoans] = useState([])
  const [loading, setLoading] = useState(true)

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
                src={loan.image || "https://via.placeholder.com/400x200"}
                alt={loan.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {loan.title}
                <span className="badge badge-primary">{loan.category}</span>
              </h2>
              <p>{loan.description?.substring(0, 100)}...</p>

              <div className="grid grid-cols-2 gap-2 my-2 text-sm">
                <div>
                  <span className="opacity-70">Interest:</span>
                  <span className="font-semibold ml-2">{loan.interest}%</span>
                </div>
                <div>
                  <span className="opacity-70">Max Limit:</span>
                  <span className="font-semibold ml-2">
                    ${loan.maxLimit?.toLocaleString()}
                  </span>
                </div>
              </div>

              {loan.showOnHome && (
                <div className="badge badge-success badge-sm">
                  Shown on Home
                </div>
              )}

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-info gap-2">
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
    </div>
  )
}

export default ManageLoans
