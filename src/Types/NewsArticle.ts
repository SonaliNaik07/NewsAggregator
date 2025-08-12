export interface NewsArticle {
  title: string;
  url: string;
  description?: string;
  urlToImage?: string;
  source?: {
    name: string;
  };
  summary?:string
}