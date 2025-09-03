// Environment configuration
export const config = {
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_STRAPI_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://engaging-dinosaur-fd8c167e0b.strapiapp.com"
        : "http://localhost:1337"),
    timeout: 10000,
  },
} as const;

export type Config = typeof config;

export const getApiEndpoint = (endpoint: string): string => {
  return `${config.api.baseUrl}${endpoint}`;
};
