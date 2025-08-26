export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: {
    name?: string;
  };
  publishedAt: string;
  url: string;
  imageUrl?: string;     // ✅ Existing field
  urlToImage?: string;   // ✅ Added for compatibility
}
