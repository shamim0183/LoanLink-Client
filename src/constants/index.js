/**
 * Application Constants
 * Centralized constants to avoid hardcoded strings
 */

// Error Messages
export const ERROR_MESSAGES = {
  // Authentication
  LOGIN_FAILED: "Login failed. Please try again.",
  REGISTRATION_FAILED: "Registration failed. Please try again.",
  GOOGLE_LOGIN_FAILED: "Google login failed.",
  GITHUB_LOGIN_FAILED: "GitHub login failed.",
  GOOGLE_SIGNUP_FAILED: "Google signup failed.",
  GITHUB_SIGNUP_FAILED: "GitHub signup failed.",

  // Image Upload
  INVALID_IMAGE_FILE: "Please select an image file",
  IMAGE_TOO_LARGE: "Image size should be less than 5MB",
  IMAGE_UPLOAD_FAILED: "Failed to upload image",

  // Loan Operations
  LOAN_LOAD_FAILED: "Failed to load loan details. Please try again.",
  LOAN_CREATE_FAILED: "Failed to create loan",
  LOAN_DELETE_FAILED: "Failed to delete loan",
  LOAN_UPDATE_FAILED: "Failed to update loan",
  LOAN_VISIBILITY_UPDATE_FAILED: "Failed to update loan visibility",

  // Application Operations
  APPLICATION_APPROVE_FAILED: "Failed to approve",
  APPLICATION_REJECT_FAILED: "Failed to reject",

  // Payment
  PAYMENT_FAILED: "Payment failed",
  PAYMENT_PROCESSING_FAILED: "Failed to initiate payment. Please try again.",
  PAYMENT_DETAILS_LOAD_FAILED: "Failed to load payment details",
  INVALID_PAYMENT_SESSION: "Invalid payment session",
  RECEIPT_LOAD_FAILED: "Failed to load receipt",
  RECEIPT_DOWNLOAD_FAILED: "Failed to download receipt",
  PRINT_DIALOG_FAILED: "Failed to open print dialog",

  // User Management
  PROFILE_UPDATE_FAILED: "Failed to update profile",
  USER_ROLE_UPDATE_FAILED: "Failed to update user role",
  USER_SUSPEND_FAILED: "Failed to suspend user",
  USER_UNSUSPEND_FAILED: "Failed to unsuspend user",
  BORROWER_SUSPEND_FAILED: "Failed to suspend borrower",
  BORROWER_UNSUSPEND_FAILED: "Failed to unsuspend borrower",

  // Validation
  SUSPENSION_REASON_REQUIRED: "Please provide a reason for suspension",
  SUSPENSION_DURATION_REQUIRED: "Please provide a valid duration",
  LOGIN_REQUIRED: "Please login to apply for a loan",
  ADMINS_CANNOT_APPLY: "Admins and Managers cannot apply for loans",
  SUSPENDED_CANNOT_APPLY: "Cannot apply while your account is suspended",
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  REGISTRATION_SUCCESS: "Registration successful!",
  PROFILE_UPDATE_SUCCESS: "Profile updated successfully",
  LOAN_CREATED: "Loan created successfully",
  LOAN_DELETED: "Loan deleted successfully",
  LOAN_UPDATED: "Loan updated successfully",
  APPLICATION_APPROVED: "Application approved successfully",
  APPLICATION_REJECTED: "Application rejected successfully",
  USER_ROLE_UPDATED: "User role updated successfully",
  USER_SUSPENDED: "User suspended successfully",
  USER_UNSUSPENDED: "User unsuspended successfully",
  IMAGE_UPLOADED: "Image uploaded successfully!",
}

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  BORROWER: "borrower",
}

// Loan Status
export const LOAN_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
}

// Payment Status
export const PAYMENT_STATUS = {
  COMPLETED: "completed",
  PENDING: "pending",
  FAILED: "failed",
}

// Image Constraints
export const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
}
