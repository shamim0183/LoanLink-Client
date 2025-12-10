import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoadingScreen from "./components/shared/LoadingScreen"
import useAuth from "./hooks/useAuth"
import DashboardLayout from "./layouts/DashboardLayout"
import MainLayout from "./layouts/MainLayout"
import About from "./pages/About"
import AllLoans from "./pages/AllLoans"
import ApplyLoan from "./pages/ApplyLoan"
import Contact from "./pages/Contact"
import AdminAddLoan from "./pages/dashboard/admin/AddLoan"
import AdminAllLoans from "./pages/dashboard/admin/AllLoans"
import LoanApplications from "./pages/dashboard/admin/LoanApplications"
import ManageUsers from "./pages/dashboard/admin/ManageUsers"
import DashboardHome from "./pages/dashboard/DashboardHome"
import AddLoan from "./pages/dashboard/manager/AddLoan"
import ApprovedApplications from "./pages/dashboard/manager/ApprovedApplications"
import ManageBorrowers from "./pages/dashboard/manager/ManageBorrowers"
import ManageLoans from "./pages/dashboard/manager/ManageLoans"
import PendingApplications from "./pages/dashboard/manager/PendingApplications"
import MyLoans from "./pages/dashboard/MyLoans"
import PaymentHistory from "./pages/dashboard/PaymentHistory"
import Profile from "./pages/dashboard/Profile"
import Home from "./pages/Home"
import LoanDetails from "./pages/LoanDetails"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import PaymentCancel from "./pages/PaymentCancel"
import PaymentSuccess from "./pages/PaymentSuccess"
import Receipt from "./pages/Receipt"
import Register from "./pages/Register"
import AdminRoute from "./routes/AdminRoute"
import ManagerRoute from "./routes/ManagerRoute"
import PrivateRoute from "./routes/PrivateRoute"
import ForgotPassword from "./pages/ForgotPassword";

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
          <Route path="my-loans" element={<MyLoans />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route
            path="manage-users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="all-loans"
            element={
              <AdminRoute>
                <AdminAllLoans />
              </AdminRoute>
            }
          />
          <Route
            path="loan-applications"
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

          {/* Manager Routes */}
          <Route
            path="add-loan"
            element={
              <ManagerRoute>
                <AddLoan />
              </ManagerRoute>
            }
          />
          <Route
            path="manage-loans"
            element={
              <ManagerRoute>
                <ManageLoans />
              </ManagerRoute>
            }
          />
          <Route
            path="pending-applications"
            element={
              <ManagerRoute>
                <PendingApplications />
              </ManagerRoute>
            }
          />
          <Route
            path="approved-applications"
            element={
              <ManagerRoute>
                <ApprovedApplications />
              </ManagerRoute>
            }
          />
          <Route
            path="manage-borrowers"
            element={
              <ManagerRoute>
                <ManageBorrowers />
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
