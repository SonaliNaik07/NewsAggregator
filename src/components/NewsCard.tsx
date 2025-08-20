import React from 'react';
import { NewsArticle } from '../Types/NewsArticle';
import '../Styles/NewsCard.css'; // Make sure this path matches your folder structure

interface NewsCardProps {
  article: NewsArticle;
  onSave: (article: NewsArticle) => void;
  onSummarize: (article: NewsArticle) => void;
  summary?: string; // 👈 optional prop for displaying summary
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onSave, onSummarize, summary }) => {
  return (
    <div className="news-card">
      {/* ✅ Image section */}
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
        />
      ) : (
        <div className="image-placeholder">No Image Available</div>
      )}

      <h3>{article.title}</h3>
      <p>{article.description}</p>

      <div className="news-actions">
        <button onClick={() => onSave(article)}>Save</button>
        <button onClick={() => onSummarize(article)}>Summarize</button>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <button>Read Full Article</button>
        </a>
      </div>

      {summary && (
        <div className="summary-box">
          <h4>Summary:</h4>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
