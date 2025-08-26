import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewsCard from './components/NewsCard';
import Header from './components/Header';
import Widget from './components/Widget';
import { NewsArticle } from './Types/NewsArticle';
import './Styles/Dashboard.css';

const GuestDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [searchTerm, setSearchTerm] = useState('');
  const [newsMetrics, setNewsMetrics] = useState({
    articlesToday: 'Loading...',
    categories: '7 active',
    sources: 'Multiple',
  });

  const allCategories = ['general', 'technology', 'sports', 'health', 'science', 'business', 'entertainment'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            category: selectedCategory,
            country: selectedCountry,
            pageSize: 10,
            apiKey: 'fde901c97416462896c9dbad77cb93ac',
          },
        });

        const rawArticles = response.data.articles;

        const mappedArticles: NewsArticle[] = rawArticles
          .filter((item: any) => item.title && item.url)
          .map((item: any) => ({
            title: item.title,
            description: item.description,
            url: item.url,
            urlToImage: item.urlToImage,
            source: { name: item.source?.name || 'Unknown' },
            summary: item.description,
            publishedAt: item.publishedAt,
          }));

        setArticles(mappedArticles);
        setNewsMetrics(prev => ({
          ...prev,
          articlesToday: rawArticles.length.toString(),
        }));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory, selectedCountry]);

  const handleCategoryClick = (category: string) => {
    navigate('/login'); // Guests must log in to change category
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard"> {/* ✅ Use same layout class as Dashboard */}
      <div className="main">
        <Header
         sidebarVisible={false}
          onToggleSidebar={() => {}}
          onSearch={setSearchTerm}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          showAuthButtons={true} // 👈 Add this line
        />

        {/* ✅ Metrics Widgets */}
        <div className="widgets">
          <Widget title="Articles Today" value={newsMetrics.articlesToday} />
          <Widget title="Active Categories" value={newsMetrics.categories} />
          <Widget title="News Sources" value={newsMetrics.sources} />
        </div>

        <div className="category-switcher">
          {allCategories.map(cat => (
            <button
              key={cat}
              className={cat === selectedCategory ? 'active' : ''}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <h2>📰 Top Headlines</h2>
        <div className="news-feed">
          
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                onSave={() => {}}
                onSummarize={() => {}}
                onRead={() => navigate('/login')}
              />
            ))
          ) : (
            <p>Loading news articles...</p>
          )}
        </div>

        <footer className="dashboard-footer">
          <h3>💬 Feedback</h3>
          <form
            className="feedback-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for your feedback!');
            }}
          >
            <textarea
              placeholder="Share your thoughts..."
              rows={4}
              required
            />
            <button type="submit">Submit Feedback</button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default GuestDashboard;
