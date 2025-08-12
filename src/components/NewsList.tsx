import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { NewsItem } from '../Types/NewsItem';
import type { NewsArticle } from '../Types/NewsArticle';

import { mapNewsItemToArticle } from '../utils/transform';


const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

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

  const handleSummarize = (article: NewsArticle) => {
    console.log('Summarizing:', article);
  };

  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
          onSave={handleSave}
          onSummarize={handleSummarize}
        />
      ))}
    </div>
  );
};

export default NewsList;
