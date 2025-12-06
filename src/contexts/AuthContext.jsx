import React from "react"
import axios from "axios"
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import RoleSelectionModal from "../components/modals/RoleSelectionModal"
import { auth } from "../config/firebase.config"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showRoleModal, setShowRoleModal] = useState(false)

  // Register with email and password
  const register = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login with email and password
  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Google Login
  const googleLogin = () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  // GitHub Login
  const githubLogin = () => {
    setLoading(true)
    const provider = new GithubAuthProvider()
    return signInWithPopup(auth, provider)
  }

  // Update User Profile
  const updateUserProfile = async (name, photoURL) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
    // Reload user to ensure the profile is synced
    await auth.currentUser.reload()
    console.log(
      "🔄 User profile updated and reloaded. New photoURL:",
      auth.currentUser.photoURL
    )
  }

  // Handle role selection
  const handleRoleSelected = async (role) => {
    try {
      // Refresh user data from backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/jwt`,
        {
          email: user.email,
          name: user.name,
          photoURL: user.photoURL,
        },
        { withCredentials: true }
      )

      setUser(data.user)
      setShowRoleModal(false)
    } catch (error) {
      console.error("Error refreshing user data:", error)
    }
  }

  // Logout
  const logout = async () => {
    setLoading(true)
    // Clear JWT cookie from backend
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      )
    } catch (error) {
      console.error("Logout error:", error)
    }
    return signOut(auth)
  }

  // Observer for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("🔥 Firebase currentUser:", {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        })

        try {
          // Get JWT token from backend and store user data
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/jwt`,
            {
              email: currentUser.email,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            { withCredentials: true }
          )

          console.log("📦 Backend response data.user:", data.user)

          // Ensure photoURL is always set from Firebase if not in backend response
          const userData = {
            ...data.user,
            photoURL: data.user.photoURL || currentUser.photoURL,
            name: data.user.name || currentUser.displayName,
          }

          console.log("✅ Final userData set to state:", userData)
          setUser(userData)

          // Show role modal if user doesn't have a role (OAuth users)
          if (!userData.role || userData.role === "undefined") {
            setShowRoleModal(true)
          }
        } catch (error) {
          console.error("JWT fetch error:", error)
          setUser(null)
        }
      } else {
        setUser(null)
        setShowRoleModal(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const authInfo = {
    user,
    loading,
    register,
    login,
    googleLogin,
    githubLogin,
    updateUserProfile,
    logout,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      {showRoleModal && (
        <RoleSelectionModal onRoleSelected={handleRoleSelected} />
      )}
    </AuthContext.Provider>
  )
}

export default AuthProvider
