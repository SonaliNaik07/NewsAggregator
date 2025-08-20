import axios from 'axios';
import { NewsItem } from '../Types/NewsItem';
import type { NewsArticle } from '../Types/NewsArticle';

const token = localStorage.getItem('token');


// ✅ Save article to user (uses correct backend route)
export const saveArticleToUser = async (userId: string, article: NewsArticle) => {
  try {
    const res = await axios.post(`/api/users/${userId}/save`, article);
    return res.data.status; // ✅ This line is critical
  } catch (error) {
    console.error('API error:', error);
    return 'error';
  }
};


// ✅ Get saved articles
export const getSavedNews = async (): Promise<NewsItem[]> => {
  const res = await axios.get('http://localhost:5000/api/user/saved', {
    headers: { Authorization: `Bearer ${token}` },
  });
return res.data.status;
};

// ✅ Get history
export const getHistory = async (): Promise<NewsItem[]> => {
  const res = await axios.get('http://localhost:5000/api/user/history', {
    headers: { Authorization: `Bearer ${token}` },
  });
return res.data.status;
};


