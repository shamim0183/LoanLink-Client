import React from "react"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useAuth from "../hooks/useAuth"

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (user && (user.role === "manager" || user.role === "admin")) {
    return children
  }

  // Redirect to home if not manager or admin
  return <Navigate to="/" replace />
}

export default ManagerRoute
