import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Widget from './components/Widget';
import NewsCard from './components/NewsCard';
import './Styles/Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the article type for type safety
type Article = {
  title: string;
  description: string;
  url: string;
  source?: { name?: string };
};

const Dashboard: React.FC = () => {
  // 🧮 State to store metrics shown in widgets
  const [newsMetrics, setNewsMetrics] = useState({
    articlesToday: 'Loading...',
    categories: 'Loading...',
    sources: 'Loading...',
  });


 

  // 📌 State to track which news category is selected
  const [selectedCategory, setSelectedCategory] = useState('general');

  // 🗞️ State to hold fetched articles
  const [articles, setArticles] = useState<Article[]>([]);

  const navigate = useNavigate();

  // 👤 Retrieve user details from localStorage (includes role & interests)
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // 📊 Fetch dashboard metrics based on user role
  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard/overview', {
      headers: { 'x-user-role': user.role }
    })
    .then((res) => {
      setNewsMetrics({
        articlesToday: res.data.totalArticles,
        categories: res.data.activeCategories,
        sources: res.data.sourceCount,
      });
    })
    .catch((err) => {
      console.error('Dashboard metrics error:', err);
    });
  }, []);

  // 📰 Fetch articles based on selected category and user role
  useEffect(() => {
    axios.get(`http://localhost:5000/api/news?category=${selectedCategory}`, {
      headers: { 'x-user-role': user.role }
    })
    .then((res) => setArticles(res.data))
    .catch((err) => console.error('News fetch error:', err));
  }, [selectedCategory]);

  // 💾 Save an article to user's dashboard
  const handleSave = async (article: Article) => {
    try {
      await axios.post('http://localhost:5000/api/user/save-news', {
        userId: user.id,
        article
      });
      alert('Saved to your dashboard');
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  // 📚 Summarize an article's description
  const handleSummarize = async (article: Article) => {
    try {
      const res = await axios.post('http://localhost:5000/api/summarize', {
        content: article.description
      });
      alert(`Summary:\n${res.data.summary}`);
    } catch (err) {
      console.error('Summarize error:', err);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Header />

        {/* 👤 Avatar that navigates to user dashboard */}
        <div className="user-avatar" onClick={() => navigate('/user-dashboard')}>
          <img src="/assets/user-icon.png" alt="User" />
        </div>

        {/* 📈 Display news metrics in widget blocks */}
        <div className="widgets">
          <Widget title="Articles Today" value={newsMetrics.articlesToday} />
          <Widget title="Active Categories" value={newsMetrics.categories} />
          <Widget title="News Sources" value={newsMetrics.sources} />
        </div>

        {/* 🧭 Category selection based on user interests */}
        <div className="category-switcher">
          {user.interests.map((cat: string) => (
            <button
              key={cat}
              className={cat === selectedCategory ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* 🗞️ News feed showing articles with save and summarize options */}
        <div className="news-feed">
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              onSave={handleSave}
              onSummarize={handleSummarize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
