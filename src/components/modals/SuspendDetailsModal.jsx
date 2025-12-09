import React from "react"
import Countdown from "react-countdown"

const SuspendDetailsModal = ({
  isOpen,
  onClose,
  suspensionReason,
  suspendUntil,
}) => {
  if (!isOpen) return null

  // Countdown renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="text-success text-xl font-bold">
          Suspension Expired!
        </span>
      )
    } else {
      return (
        <div className="text-error text-2xl font-bold">
          {days > 0 && <span>{days}d </span>}
          {hours}h {minutes}m {seconds}s
        </div>
      )
    }
  }

  return (
    <div className="modal modal-open modal-middle h-screen">
      <div className="modal-box max-w-md relative">
        <h3 className="font-bold text-2xl mb-4">Account Suspended</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm opacity-70 mb-1">Reason:</p>
            <p className="text-lg">
              {suspensionReason || "No reason provided"}
            </p>
          </div>

          {suspendUntil && (
            <div>
              <p className="text-sm opacity-70 mb-2">Time Remaining:</p>
              <Countdown date={new Date(suspendUntil)} renderer={renderer} />
              <p className="text-sm opacity-70 mt-2">
                Suspended until: {new Date(suspendUntil).toLocaleString()}
              </p>
            </div>
          )}

          {!suspendUntil && (
            <div className="alert alert-error">
              <span>Your account has been permanently suspended.</span>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-black/50">
        <button onClick={onClose}>close</button>
      </form>
    </div>
  )
}

export default SuspendDetailsModal
