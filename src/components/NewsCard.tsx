import React from 'react';
import { NewsArticle } from '../Types/NewsArticle';
import '../Styles/NewsCard.css';

interface NewsCardProps {
  article: NewsArticle;
  onSave: (article: NewsArticle) => void;
  onSummarize: (article: NewsArticle) => void;
  onRead: () => void;
  summary?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onSave,
  onSummarize,
  onRead,
  summary,
}) => {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Unknown date';

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

      {/* ✅ Content section */}
      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>
        <p className="news-meta">
          <strong>{article.source?.name || 'Unknown Source'}</strong> • {formattedDate}
        </p>
        <p className="news-description">{article.description}</p>

        {/* ✅ Action buttons */}
        <div className="news-actions">
          <button onClick={() => onSave(article)}>Save</button>
          <button onClick={() => onSummarize(article)}>Summarize</button>
          <button onClick={onRead}>Read Full Article</button>
        </div>

        {/* ✅ Optional summary display */}
        {summary && (
          <div className="summary-box">
            <h4>Summary:</h4>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
