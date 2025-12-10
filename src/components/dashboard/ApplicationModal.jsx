import React from "react";
import { FaCalendar } from "react-icons/fa";
import { StatusBadge } from "./index"

/**
 * Reusable ApplicationModal component for viewing loan application details
 * @param {Object} props
 * @param {Object} props.application - The application object
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onApprove - Optional approve handler
 * @param {Function} props.onReject - Optional reject handler
 * @param {boolean} props.showActions - Show approve/reject buttons
 */
const ApplicationModal = ({
  application,
  isOpen = false,
  onClose,
  onApprove,
  onReject,
  showActions = false,
}) => {
  if (!application) return null

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleApprove = () => {
    if (onApprove) onApprove(application._id)
  }

  const handleReject = () => {
    if (onReject) onReject(application._id)
  }

  return (
    <dialog
      id="view_application_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box max-w-4xl">
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Application Details</h3>

        <div className="space-y-4">
          {/* User Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="font-bold">Applicant Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-70">Name</p>
                  <p className="font-semibold">
                    {application.firstName} {application.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Email</p>
                  <p className="font-semibold">
                    {application.userId?.email || application.userEmail}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Contact Number</p>
                  <p className="font-semibold">{application.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">National ID</p>
                  <p className="font-semibold">{application.nationalId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="font-bold">Loan Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-70">Loan Title</p>
                  <p className="font-semibold">
                    {application.loanId?.title || application.loanTitle}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Category</p>
                  <p className="font-semibold">
                    {application.loanId?.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Requested Amount</p>
                  <p className="font-semibold text-primary text-lg">
                    ${application.loanAmount?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Interest Rate</p>
                  <p className="font-semibold">{application.interestRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="font-bold">Financial Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-70">Income Source</p>
                  <p className="font-semibold">{application.incomeSource}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Monthly Income</p>
                  <p className="font-semibold">
                    ${application.monthlyIncome?.toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm opacity-70">Reason for Loan</p>
                  <p className="font-semibold">{application.reason}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Notes */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="font-bold">Additional Information</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm opacity-70">Address</p>
                  <p>{application.address}</p>
                </div>
                {application.extraNotes && (
                  <div>
                    <p className="text-sm opacity-70">Extra Notes</p>
                    <p>{application.extraNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="font-bold">Status Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-70">Application Status</p>
                  <StatusBadge
                    status={application.status}
                    type="application"
                    className="py-4"
                  />
                </div>
                <div>
                  <p className="text-sm opacity-70">Fee Status</p>
                  <StatusBadge
                    status={application.applicationFeeStatus}
                    type="payment"
                    className="py-4"
                  />
                </div>
                <div>
                  <p className="text-sm opacity-70">Applied Date</p>
                  <p>{new Date(application.createdAt).toLocaleString()}</p>
                </div>
                {application.approvedAt && (
                  <div>
                    <p className="text-sm opacity-70">Approved Date</p>
                    <p className="flex items-center gap-2">
                      <FaCalendar className="text-success" />
                      {new Date(application.approvedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action">
          {/* Show approve/reject buttons only for pending applications */}
          {showActions && application.status === "pending" && (
            <>
              <button className="btn btn-success" onClick={handleApprove}>
                Approve
              </button>
              <button className="btn btn-error" onClick={handleReject}>
                Reject
              </button>
            </>
          )}
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ApplicationModal
