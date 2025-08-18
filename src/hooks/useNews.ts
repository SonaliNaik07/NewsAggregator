// src/hooks/useNews.ts
import { useEffect, useState } from 'react';
import { NewsArticle } from '../Types/NewsArticle';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchNews = async () => {
    try {
const res = await fetch('/api/articles/personalized', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: user.interests }),
      });

      const data: NewsArticle[] = await res.json();
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
