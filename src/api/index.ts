import axios from 'axios';
import { NewsItem } from '../Types/NewsItem';
import type { NewsArticle } from '../Types/NewsArticle';

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// ✅ Save article to user
export const saveArticleToUser = async (userId: string, article: NewsArticle) => {
  try {
    const res = await axios.post(`/api/users/${userId}/save`, article, {
      headers: getAuthHeader(),
    });
    return res.data.status;
  } catch (error) {
    console.error('API error:', error);
    return 'error';
  }
};

// ✅ Get saved articles
export const getSavedNews = async (): Promise<NewsItem[]> => {
  try {
    const res = await axios.get('http://localhost:5000/api/user/saved', {
      headers: getAuthHeader(),
    });
    return res.data.status;
  } catch (error) {
    console.error('Error fetching saved news:', error);
    return [];
  }
};

// ✅ Get history
export const getHistory = async (): Promise<NewsItem[]> => {
  try {
    const res = await axios.get('http://localhost:5000/api/user/history', {
      headers: getAuthHeader(),
    });
    return res.data.status;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};

// ✅ Get all users (for Admin Dashboard)
export const getAllUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/users', {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
