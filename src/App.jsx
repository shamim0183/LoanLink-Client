import React from "react"
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import LoadingScreen from "./components/shared/LoadingScreen"

// Hooks
import useAuth from "./hooks/useAuth"

// Layouts
import DashboardLayout from "./layouts/DashboardLayout"
import MainLayout from "./layouts/MainLayout"

// Main Pages
import {
  About,
  AllLoans,
  ApplyLoan,
  Contact,
  ForgotPassword,
  Home,
  LoanDetails,
  Login,
  NotFound,
  PaymentCancel,
  PaymentSuccess,
  Receipt,
  Register,
} from "./pages"

// Dashboard Pages
import {
  DashboardHome,
  MyLoans,
  PaymentHistory,
  Profile,
} from "./pages/dashboard"
import {
  AdminAddLoan,
  AdminAllLoans,
  LoanApplications,
  ManageUsers,
} from "./pages/dashboard/admin"
import {
  ApprovedApplications,
  ManageBorrowers,
  ManageLoans,
  ManagerAddLoan,
  PendingApplications,
} from "./pages/dashboard/manager"

// Route Guards
import AdminRoute from "./routes/AdminRoute"
import ManagerRoute from "./routes/ManagerRoute"
import PrivateRoute from "./routes/PrivateRoute"

function App() {
  const { loading } = useAuth()
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // Ensure loading screen shows for at least 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 300) // Reduced to prevent flash of login/register buttons

    return () => clearTimeout(timer)
  }, [])

  // Show loading screen while auth is initializing OR if minimum time hasn't elapsed
  if (loading || !minTimeElapsed) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="all-loans" element={<AllLoans />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="loan-details/:id"
            element={
              <PrivateRoute>
                <LoanDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="apply-loan/:id"
            element={
              <PrivateRoute>
                <ApplyLoan />
              </PrivateRoute>
            }
          />
          <Route
            path="payment-success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="payment-cancel"
            element={
              <PrivateRoute>
                <PaymentCancel />
              </PrivateRoute>
            }
          />
          <Route
            path="receipt/:applicationId"
            element={
              <PrivateRoute>
                <Receipt />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Protected Routes - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          {/* Borrower Routes */}
          <Route path="borrower/my-loans" element={<MyLoans />} />
          <Route path="borrower/payment-history" element={<PaymentHistory />} />
          <Route path="borrower/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route
            path="admin/manage-users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="admin/all-loans"
            element={
              <AdminRoute>
                <AdminAllLoans />
              </AdminRoute>
            }
          />
          <Route
            path="admin/loan-applications"
            element={
              <AdminRoute>
                <LoanApplications />
              </AdminRoute>
            }
          />
          <Route
            path="admin/add-loan"
            element={
              <AdminRoute>
                <AdminAddLoan />
              </AdminRoute>
            }
          />
          <Route
            path="admin/profile"
            element={
              <AdminRoute>
                <Profile />
              </AdminRoute>
            }
          />

          {/* Manager Routes */}
          <Route
            path="manager/add-loan"
            element={
              <ManagerRoute>
                <ManagerAddLoan />
              </ManagerRoute>
            }
          />
          <Route
            path="manager/manage-loans"
            element={
              <ManagerRoute>
                <ManageLoans />
              </ManagerRoute>
            }
          />
          <Route
            path="manager/pending-applications"
            element={
              <ManagerRoute>
                <PendingApplications />
              </ManagerRoute>
            }
          />
          <Route
            path="manager/approved-applications"
            element={
              <ManagerRoute>
                <ApprovedApplications />
              </ManagerRoute>
            }
          />
          <Route
            path="manager/manage-borrowers"
            element={
              <ManagerRoute>
                <ManageBorrowers />
              </ManagerRoute>
            }
          />
          <Route
            path="manager/profile"
            element={
              <ManagerRoute>
                <Profile />
              </ManagerRoute>
            }
          />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
