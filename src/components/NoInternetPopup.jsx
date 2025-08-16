"use client"

import { useState, useEffect } from "react"
import { WifiOff, RefreshCw, AlertTriangle } from "lucide-react"
import "./../styles/NoInternetPopup.css"

export default function NetworkError({ isOnline = true, onRetry }) {
  const [showError, setShowError] = useState(!isOnline)
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    setShowError(!isOnline)
  }, [isOnline])

  const handleRetry = async () => {
    setIsRetrying(true)
    if (onRetry) {
      await onRetry()
    }
    setTimeout(() => {
      setIsRetrying(false)
    }, 2000)
  }

  if (!showError) return null

  return (
    <div className="network-error-overlay">
      <div className="network-error-container">
        <div className="network-error-card">
          <div className="network-error-header">
            <div className="network-error-header-content">
              <div className="network-error-icon-wrapper">
                <WifiOff className="network-error-wifi-icon" />
              </div>
              <div>
                <h2 className="network-error-title">Connection Lost</h2>
                <p className="network-error-subtitle">Unable to connect to the internet</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="network-error-content">
            <div className="network-error-message">
              <div className="network-error-alert-icon-wrapper">
                <AlertTriangle className="network-error-alert-icon" />
              </div>
              <p className="network-error-description">Please check your internet connection and try again.</p>
            </div>

            {/* Status indicators */}
            <div className="network-error-status">
              <div className="network-error-status-item">
                <div className="network-error-status-left">
                  <div className="network-error-dot network-error-dot-red"></div>
                  <span className="network-error-status-label">Network Status</span>
                </div>
                <span className="network-error-status-value network-error-status-offline">Offline</span>
              </div>

              <div className="network-error-status-item">
                <div className="network-error-status-left">
                  <div className="network-error-dot network-error-dot-yellow"></div>
                  <span className="network-error-status-label">Connection Type</span>
                </div>
                <span className="network-error-status-value">Unknown</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="network-error-actions">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className={`network-error-retry-btn ${isRetrying ? "network-error-retry-btn-loading" : ""}`}
              >
                <RefreshCw className={`network-error-refresh-icon ${isRetrying ? "network-error-spin" : ""}`} />
                {isRetrying ? "Retrying..." : "Try Again"}
              </button>

              <button onClick={() => setShowError(false)} className="network-error-dismiss-btn">
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="network-error-decoration network-error-decoration-top"></div>
        <div className="network-error-decoration network-error-decoration-bottom"></div>
      </div>
    </div>
  )
}
