import React from 'react';
import {
  Download,
  Eye,
  Plus,
  ShoppingCart,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DashboardContent = ({ stats, salesData, categoryData }) => {
  return (
    <div className="coco-dashboard-content-area">
      {/* Stats Cards */}
      <div className="coco-dashboard-stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`coco-dashboard-stat-card coco-dashboard-stat-${stat.color}`}
          >
            <div className="coco-dashboard-stat-icon mx-0 my-0">
              <stat.icon size={24} />
            </div>
            <div className="coco-dashboard-stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className="coco-dashboard-stat-change">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="coco-dashboard-charts-grid">
        <div className="coco-dashboard-chart-card">
          <div className="coco-dashboard-chart-header">
            <h3>Sales Overview</h3>
            <button className="coco-dashboard-chart-action">
              <Download size={16} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="coco-dashboard-chart-card">
          <div className="coco-dashboard-chart-header">
            <h3>Product Categories</h3>
            <button className="coco-dashboard-chart-action">
              <Eye size={16} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="coco-dashboard-activity-card">
        <h3>Recent Activity</h3>
        <div className="coco-dashboard-activity-list">
          <div className="coco-dashboard-activity-item">
            <div className="coco-dashboard-activity-icon coco-dashboard-activity-success">
              <Plus size={16} />
            </div>
            <div className="coco-dashboard-activity-content">
              <p>New product added</p>
              <span>2 minutes ago</span>
            </div>
          </div>
          <div className="coco-dashboard-activity-item">
            <div className="coco-dashboard-activity-icon coco-dashboard-activity-info">
              <ShoppingCart size={16} />
            </div>
            <div className="coco-dashboard-activity-content">
              <p>Order completed successfully</p>
              <span>15 minutes ago</span>
            </div>
          </div>
          <div className="coco-dashboard-activity-item">
            <div className="coco-dashboard-activity-icon coco-dashboard-activity-warning">
              <Activity size={16} />
            </div>
            <div className="coco-dashboard-activity-content">
              <p>Low stock alert</p>
              <span>1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;