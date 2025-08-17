import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { NewsItem } from '../Types/NewsItem';
import type { NewsArticle } from '../Types/NewsArticle';

import { mapNewsItemToArticle } from '../utils/transform';


const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [summaries, setSummaries] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchNews = async () => {
const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
      const data = await res.json();
      const mapped = data.articles.map((item: NewsItem) => mapNewsItemToArticle(item));
      setArticles(mapped);
    };

    fetchNews();
  }, []);

  const handleSave = (article:NewsArticle) => {
    console.log('Saving:', article);
  };

const handleSummarize = async (article: NewsArticle) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/news/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url: article.url }),
    });

    const data = await res.json();
    setSummaries(prev => ({ ...prev, [article.url]: data.summary }));
  } catch (err) {
    console.error('Summarization failed:', err);
  }
};


  return (
    <div className="news-list">
{articles.map((article, index) => (
  <NewsCard
    key={index}
    article={article}
    onSave={handleSave}
    onSummarize={handleSummarize}
    summary={summaries[article.url]} // 👈 Pass the summary here
  />
))}

    </div>
  );
};

export default NewsList;
