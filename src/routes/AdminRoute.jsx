import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useAuth from "../hooks/useAuth"

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (user && user.role === "admin") {
    return children
  }

  // Redirect to home if not admin
  return <Navigate to="/" replace />
}

export default AdminRoute
