export type IGDBImageSize = "cover_small" | "cover_big" | "1080p";

export type IGDBImage = {
  id: number;
  height: number;
  width: number;
  image_id: string;
};

export type Game = {
  id: number;
  cover?: IGDBImage;
  first_release_date: number;
  genres: {
    id: number;
    name: string;
  }[];
  involved_companies: {
    id: number;
    company: {
      id: number;
      name: string;
    };
  }[];
  name: string;
  platforms: {
    id: number;
    name: string;
  }[];
  screenshots?: IGDBImage[];
  similar_games: {
    id: number;
    name: string;
    slug: string;
    cover?: IGDBImage;
  }[];
  slug: string;
  summary: string;
  total_rating: number;
};

export type GameSearchResult = {
  id: number;
  name: string;
  slug: string;
  cover?: IGDBImage;
};

export type GameSearchResults = GameSearchResult[];
