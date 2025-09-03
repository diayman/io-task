import { config } from "./config";

export const getMediaUrl = (media: any): string => {
  if (!media) return "";

  const url = media.url || media.data?.attributes?.url;

  if (!url) return "";

  // If it's already a full URL (starts with http), return it as is (in production it's full url)
  if (url.startsWith("http")) {
    return url;
  }

  // Otherwise, prepend the API base URL from centralized config
  return `${config.api.baseUrl}${url}`;
};
