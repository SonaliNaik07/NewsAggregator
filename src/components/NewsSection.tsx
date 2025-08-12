import React from 'react';
import NewsCard from './NewsCard';
import type { NewsArticle } from '../Types/NewsArticle';

interface Props {
  title: string;
  articles: NewsArticle[];
  onSave: (article: NewsArticle) => void;
  onSummarize: (article: NewsArticle) => void;
}

const NewsSection: React.FC<Props> = ({ title, articles, onSave, onSummarize }) => {
  return (
    <div className="news-section">
      <h2>{title}</h2>
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
          onSave={onSave}
          onSummarize={onSummarize}
        />
      ))}
    </div>
  );
};

export default NewsSection;
