import { useState, useEffect } from "react"
import NetworkError from "./../components/NoInternetPopup"
import "./../styles/StatusDemo.css"

export default function NetworkStatusDemo() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleRetry = async () => {
    // Simulate network check
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // For demo purposes, randomly succeed or fail
    const success = Math.random() > 0.3
    if (success) {
      setIsOnline(true)
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-content">
        <h1 className="demo-title">Network Error Component Demo</h1>
        <p className="demo-description">
          This demonstrates the network error component with green, white, and red theme.
        </p>

        <div className="demo-controls">
          <button onClick={() => setIsOnline(false)} className="demo-btn demo-btn-offline">
            Simulate Offline
          </button>
          <button onClick={() => setIsOnline(true)} className="demo-btn demo-btn-online">
            Go Online
          </button>
        </div>

        <div className="demo-status">
          <div className={`demo-status-indicator ${isOnline ? "demo-status-online" : "demo-status-offline"}`}>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      <NetworkError isOnline={isOnline} onRetry={handleRetry} />
    </div>
  )
}