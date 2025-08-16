import React from "react";
import { Link } from "react-router-dom";
import "./SettingsGrid.css";

const NotificationsSettings = () => {
  return (
    <div className="settings-container">
      <div className="operation-container">
        <h2 className="operation-title">Notifications Settings</h2>
        <div className="operation-content">
          <p>Customize your notification preferences here.</p>
          <p>Features to be implemented:</p>
          <ul>
            <li>Email notification settings</li>
            <li>Push notification settings</li>
            <li>Notification frequency preferences</li>
          </ul>
        </div>
        <Link to="/" className="back-link">← Back to Settings</Link>
      </div>
    </div>
  );
};

export default NotificationsSettings;