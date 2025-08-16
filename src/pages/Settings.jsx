import React from "react";
import { Settings, User, Shield, Bell, Database } from "lucide-react";
import "./../styles/Settings.css";

const SettingsGrid = () => {
  const settingsOptions = [
    {
      id: 1,
      title: "Profile Settings",
      description: "Manage your personal information and account details",
      icon: <User size={28} />,
      action: () => alert("Opening Profile Settings...")
    },
    {
      id: 2,
      title: "Security",
      description: "Change password, enable 2FA, and manage login devices",
      icon: <Shield size={28} />,
      action: () => alert("Opening Security Settings...")
    },
    {
      id: 3,
      title: "Notifications",
      description: "Customize email and push notification preferences",
      icon: <Bell size={28} />,
      action: () => alert("Opening Notification Settings...")
    },
    {
      id: 4,
      title: "Database",
      description: "Manage database connections and backups",
      icon: <Database size={28} />,
      action: () => alert("Opening Database Settings...")
    },
    {
      id: 5,
      title: "General",
      description: "Control theme, language, and default preferences",
      icon: <Settings size={28} />,
      action: () => alert("Opening General Settings...")
    }
  ];

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings Dashboard</h1>
      <div className="settings-grid">
        {settingsOptions.map((setting) => (
          <div
            key={setting.id}
            className="setting-card"
            onClick={setting.action}
          >
            <div className="setting-icon">{setting.icon}</div>
            <div className="setting-info">
              <h4>{setting.title}</h4>
              <p>{setting.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsGrid;