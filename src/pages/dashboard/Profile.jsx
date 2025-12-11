import React from "react";
import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast"
import {
  FaCalendar,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
  FaTimes,
  FaUser,
} from "react-icons/fa"
import ProfileAvatar from "../../components/profile/ProfileAvatar"
import ProfileInfoCard from "../../components/profile/ProfileInfoCard"
import RoleBasedStats from "../../components/profile/RoleBasedStats"
import useAuth from "../../hooks/useAuth"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user, updateUserProfile } = useAuth()

  // Dynamic title based on role
  const profileTitle =
    user?.role === "admin"
      ? "Admin Profile - LoanLink"
      : user?.role === "manager"
      ? "Manager Profile - LoanLink"
      : "My Profile - LoanLink"

  useDocumentTitle(profileTitle)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || "",
  })

  // Fetch user statistics from backend
  const { data: statsData } = useQuery({
    queryKey: ["profileStats", user?.role],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/stats`,
        { withCredentials: true }
      )
      return data
    },
    enabled: !!user,
  })

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload to ImgBB
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      )

      setFormData((prev) => ({
        ...prev,
        photoURL: data.data.display_url,
      }))

      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Image upload error:", error)
      toast.error("Failed to upload image")
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      // Update Firebase profile
      await updateUserProfile(formData.name, formData.photoURL)

      // Optionally update backend if needed
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/update-profile`,
        {
          name: formData.name,
          photoURL: formData.photoURL,
        },
        { withCredentials: true }
      )

      toast.success("Profile updated successfully!")
      setIsEditing(false)
      setImagePreview(null)
      window.location.reload() // Refresh to show updated data
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error(error.response?.data?.message || "Failed to update profile")
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      photoURL: user.photoURL || "",
    })
    setImagePreview(null)
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <ProfileAvatar
                photoURL={formData.photoURL || user.photoURL}
                imagePreview={imagePreview}
                name={user.name}
                isEditing={isEditing}
                uploading={uploading}
                onImageUpload={handleImageUpload}
              />

              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input input-bordered w-full max-w-xs mt-4"
                  placeholder="Full Name"
                />
              ) : (
                <h2 className="card-title text-2xl mt-4">{user.name}</h2>
              )}

              <div className="badge badge-primary badge-lg capitalize mt-2 flex justify-center items-center py-3">
                {user.role}
              </div>
              <p className="text-sm opacity-70 mt-2">{user.email}</p>

              {isEditing && (
                <div className="flex gap-2 mt-4 w-full">
                  <button
                    onClick={handleSave}
                    className="btn btn-success btn-sm flex-1"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-error btn-sm flex-1"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">Profile Information</h3>

              <div className="space-y-4">
                <ProfileInfoCard
                  icon={FaUser}
                  label="Full Name"
                  value={user.name}
                />

                <ProfileInfoCard
                  icon={FaEnvelope}
                  label="Email Address"
                  value={user.email}
                />

                <ProfileInfoCard
                  icon={FaCalendar}
                  label="Account Role"
                  value={user.role}
                  note="(Cannot be changed)"
                />

                {user.phone && (
                  <ProfileInfoCard
                    icon={FaPhone}
                    label="Phone Number"
                    value={user.phone}
                  />
                )}

                {user.address && (
                  <ProfileInfoCard
                    icon={FaMapMarkerAlt}
                    label="Address"
                    value={user.address}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h3 className="card-title mb-4">Account Statistics</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <RoleBasedStats role={user?.role} statsData={statsData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
