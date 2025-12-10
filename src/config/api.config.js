/**
 * API Configuration
 * Centralized API endpoint management
 */

const API_BASE_URL = import.meta.env.VITE_API_URL

export const API_ENDPOINTS = {
  // Authentication
  JWT: `${API_BASE_URL}/auth/jwt`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  UPDATE_PROFILE: `${API_BASE_URL}/auth/update-profile`,
  UPDATE_ROLE: `${API_BASE_URL}/auth/update-role`,

  // Loans
  LOANS: `${API_BASE_URL}/loans`,
  FEATURED_LOANS: `${API_BASE_URL}/loans/featured`,
  LOAN_BY_ID: (id) => `${API_BASE_URL}/loans/${id}`,

  // Applications
  MY_APPLICATIONS: `${API_BASE_URL}/applications/my-applications`,
  CANCEL_APPLICATION: (id) => `${API_BASE_URL}/applications/${id}/cancel`,
  APPROVE_APPLICATION: (id) => `${API_BASE_URL}/applications/${id}/approve`,
  REJECT_APPLICATION: (id) => `${API_BASE_URL}/applications/${id}/reject`,

  // Payments
  CREATE_CHECKOUT: `${API_BASE_URL}/payments/create-checkout-session`,
  PAYMENT_HISTORY: `${API_BASE_URL}/payments/history`,
  PAYMENT_RECEIPT: (sessionId) =>
    `${API_BASE_URL}/payments/receipt/${sessionId}`,
  PROCESS_SESSION: `${API_BASE_URL}/payments/process-session`,
  CREATE_INTENT: `${API_BASE_URL}/payments/create-intent`,

  // Dashboard
  DASHBOARD_STATS: `${API_BASE_URL}/dashboard/stats`,

  // Manager Endpoints
  MANAGER: {
    MY_LOANS: `${API_BASE_URL}/manager/my-loans`,
    LOANS: `${API_BASE_URL}/manager/loans`,
    LOAN_BY_ID: (id) => `${API_BASE_URL}/manager/loans/${id}`,
    PENDING_APPLICATIONS: `${API_BASE_URL}/manager/applications/pending`,
    APPROVED_APPLICATIONS: `${API_BASE_URL}/manager/applications/approved`,
    APPROVE_APPLICATION: (id) =>
      `${API_BASE_URL}/manager/applications/${id}/approve`,
    REJECT_APPLICATION: (id) =>
      `${API_BASE_URL}/manager/applications/${id}/reject`,
    BORROWERS: `${API_BASE_URL}/manager/borrowers`,
    SUSPEND_BORROWER: (id) => `${API_BASE_URL}/manager/borrowers/${id}/suspend`,
    UNSUSPEND_BORROWER: (id) =>
      `${API_BASE_URL}/manager/borrowers/${id}/unsuspend`,
  },

  // Admin Endpoints
  ADMIN: {
    USERS: `${API_BASE_URL}/admin/users`,
    UPDATE_ROLE: (id) => `${API_BASE_URL}/admin/users/${id}/role`,
    SUSPEND_USER: (id) => `${API_BASE_URL}/admin/users/${id}/suspend`,
    LOANS: `${API_BASE_URL}/admin/loans`,
    LOAN_BY_ID: (id) => `${API_BASE_URL}/admin/loans/${id}`,
    TOGGLE_SHOW_HOME: (id) => `${API_BASE_URL}/admin/loans/${id}/show-home`,
    APPLICATIONS: `${API_BASE_URL}/admin/applications`,
  },
}

// Payment Configuration
export const PAYMENT_CONFIG = {
  APPLICATION_FEE: 10, // USD
  CURRENCY: "USD",
  MIN_AMOUNT: 0.5,
}
