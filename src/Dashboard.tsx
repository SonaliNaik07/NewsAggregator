import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Widget from './components/Widget';
import NewsCard from './components/NewsCard';
import './Styles/Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Article = {
  title: string;
  description: string;
  url: string;
  source?: { name?: string };
};

const Dashboard: React.FC = () => {
  const [newsMetrics, setNewsMetrics] = useState({
    articlesToday: 'Loading...',
    categories: 'Loading...',
    sources: 'Loading...',
  });

  const [selectedCategory, setSelectedCategory] = useState('general');
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  const defaultUser = {
    id: 'demo-user',
    role: 'guest',
    interests: ['general', 'technology', 'sports']
  };

  const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(defaultUser));
  
  const [sidebarVisible, setSidebarVisible] = useState(true);//sidebar visibility state


  // Comment out API calls if backend isn't ready
  /*
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

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news?category=${selectedCategory}`, {
      headers: { 'x-user-role': user.role }
    })
    .then((res) => setArticles(res.data))
    .catch((err) => console.error('News fetch error:', err));
  }, [selectedCategory]);
  */

  // Mock articles for now



  
  useEffect(() => {
    setArticles([
      {
        title: 'AI Revolution in 2025',
        description: 'Artificial Intelligence is transforming industries...',
        url: 'https://example.com/ai-news',
        source: { name: 'TechDaily' }
      },
      {
        title: 'Sports Highlights of the Week',
        description: 'Catch up on the biggest moments in sports...',
        url: 'https://example.com/sports-news',
        source: { name: 'SportsBuzz' }
      }
    ]);
  }, []);

  const handleSave = async (article: Article) => {
    alert('Saved to your dashboard (mock)');
  };

  const handleSummarize = async (article: Article) => {
    alert(`Summary:\n${article.description.slice(0, 50)}...`);
  };

  return (
    
    <div className="dashboard">
      
            {/* Sidebar with visibility toggle */}
<Sidebar visible={sidebarVisible} onToggle={() => setSidebarVisible((prev) => !prev)} />

      <button className="hamburger"
          onClick={() => setSidebarVisible((prev) => !prev)}
      >
           ☰
      </button>


      <div className="main">
        <Header />

        <div className="widgets">
          <Widget title="Articles Today" value={newsMetrics.articlesToday} />
          <Widget title="Active Categories" value={newsMetrics.categories} />
          <Widget title="News Sources" value={newsMetrics.sources} />
        </div>

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
