export interface NewsArticle {
  _id?: string; // If MongoDB returns this
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
  publishedAt: string; // or Date if you're parsing it
  createdAt?: string;  // Optional if you're storing timestamps
}