import axios from 'axios';
import { NewsItem } from '../Types/NewsItem';
import type { NewsArticle } from '../Types/NewsArticle';

const token = localStorage.getItem('token');

export const getSavedNews = async (): Promise<NewsItem[]> => {
  const res = await axios.get('http://localhost:5000/api/user/saved', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getHistory = async (): Promise<NewsItem[]> => {
  const res = await axios.get('http://localhost:5000/api/user/history', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ./api/index.ts

export const saveArticle = async (article: NewsArticle) => {
  try {
    const response = await axios.post('http://localhost:5000/api/save', article);
    return response.data.status; // should be 'saved', 'duplicate', or 'error'
  } catch (error) {
    console.error('Save failed:', error);
    return 'error';
  }
};


