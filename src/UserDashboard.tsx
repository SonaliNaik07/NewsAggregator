import React, { useEffect, useState } from 'react';
import { getSavedNews, getHistory } from './api/index';
import { NewsItem } from './Types/NewsItem';
import './Styles/UserDashboard.css';

const UserDashboard = () => {
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
  const [history, setHistory] = useState<NewsItem[]>([]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

useEffect(() => {
  if (user?.id) {
    getSavedNews(user.id).then(setSavedNews);
    getHistory(user.id).then(setHistory);
  }
}, [user?.id]);


  return (
    <div className="user-dashboard">
      <h2>Your Saved Articles</h2>
      {savedNews.length ? (
        savedNews.map((item, idx) => (
          <div key={idx} className="news-item">
            <strong>{item.title}</strong>
            {item.source?.name && <span> — {item.source.name}</span>}
            {item.description && <p>{item.description}</p>}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No saved articles found.</p>
      )}

      <h2>Reading History</h2>
      {history.length ? (
        history.map((item, idx) => (
          <div key={idx} className="news-item">
            <strong>{item.title}</strong>
            {item.source?.name && <span> — {item.source.name}</span>}
            {item.description && <p>{item.description}</p>}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read again
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default UserDashboard;
