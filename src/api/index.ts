import axios from 'axios';
import { NewsItem } from '../Types/NewsItem';

export const getSavedNews = async (userId: string): Promise<NewsItem[]> => {
  const res = await axios.get('http://localhost:5000/api/user/saved', {
    headers: { 'x-user-id': userId },
  });
  return res.data;
};

export const getHistory = async (userId: string): Promise<NewsItem[]> => {
  const res = await axios.get('http://localhost:5000/api/user/history', {
    headers: { 'x-user-id': userId },
  });
  return res.data;
};
