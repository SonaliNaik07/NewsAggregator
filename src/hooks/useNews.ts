import { useState, useEffect } from 'react';

interface NewsArticle {
  title: string;
  url: string;
  description?: string;
  urlToImage?: string;
  source?: { name: string };
}

export function useNews(country: string = 'in') {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      try {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`);
        const data = await res.json();
        setArticles(data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country]);

  return { articles, loading };
}
