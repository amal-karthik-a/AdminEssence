import React from "react";
import { Link } from "react-router-dom";
import "./SettingsGrid.css";

const ProfileSettings = () => {
  return (
    <div className="settings-container">
      <div className="operation-container">
        <h2 className="operation-title">Profile Settings</h2>
        <div className="operation-content">
          <p>Here you can manage your personal information and account details.</p>
          <p>Features to be implemented:</p>
          <ul>
            <li>Update name and email</li>
            <li>Change profile picture</li>
            <li>Manage account preferences</li>
          </ul>
        </div>
        <Link to="/" className="back-link">← Back to Settings</Link>
      </div>
    </div>
  );
};

export default ProfileSettings;