import React from "react";
import { Link } from "react-router-dom";
import "./SettingsGrid.css";

const GeneralSettings = () => {
  return (
    <div className="settings-container">
      <div className="operation-container">
        <h2 className="operation-title">General Settings</h2>
        <div className="operation-content">
          <p>Control general preferences here.</p>
          <p>Features to be implemented:</p>
          <ul>
            <li>Theme selection (light/dark)</li>
            <li>Language preferences</li>
            <li>Default settings</li>
          </ul>
        </div>
        <Link to="/" className="back-link">← Back to Settings</Link>
      </div>
    </div>
  );
};

export default GeneralSettings;