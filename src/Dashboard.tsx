import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Widget from './components/Widget';
import NewsCard from './components/NewsCard';
import './Styles/Dashboard.css';
import './Styles/UserDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewsArticle } from './Types/NewsArticle';
import { saveArticleToUser } from './api/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard: React.FC = () => {
  const [newsMetrics, setNewsMetrics] = useState({
    articlesToday: 'Loading...',
    categories: 'Loading...',
    sources: 'Loading...',
  });

  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const defaultUser = {
    id: 'demo-user',
    role: 'guest',
    interests: [],
  };

  const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(defaultUser));

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

        const mappedArticles: NewsArticle[] = rawArticles.map((item: any) => ({
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.urlToImage,
          source: { name: item.source?.name || 'Unknown' },
          summary: item.description,
          publishedAt: item.publishedAt,
        }));

        setArticles(mappedArticles);
        setNewsMetrics({
          articlesToday: rawArticles.length.toString(),
          categories: '7 active',
          sources: 'Multiple',
        });
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory, selectedCountry]);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const res = await axios.get(`/api/users/${user.id}/saved`);
        setSavedArticles(res.data.savedNews);
      } catch (err) {
        console.error('Error fetching saved articles:', err);
      }
    };

    fetchSavedArticles();
  }, []);

  const handleSave = async (article: NewsArticle) => {
    const userId = user.id;

    const formattedArticle = {
      ...article,
      source: { name: article.source?.name || 'Unknown' },
    };

    try {
      const status = await saveArticleToUser(userId, formattedArticle);

      switch (status) {
        case 'saved':
          toast.success('✅ Article saved!', { position: 'top-right', autoClose: 3000 });
          break;
        case 'duplicate':
          toast.info('ℹ️ Already saved.', { position: 'top-right', autoClose: 3000 });
          break;
        default:
          toast.error('❌ Failed to save article.', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('❌ Save failed due to network or server issue.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleSummarize = async (article: NewsArticle) => {
    const summary = article.description
      ? article.description.slice(0, 50) + '...'
      : 'No summary available.';
    alert(`Summary:\n${summary}`);
  };

const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  navigate('/dashboard'); // ✅ This triggers GuestDashboard via App.tsx
};


  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <button
        className={`hamburger-button ${sidebarVisible ? 'inside' : 'outside'}`}
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        ☰
      </button>

      <Sidebar
        visible={sidebarVisible}
        onToggle={() => setSidebarVisible(false)}
        handleLogout={handleLogout}
      />

      <div className={`main ${sidebarVisible ? '' : 'collapsed'}`}>
        <Header
        sidebarVisible={false}
        onToggleSidebar={() => {}}
        onSearch={setSearchTerm}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        />

        <div className="widgets">
          <Widget title="Articles Today" value={newsMetrics.articlesToday} />
          <Widget title="Active Categories" value={newsMetrics.categories} />
          <Widget title="News Sources" value={newsMetrics.sources} />
        </div>


        <div className="category-switcher">
          {user?.interests?.length > 0 ? (
            user.interests.map((cat: string) => (
              <button
                key={cat}
                className={cat === selectedCategory ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))
          ) : (
            <p>No interests found. Please update your profile.</p>
          )}
        </div>
        <h2>📰 Top Headlines</h2>
        <div className="news-feed">
          
          {filteredArticles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              onSave={handleSave}
              onSummarize={handleSummarize}
              onRead={() => window.open(article.url, '_blank')}
            />
          ))}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;
