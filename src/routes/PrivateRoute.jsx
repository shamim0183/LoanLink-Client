import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useAuth from "../hooks/useAuth"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (user) {
    return children
  }

  // Redirect to login page with return url
  return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute
