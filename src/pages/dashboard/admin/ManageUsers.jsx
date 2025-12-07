import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaBan, FaSearch } from "react-icons/fa"

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [suspendReason, setSuspendReason] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        {
          withCredentials: true,
        }
      )
      setUsers(data)
      setFilteredUsers(data)
    } catch (error) {
      toast.error("Failed to fetch users")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRole = async (userId, newRole) => {
    if (!window.confirm(`Change user role to ${newRole}?`)) return

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      )
      toast.success("User role updated successfully")
      fetchUsers()
    } catch (error) {
      toast.error("Failed to update user role")
      console.error(error)
    }
  }

  const handleSuspend = async () => {
    if (!suspendReason.trim()) {
      toast.error("Please provide a reason for suspension")
      return
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/${
          selectedUser._id
        }/suspend`,
        { reason: suspendReason, suspended: true },
        { withCredentials: true }
      )
      toast.success("User suspended successfully")
      setSuspendReason("")
      setSelectedUser(null)
      document.getElementById("suspend_modal").close()
      fetchUsers()
    } catch (error) {
      toast.error("Failed to suspend user")
      console.error(error)
    }
  }

  const handleUnsuspend = async (userId) => {
    if (!window.confirm("Unsuspend this user?")) return

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}/suspend`,
        { suspended: false },
        { withCredentials: true }
      )
      toast.success("User unsuspended successfully")
      fetchUsers()
    } catch (error) {
      toast.error("Failed to unsuspend user")
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
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <div className="text-sm opacity-70">{filteredUsers.length} users</div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            className="input input-bordered w-full pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
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
                  <span
                    className={`badge flex justify-center items-center py-3 ${
                      user.role === "admin"
                        ? "badge-error"
                        : user.role === "manager"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.suspended ? (
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
                  <div className="flex gap-2">
                    {/* Role Dropdown */}
                    <select
                      className="select select-bordered select-sm"
                      value={user.role}
                      onChange={(e) =>
                        handleUpdateRole(user._id, e.target.value)
                      }
                      disabled={user.suspended}
                    >
                      <option value="borrower">Borrower</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>

                    {/* Suspend/Unsuspend Button */}
                    {user.suspended ? (
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suspend Modal */}
      <dialog id="suspend_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Suspend User</h3>

          {selectedUser && (
            <div className="mb-4 p-4 bg-base-200 rounded-lg">
              <p className="font-semibold">{selectedUser.name}</p>
              <p className="text-sm opacity-70">{selectedUser.email}</p>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Reason for Suspension *</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Please provide a detailed reason..."
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
            />
          </div>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                setSuspendReason("")
                setSelectedUser(null)
                document.getElementById("suspend_modal").close()
              }}
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleSuspend}>
              Suspend User
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default ManageUsers
