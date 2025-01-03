import { IGDBImageSize } from "./types.js";

export function getIGDBImageUrl(size: IGDBImageSize, image_id: string) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.jpg`;
}
