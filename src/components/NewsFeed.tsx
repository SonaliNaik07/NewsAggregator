import React from 'react';
import { useNews } from '../hooks/useNews';
import NewsSection from './NewsSection';

function NewsFeed() {
  const { articles, loading } = useNews();

  if (loading) return <p>Loading news...</p>;

  return (
    <NewsSection
      title="📰 Top Headlines"
      articles={articles}
      onSave={(article) => console.log('Saved:', article)}
      onSummarize={(article) => console.log('Summarized:', article)}
    />
  );
}

export default NewsFeed;
