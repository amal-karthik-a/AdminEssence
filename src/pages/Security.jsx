import React from "react";
import { Link } from "react-router-dom";
import "./SettingsGrid.css";

const SecuritySettings = () => {
  return (
    <div className="settings-container">
      <div className="operation-container">
        <h2 className="operation-title">Security Settings</h2>
        <div className="operation-content">
          <p>Manage your security settings here.</p>
          <p>Features to be implemented:</p>
          <ul>
            <li>Change password</li>
            <li>Enable two-factor authentication (2FA)</li>
            <li>Manage active login devices</li>
          </ul>
        </div>
        <Link to="/" className="back-link">← Back to Settings</Link>
      </div>
    </div>
  );
};

export default SecuritySettings;