// src/components/NewsFeed.tsx
import React, { useState } from 'react';
import axios from 'axios';
import NewsSection from './NewsSection';
import { NewsArticle } from '../Types/NewsArticle';

function NewsFeed() {
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSave = async (article: NewsArticle) => {
    try {
      const res = await axios.post(`/api/articles/save/${user._id}`, {
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        source: article.source?.name || 'Unknown',
        publishedAt: article.publishedAt,
      });

      console.log('✅ Saved:', res.data);
      setSavedArticles((prev) => [...prev, article]); // ✅ Update local state
    } catch (err: any) {
      console.error('❌ Save failed:', err.response?.data?.error || err.message);
    }
  };

  const handleSummarize = async (article: NewsArticle) => {
    // Your summarize logic here
  };

  return (
    <NewsSection
      title="📰 Top Headlines"
      articles={savedArticles} // or your fetched articles
      onSave={handleSave}
      onSummarize={handleSummarize}
    />
  );
}

export default NewsFeed;
