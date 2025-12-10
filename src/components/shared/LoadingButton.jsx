import React from "react"
import PropTypes from "prop-types"

const LoadingButton = ({
  loading = false,
  children,
  className = "",
  loadingText = null,
  ...props
}) => {
  return (
    <button disabled={loading} className={`btn ${className}`} {...props}>
      {loading ? (
        <>
          <span className="loading loading-spinner"></span>
          {loadingText && <span className="ml-2">{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  )
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  loadingText: PropTypes.string,
}

export default LoadingButton
