import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import MainLayout from "./layouts/MainLayout"
import AllLoans from "./pages/AllLoans"
import ApplyLoan from "./pages/ApplyLoan"
import Home from "./pages/Home"
import LoanDetails from "./pages/LoanDetails"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import DashboardHome from "./pages/dashboard/DashboardHome"
import MyLoans from "./pages/dashboard/MyLoans"
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

          {/* TODO: Add more public pages */}
          {/* <Route path="about" element={<AboutUs />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
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
          {/* <Route path="profile" element={<BorrowerProfile />} /> */}

          {/* Admin Routes */}
          {/* <Route path="manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} /> */}
          {/* <Route path="all-loans" element={<AdminRoute><AdminAllLoans /></AdminRoute>} /> */}
          {/* <Route path="loan-applications" element={<AdminRoute><LoanApplications /></AdminRoute>} /> */}

          {/* Manager Routes */}
          {/* <Route path="add-loan" element={<ManagerRoute><AddLoan /></ManagerRoute>} /> */}
          {/* <Route path="manage-loans" element={<ManagerRoute><ManageLoans /></ManagerRoute>} /> */}
          {/* <Route path="pending-loans" element={<ManagerRoute><PendingLoans /></ManagerRoute>} /> */}
          {/* <Route path="approved-loans" element={<ManagerRoute><ApprovedLoans /></ManagerRoute>} /> */}
          {/* <Route path="profile" element={<ManagerRoute><ManagerProfile /></ManagerRoute>} /> */}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
