import React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import { FaBan, FaSearch } from "react-icons/fa"
import Swal from "sweetalert2"

const ManageBorrowers = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [suspendData, setSuspendData] = useState({
    reason: "",
    duration: "",
    durationType: "day",
  })

  // Fetch all borrowers using TanStack Query
  const { data: borrowers = [], isLoading: loading } = useQuery({
    queryKey: ["manager-borrowers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/manager/borrowers`,
        { withCredentials: true }
      )
      return data || []
    },
  })

  // Use useMemo to filter borrowers
  const filteredBorrowers = useMemo(() => {
    return borrowers.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, borrowers])

  // Suspend borrower mutation
  const suspendMutation = useMutation({
    mutationFn: async ({ userId, reason, duration, durationType }) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/borrowers/${userId}/suspend`,
        { reason, duration, durationType },
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Borrower Suspended!",
        text: "Borrower has been suspended successfully.",
        confirmButtonColor: "#570DF8",
        timer: 2000,
        showConfirmButton: false,
      })
      setSuspendData({ reason: "", duration: "", durationType: "day" })
      setSelectedUser(null)
      document.getElementById("suspend_modal").close()
      queryClient.invalidateQueries(["manager-borrowers"])
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to suspend borrower")
    },
  })

  // Unsuspend borrower mutation
  const unsuspendMutation = useMutation({
    mutationFn: async (userId) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/borrowers/${userId}/unsuspend`,
        {},
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Borrower Unsuspended!",
        text: "Borrower has been unsuspended successfully.",
        confirmButtonColor: "#570DF8",
        timer: 2000,
        showConfirmButton: false,
      })
      queryClient.invalidateQueries(["manager-borrowers"])
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to unsuspend borrower")
    },
  })

  const handleSuspend = () => {
    if (!suspendData.reason.trim()) {
      toast.error("Please provide a reason for suspension")
      return
    }
    if (!suspendData.duration || suspendData.duration <= 0) {
      toast.error("Please provide a valid duration")
      return
    }
    suspendMutation.mutate({
      userId: selectedUser._id,
      ...suspendData,
    })
  }

  const handleUnsuspend = async (userId) => {
    const result = await Swal.fire({
      title: "Unsuspend Borrower?",
      text: "Are you sure you want to unsuspend this borrower?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#570DF8",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, unsuspend!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      unsuspendMutation.mutate(userId)
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
        <h1 className="text-3xl font-bold">Manage Borrowers</h1>
        <div className="text-sm opacity-70">
          {filteredBorrowers.length} borrowers
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Borrowers Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Suspension Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrowers.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src={
                            user.photoURL || "https://via.placeholder.com/40"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.status === "suspended" ? (
                    <span className="badge badge-error flex justify-center items-center py-3">
                      Suspended
                    </span>
                  ) : (
                    <span className="badge badge-success flex justify-center items-center py-3">
                      Active
                    </span>
                  )}
                </td>
                <td>
                  {user.status === "suspended" && user.suspendUntil && (
                    <div className="text-sm">
                      <p className="text-error font-semibold">
                        Until:{" "}
                        {new Date(user.suspendUntil).toLocaleDateString()}
                      </p>
                      <p className="text-xs opacity-70 truncate max-w-[200px]">
                        {user.suspensionReason || "No reason provided"}
                      </p>
                    </div>
                  )}
                  {user.status === "suspended" && !user.suspendUntil && (
                    <span className="text-error text-sm">Permanent</span>
                  )}
                </td>
                <td>
                  {user.status === "suspended" ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleUnsuspend(user._id)}
                    >
                      Unsuspend
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        setSelectedUser(user)
                        document.getElementById("suspend_modal").showModal()
                      }}
                    >
                      <FaBan /> Suspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBorrowers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-70">No borrowers found</p>
        </div>
      )}

      {/* Suspend Modal */}
      <dialog id="suspend_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Suspend Borrower</h3>

          {selectedUser && (
            <div className="mb-4 p-4 bg-base-200 rounded-lg">
              <p className="font-semibold">{selectedUser.name}</p>
              <p className="text-sm opacity-70">{selectedUser.email}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reason for Suspension *</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Please provide a detailed reason..."
                value={suspendData.reason}
                onChange={(e) =>
                  setSuspendData({ ...suspendData, reason: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Duration *</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Enter duration"
                  min="1"
                  value={suspendData.duration}
                  onChange={(e) =>
                    setSuspendData({ ...suspendData, duration: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Unit</span>
                </label>
                <select
                  className="select select-bordered"
                  value={suspendData.durationType}
                  onChange={(e) =>
                    setSuspendData({
                      ...suspendData,
                      durationType: e.target.value,
                    })
                  }
                >
                  <option value="minute">Minute(s)</option>
                  <option value="hour">Hour(s)</option>
                  <option value="day">Day(s)</option>
                  <option value="week">Week(s)</option>
                  <option value="month">Month(s)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                setSuspendData({
                  reason: "",
                  duration: "",
                  durationType: "day",
                })
                setSelectedUser(null)
                document.getElementById("suspend_modal").close()
              }}
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleSuspend}>
              Suspend Borrower
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default ManageBorrowers
