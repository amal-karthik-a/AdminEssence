import React from "react";
import { Link } from "react-router-dom";
import "./SettingsGrid.css";

const DatabaseSettings = () => {
  return (
    <div className="settings-container">
      <div className="operation-container">
        <h2 className="operation-title">Database Settings</h2>
        <div className="operation-content">
          <p>Manage your database connections and backups here.</p>
          <p>Features to be implemented:</p>
          <ul>
            <li>Configure database connections</li>
            <li>Schedule backups</li>
            <li>Restore from backups</li>
          </ul>
        </div>
        <Link to="/" className="back-link">← Back to Settings</Link>
      </div>
    </div>
  );
};

export default DatabaseSettings;