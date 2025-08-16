import React from 'react';
import { Menu, Search, Bell, Users } from 'lucide-react';

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="coco-dashboard-header">
      <div className="coco-dashboard-header-left">
        <button
          className="coco-dashboard-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </button>
        <div className="coco-dashboard-search-bar">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="coco-dashboard-header-right">
        <button className="coco-dashboard-notification-btn">
          <Bell size={20} />
          <span className="coco-dashboard-notification-badge">3</span>
        </button>

        <div className="coco-dashboard-user-profile">
          <div className="coco-dashboard-user-avatar">
            <Users size={16} />
          </div>
          <div className="coco-dashboard-user-info">
            <span>Admin User</span>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;