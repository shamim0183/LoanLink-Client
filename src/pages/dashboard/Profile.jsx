import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  FaCalendar,
  FaCamera,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
  FaTimes,
  FaUser,
} from "react-icons/fa"
import useAuth from "../../hooks/useAuth"

const Profile = () => {
  const { user, updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || "",
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
              <div className="relative">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        imagePreview ||
                        formData.photoURL ||
                        user.photoURL ||
                        "https://via.placeholder.com/128"
                      }
                      alt={user.name}
                    />
                  </div>
                </div>
                {isEditing && (
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 btn btn-circle btn-primary btn-sm"
                  >
                    {uploading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <FaCamera />
                    )}
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>

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

              <div className="badge badge-primary badge-lg capitalize">
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
                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                  <FaUser className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Full Name</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                  <FaEnvelope className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Email Address</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                  <FaCalendar className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Account Role</p>
                    <p className="font-semibold capitalize">{user.role}</p>
                    <p className="text-xs opacity-60 mt-1">
                      (Cannot be changed)
                    </p>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                    <FaPhone className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Phone Number</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                  </div>
                )}

                {user.address && (
                  <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Address</p>
                      <p className="font-semibold">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h3 className="card-title mb-4">Account Statistics</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-title">Active Loans</div>
                  <div className="stat-value text-primary">0</div>
                </div>
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-title">Applications</div>
                  <div className="stat-value text-secondary">0</div>
                </div>
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-title">Total Paid</div>
                  <div className="stat-value text-accent">$0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
