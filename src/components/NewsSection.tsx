// src/components/NewsSection.tsx
import React from 'react';
import { NewsArticle } from '../Types/NewsArticle';

interface NewsSectionProps {
  title: string;
  articles: NewsArticle[];
  onSave: (article: NewsArticle) => void;
  onSummarize: (article: NewsArticle) => void;
}

function NewsSection({ title, articles, onSave, onSummarize }: NewsSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      {articles.map((article, index) => (
        <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={() => onSave(article)}>💾 Save</button>
            <button onClick={() => onSummarize(article)}>🧠 Summarize</button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default NewsSection;
