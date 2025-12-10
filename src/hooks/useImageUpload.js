import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants"

/**
 * Custom hook for image upload to ImgBB
 * Reusable across Register, Profile, and other pages that need image upload
 *
 * @returns {object} { uploading, imagePreview, photoURL, handleImageUpload }
 */
export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [photoURL, setPhotoURL] = useState("")

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error(ERROR_MESSAGES.INVALID_IMAGE_FILE)
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(ERROR_MESSAGES.IMAGE_TOO_LARGE)
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

      setPhotoURL(data.data.display_url)
      toast.success(SUCCESS_MESSAGES.IMAGE_UPLOADED)
    } catch (error) {
      console.error("Image upload error:", error)
      toast.error(ERROR_MESSAGES.IMAGE_UPLOAD_FAILED)
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  return { uploading, imagePreview, photoURL, handleImageUpload }
}
