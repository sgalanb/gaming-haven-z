import {
  EnvironmentTypes,
  Game,
  GameSearchResults,
  IGDBImageSize,
} from "./types.js";

function getBaseUrl(environment: EnvironmentTypes) {
  return environment === "development"
    ? "http://localhost:3005/api"
    : "https://gaming-haven-z.vercel.app/api";
}

export function getIGDBImageUrl(
  size: IGDBImageSize,
  image_id: string | undefined
) {
  if (!image_id)
    return "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.webp";
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.jpg`;
}

export async function searchGames(
  query: string,
  environment: EnvironmentTypes
): Promise<GameSearchResults> {
  const baseUrl = getBaseUrl(environment);
  const response = await fetch(`${baseUrl}/search?query=${query}`);
  return response.json();
}

export async function getGame(
  slug: string,
  environment: EnvironmentTypes
): Promise<Game> {
  const baseUrl = getBaseUrl(environment);
  const response = await fetch(`${baseUrl}/games/${slug}`);
  return response.json();
}

export async function getTop200Games(
  offset: number,
  environment: EnvironmentTypes
): Promise<Game[]> {
  const baseUrl = getBaseUrl(environment);
  const response = await fetch(`${baseUrl}/top-games?offset=${offset}`);
  return response.json();
}
