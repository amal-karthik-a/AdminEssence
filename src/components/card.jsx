import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const C = () => {
  return (
    <div className="coco-dashboard-analytics-content">
      <h2>Analytics Dashboard</h2>
      <div className="coco-dashboard-analytics-grid"></div>
    </div>
  )
}
export default C;