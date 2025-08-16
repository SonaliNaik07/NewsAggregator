import { useEffect, useState } from 'react';

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news/personalized', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: user.interests }),
      });
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error('Failed to fetch personalized news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { articles, loading };
};
