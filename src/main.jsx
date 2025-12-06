import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import App from "./App.jsx"
import AuthProvider from "./contexts/AuthContext"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1A1A2E",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#28A745",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#DC3545",
              secondary: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>
)
