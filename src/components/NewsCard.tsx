import React from 'react';
import { NewsArticle } from '../Types/NewsArticle';
import { NewsItem } from '../Types/NewsItem';

interface NewsCardProps {
  article: NewsArticle;
  onSave: (article: NewsArticle) => void;
  onSummarize: (article: NewsArticle) => void;
}


const NewsCard: React.FC<NewsCardProps> = ({ article, onSave, onSummarize }) => {
  return (
    <div className="news-card">
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <button onClick={() => onSave(article)}>Save</button>
      <button onClick={() => onSummarize(article)}>Summarize</button>
    </div>
  );
};

export default NewsCard;
