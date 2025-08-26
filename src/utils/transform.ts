import { NewsItem } from '../Types/NewsItem';
import { NewsArticle } from '../Types/NewsArticle';

// 🔄 Transform NewsItem to NewsArticle format
export const mapNewsItemToArticle = (item: NewsItem): NewsArticle => ({
  title: item.title,
  description: item.description, // ✅ matches NewsArticle type
  url: item.url,
  urlToImage: item.urlToImage || '', // Optional fallback
  publishedAt: item.publishedAt || '', // Optional fallback
  source: {
    name: item.source?.name || 'Unknown Source', // ✅ safe fallback
  },
});
