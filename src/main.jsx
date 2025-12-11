import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App.jsx"
import AuthProvider from "./contexts/AuthContext"
import "./index.css"

// Initialize theme BEFORE React renders to prevent flash of wrong theme on loading screen
const savedTheme = localStorage.getItem("theme") || "loanlink"
document.documentElement.setAttribute("data-theme", savedTheme)

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </StrictMode>
)
