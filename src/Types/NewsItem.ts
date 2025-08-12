// src/types/NewsItem.ts
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: {
    name?: string;
  };
  publishedAt: string;
  url: string;
  imageUrl?: string;
}
