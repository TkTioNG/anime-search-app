export type Anime = {
  mal_id: string;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  synopsis: string;
};

export type AnimeApiError = {
  status: number;
  type: string;
  message?: string;
  messages?: Record<string, string[]>;
  error: string;
};

export type AnimeListResponse =
  | {
      data: Anime[];
      pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: {
          count: number;
          total: number;
          per_page: number;
        };
      };
    }
  | AnimeApiError;

export type AnimeDetailResponse =
  | {
      data: Anime;
    }
  | AnimeApiError;
