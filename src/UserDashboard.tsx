import React, { useEffect, useState } from 'react';
import { getSavedNews, getHistory } from './api/index';
import { NewsItem } from './Types/NewsItem';
import { NewsArticle } from './Types/NewsArticle';
import NewsCard from './components/NewsCard';
import './Styles/UserDashboard.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
  const [history, setHistory] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    getSavedNews().then(setSavedNews);
    getHistory().then(setHistory);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="user-dashboard-layout">
      <aside className="sidebar">
        <div className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={18} />
          <span>Back</span>
        </div>

        <div className="user-info">
          <h3>{user.name || 'Guest'}</h3>
          <p>{user.email || 'guest@example.com'}</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/dashboard')}>🏠 Home</li>
            <li onClick={handleLogout}>🔓 Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="user-dashboard">
        <div className="top-header">
          <span className="welcome-message">Welcome, {user.name || 'Guest'}</span>
        </div>

        <section className="intro-section">
          <p>Here’s a snapshot of your reading journey</p>
        </section>

        <section className="saved-section">
          <h2>📌 Saved Articles</h2>
          {savedNews.length ? (
            <div className="saved-grid">
              {savedNews.map((item, idx) => (
                <NewsCard
                  key={idx}
                  article={item as NewsArticle}
                  onSave={() => {}}
                  onSummarize={() => {
                    const summary = item.description
                      ? item.description.slice(0, 50) + '...'
                      : 'No summary available.';
                    alert(`Summary:\n${summary}`);
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="empty-message">You haven’t saved any articles yet.</p>
          )}
        </section>

        <section className="history-section">
          <h2>📖 Reading History</h2>
          {history.length ? (
            <ul className="history-list">
              {history.map((item, idx) => (
                <li key={idx} className="history-item">
                  <div className="history-title">
                    <strong>{item.title}</strong>
                    {item.source?.name && <span> — {item.source.name}</span>}
                  </div>
                  {item.description && <p>{item.description}</p>}
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Read again
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">No articles in your history yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
