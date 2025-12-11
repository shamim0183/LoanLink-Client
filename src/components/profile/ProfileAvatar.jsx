import React from "react"
import { FaCamera } from "react-icons/fa"

const ProfileAvatar = ({
  photoURL,
  imagePreview,
  name,
  isEditing,
  uploading,
  onImageUpload,
}) => {
  return (
    <div className="relative">
      <div className="avatar">
        <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={imagePreview || photoURL || "https://via.placeholder.com/128"}
            alt={name}
          />
        </div>
      </div>
      {isEditing && (
        <div className="tooltip tooltip-right" data-tip="Upload Photo">
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 btn btn-xs hover:btn-xs cursor-pointer"
          >
            {uploading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaCamera className="text-white" />
            )}
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  )
}

export default ProfileAvatar
