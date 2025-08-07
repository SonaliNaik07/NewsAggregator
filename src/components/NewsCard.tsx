import React from 'react';

interface ArticleProps {
  article: {
    title: string;
    description: string;
    url: string;
    source?: { name?: string };
  };
  onSave: (article: any) => void;
  onSummarize: (article: any) => void;
}

const NewsCard: React.FC<ArticleProps> = ({ article, onSave, onSummarize }) => {
  return (
    <div className="news-card">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
      <div className="buttons">
        <button onClick={() => onSummarize(article)}>Summarize</button>
        <button onClick={() => onSave(article)}>Save</button>
      </div>
    </div>
  );
};

export default NewsCard;
