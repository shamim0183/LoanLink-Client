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
import { auth } from "../config/firebase.config"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
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

          setUser(data.user)
        } catch (error) {
          console.error("JWT fetch error:", error)
          setUser(null)
        }
      } else {
        setUser(null)
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
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
