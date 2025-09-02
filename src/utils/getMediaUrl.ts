// Helper function to get media URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const getMediaUrl = (media: any): string => {
  if (!media) return "";

  const url = media.url || media.data?.attributes?.url;

  if (!url) return "";

  // If it's already a full URL (starts with http), return it as is (in production it's full url)
  if (url.startsWith("http")) {
    return url;
  }

  // Otherwise, prepend the API base URL
  return `${API_BASE_URL}${url}`;
};
