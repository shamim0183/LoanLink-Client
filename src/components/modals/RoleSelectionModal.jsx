import React from "react"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

const RoleSelectionModal = ({ onRoleSelected }) => {
  const [selectedRole, setSelectedRole] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!selectedRole) {
      toast.error("Please select a role")
      return
    }

    setLoading(true)
    try {
      // Update role in backend
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/update-role`,
        { role: selectedRole },
        { withCredentials: true }
      )

      toast.success("Role selected successfully!")
      onRoleSelected(selectedRole)
    } catch (error) {
      console.error("Role update error:", error)
      toast.error(error.response?.data?.message || "Failed to update role")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-4">Select Your Role</h3>
        <p className="text-base-content/70 mb-6">
          Please select your role to continue. This cannot be changed later.
        </p>

        <div className="space-y-4">
          {/* Borrower Option */}
          <div
            onClick={() => setSelectedRole("borrower")}
            className={`card cursor-pointer transition-all ${
              selectedRole === "borrower"
                ? "bg-primary text-primary-content ring-2 ring-primary"
                : "bg-base-200 hover:bg-base-300"
            }`}
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="role"
                  className="radio radio-primary"
                  checked={selectedRole === "borrower"}
                  onChange={() => setSelectedRole("borrower")}
                />
                <div>
                  <h4 className="font-bold text-lg">Borrower</h4>
                  <p className="text-sm opacity-70">
                    I need a loan for personal or business purposes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Manager Option */}
          <div
            onClick={() => setSelectedRole("manager")}
            className={`card cursor-pointer transition-all ${
              selectedRole === "manager"
                ? "bg-primary text-primary-content ring-2 ring-primary"
                : "bg-base-200 hover:bg-base-300"
            }`}
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="role"
                  className="radio radio-primary"
                  checked={selectedRole === "manager"}
                  onChange={() => setSelectedRole("manager")}
                />
                <div>
                  <h4 className="font-bold text-lg">Manager</h4>
                  <p className="text-sm opacity-70">
                    I manage and approve loan applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <button
            onClick={handleSubmit}
            disabled={!selectedRole || loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelectionModal
