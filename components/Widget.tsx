import React from 'react';
import '../Styles/Dashboard.css';

interface WidgetProps {
  title: string;
  value: string;
}

const Widget: React.FC<WidgetProps> = ({ title, value }) => (
  <div className="widget">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default Widget;
