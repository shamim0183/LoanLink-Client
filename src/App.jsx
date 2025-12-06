import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import MainLayout from "./layouts/MainLayout"
import About from "./pages/About"
import AllLoans from "./pages/AllLoans"
import ApplyLoan from "./pages/ApplyLoan"
import Contact from "./pages/Contact"
import AdminAllLoans from "./pages/dashboard/admin/AllLoans"
import LoanApplications from "./pages/dashboard/admin/LoanApplications"
import ManageUsers from "./pages/dashboard/admin/ManageUsers"
import DashboardHome from "./pages/dashboard/DashboardHome"
import AddLoan from "./pages/dashboard/manager/AddLoan"
import ApprovedApplications from "./pages/dashboard/manager/ApprovedApplications"
import ManageLoans from "./pages/dashboard/manager/ManageLoans"
import PendingApplications from "./pages/dashboard/manager/PendingApplications"
import MyLoans from "./pages/dashboard/MyLoans"
import Home from "./pages/Home"
import LoanDetails from "./pages/LoanDetails"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import AdminRoute from "./routes/AdminRoute"
import ManagerRoute from "./routes/ManagerRoute"
import PrivateRoute from "./routes/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
