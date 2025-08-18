// src/components/NewsFeed.tsx
import React from 'react';
import axios from 'axios';
import { useNews } from '../hooks/useNews';
import NewsSection from './NewsSection';
import { NewsArticle } from '../Types/NewsArticle';

function NewsFeed() {
  const { articles, loading } = useNews();

  const handleSave = async (article: NewsArticle) => {
    try {
      const res = await axios.post('/api/articles/save', {
        title: article.title,
        url: article.url,
        category: 'general', // or derive from context
        description: article.description || '',
      });
      console.log('✅ Saved:', res.data);
    } catch (err: any) {
      console.error('❌ Save failed:', err.response?.data?.error || err.message);
    }
  };

  const handleSummarize = async (article: NewsArticle) => {
    try {
      const res = await axios.post('/api/articles/summarize', {
        url: article.url
      });
      console.log('🧠 Summary:', res.data.summary);
    } catch (err: any) {
      console.error('❌ Summarize failed:', err.response?.data?.error || err.message);
    }
  };

  if (loading) return <p>Loading news...</p>;

  return (
    <NewsSection
      title="📰 Top Headlines"
      articles={articles}
      onSave={handleSave}
      onSummarize={handleSummarize}
    />
  );
}

export default NewsFeed;
