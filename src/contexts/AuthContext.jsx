import React from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
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

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const githubLogin = () => {
    const provider = new GithubAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const updateUserProfile = async (name, photoURL) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
    // Force reload to sync Firebase state with updated profile
    await auth.currentUser.reload()
  }

  /**
   * Called after OAuth user selects their role in the modal
   * Refreshes user data from backend to get the updated role
   */
  const handleRoleSelected = async (role) => {
    try {
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

  /**
   * Logout user from both Firebase and backend
   * Clears JWT cookie and signs out of Firebase
   */
  const logout = async () => {
    setLoading(true)
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

  /**
   * Firebase auth state observer - syncs Firebase auth with backend
   * - Gets JWT token from backend
   * - Syncs user data between Firebase and MongoDB
   * - Shows role selection modal for OAuth users without roles
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/jwt`,
            {
              email: currentUser.email,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL,
              uid: currentUser.uid, // GitHub users might not have public email
            },
            { withCredentials: true }
          )

          // Prefer backend data (has role), fallback to Firebase for photo/name
          const userData = {
            ...data.user,
            photoURL: data.user.photoURL || currentUser.photoURL,
            name: data.user.name || currentUser.displayName,
          }

          setUser(userData)

          // OAuth users need to select role on first login
          // Email/password users already did this during registration
          const isOAuthUser = currentUser.providerData?.some(
            (provider) =>
              provider.providerId === "google.com" ||
              provider.providerId === "github.com"
          )
          if (
            isOAuthUser &&
            (!userData.role || userData.role === "undefined")
          ) {
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
    resetPassword,
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
