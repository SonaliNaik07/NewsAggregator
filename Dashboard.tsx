import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Widget from './components/Widget';
import './styles/Dashboard.css';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [newsMetrics, setNewsMetrics] = useState({
    articlesToday: 'Loading...',
    categories: 'Loading...',
    sources: 'Loading...',
  });

  useEffect(() => {
    // Replace with your actual backend endpoint
    axios.get('http://localhost:5000/api/dashboard/overview', {
      headers: { 'x-user-role': 'editor' }
    })
    .then((res) => {
      setNewsMetrics({
        articlesToday: res.data.totalArticles,
        categories: res.data.activeCategories,
        sources: res.data.sourceCount,
      });
    })
    .catch((err) => {
      console.error('Error fetching dashboard data:', err);
    });
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="widgets">
          <Widget title="Articles Today" value={newsMetrics.articlesToday} />
          <Widget title="Active Categories" value={newsMetrics.categories} />
          <Widget title="News Sources" value={newsMetrics.sources} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
