// src/utils/transform.ts
import { NewsItem } from '../Types/NewsItem';
import { NewsArticle } from '../Types/NewsArticle';

export const mapNewsItemToArticle = (item: NewsItem): NewsArticle => ({
  title: item.title,
  summary: item.description,
  url: item.url,
  source: {
    name: item.source?.name || 'Unknown Source', // ✅ safe fallback
  },
});


