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
