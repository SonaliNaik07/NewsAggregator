import React, { useEffect, useState } from 'react';
import { getSavedNews, getHistory } from './api/index';
import { NewsItem } from './Types/NewsItem';
import { NewsArticle } from './Types/NewsArticle';
import NewsCard from './components/NewsCard';
import './Styles/UserDashboard.css';
import { FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Styles/Dashboard.css';
import { User } from './Types/User';

const UserDashboard: React.FC = () => {
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
  const [history, setHistory] = useState<NewsItem[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const rawUser = localStorage.getItem('user');
  const user: User | null = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    getSavedNews().then(setSavedNews);
    getHistory().then(setHistory);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userName = user?.name || '';
  const userEmail = user?.email || '';

  return (
    <div className="user-dashboard-layout">
      {/* Backdrop */}
      {sidebarVisible && (
        <div
          className="user-sidebar-backdrop visible"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* Hamburger Button */}
      {!sidebarVisible && (
        <button
          className="user-hamburger-button outside"
          onClick={() => setSidebarVisible(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`user-sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <div className="user-close-wrapper">
          <button
            className="user-close-button"
            onClick={() => setSidebarVisible(false)}
          >
            <FaTimes />
          </button>
        </div>

        <div className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={18} />
          <span>Back</span>
        </div>

        <div className="user-info">
          <h3>{userName}</h3>
          <p>{userEmail}</p>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-link" onClick={() => navigate('/dashboard')}>
            🏠 Home
          </button>
          <button className="sidebar-link" onClick={handleLogout}>
            🔓 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="user-dashboard">
        <div className="user-top-header">
          <span className="user-welcome-message">
            Welcome{userName ? `, ${userName}` : ''}
          </span>
        </div>

        <section className="user-intro-section">
          <p>Here’s a snapshot of your reading journey</p>
        </section>

        <section className="user-saved-section">
          <h2>Saved Articles</h2>
          {savedNews.length ? (
            <div className="user-saved-grid">
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
  onRead={() => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else {
      alert('No article URL available.');
    }
  }}
/>

              ))}
            </div>
          ) : (
            <p className="user-empty-message">You haven’t saved any articles yet.</p>
          )}
        </section>

        <section className="user-history-section">
          <h2>📖 Reading History</h2>
          {history.length ? (
            <ul className="user-history-list">
              {history.map((item, idx) => (
                <li key={idx} className="user-history-item">
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
            <p className="user-empty-message">No articles in your history yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
