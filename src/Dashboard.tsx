import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Widget from './components/Widget';
import NewsCard from './components/NewsCard';
import './Styles/Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewsArticle } from './Types/NewsArticle'; // ✅ Use shared type

const Dashboard: React.FC = () => {
  const [newsMetrics, setNewsMetrics] = useState({
    articlesToday: 'Loading...',
    categories: 'Loading...',
    sources: 'Loading...',
  });

  const [selectedCategory, setSelectedCategory] = useState('general');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const defaultUser = {
    id: 'demo-user',
    role: 'guest',
    interests: ['general', 'technology', 'sports']
  };

  const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(defaultUser));
  const [sidebarVisible, setSidebarVisible] = useState(true);

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

  const handleSave = async (article: NewsArticle) => {
    alert('Saved to your dashboard (mock)');
  };

  const handleSummarize = async (article: NewsArticle) => {
    const summary = article.description
      ? article.description.slice(0, 50) + '...'
      : 'No summary available.';
    alert(`Summary:\n${summary}`);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar visible={sidebarVisible} onToggle={() => setSidebarVisible(false)} />

      <div className="main" style={{ marginLeft: sidebarVisible ? '220px' : '0' }}>
        <Header
          onToggleSidebar={() => setSidebarVisible(true)}
          onSearch={setSearchTerm}
        />

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
          {filteredArticles.map((article, index) => (
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
