export interface NewsEntity {
  symbol: string;
  name: string;
  exchange: string | null;
  country: string;
  type: string;
  industry: string;
  match_score: number;
  sentiment_score: number | null;
}

export interface NewsArticle {
  uuid: string;
  title: string;
  description: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  entities: NewsEntity[];
}

export interface NewsResponse {
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
  data: NewsArticle[];
}
