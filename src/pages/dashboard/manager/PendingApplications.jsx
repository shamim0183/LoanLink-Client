import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaCheck, FaEye, FaTimes } from "react-icons/fa"

const PendingApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/manager/applications/pending`,
        {
          withCredentials: true,
        }
      )
      setApplications(data)
    } catch (error) {
      toast.error("Failed to fetch applications")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (appId) => {
    if (!window.confirm("Approve this application?")) return

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/applications/${appId}/approve`,
        {},
        { withCredentials: true }
      )
      toast.success("Application approved successfully!")
      fetchApplications()
    } catch (error) {
      toast.error("Failed to approve application")
      console.error(error)
    }
  }

  const handleReject = async (appId) => {
    const reason = prompt("Please provide a reason for rejection:")
    if (!reason) return

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/applications/${appId}/reject`,
        { reason },
        { withCredentials: true }
      )
      toast.success("Application rejected")
      fetchApplications()
    } catch (error) {
      toast.error("Failed to reject application")
      console.error(error)
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
                    <div className="text-xs opacity-70">{app.user?.email}</div>
                  </div>
                </td>
                <td>{app.loan?.title}</td>
                <td className="font-semibold text-primary">
                  ${app.loanAmount?.toLocaleString()}
                </td>
                <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
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
