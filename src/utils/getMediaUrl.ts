// Helper function to get media URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const getMediaUrl = (media: any): string => {
  if (!media) return "";
  if (media.url) return `${API_BASE_URL}${media.url}`;
  if (media.data?.attributes?.url) {
    return `${API_BASE_URL}${media.data.attributes.url}`;
  }
  return "";
};
