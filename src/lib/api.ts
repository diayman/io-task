import { getApiEndpoint } from "./config";

// Fetch with revalidation (for ISR)
export async function apiFetchWithRevalidation<T>(
  endpoint: string,
  revalidate: number = 10
): Promise<T> {
  const url = getApiEndpoint(endpoint);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Network error");
  }
}

// Fetch without cache (for dynamic data)
export async function apiFetchNoCache<T>(endpoint: string): Promise<T> {
  const url = getApiEndpoint(endpoint);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Network error");
  }
}

// Common API endpoints
export const API_ENDPOINTS = {
  HERO_SECTION: "/api/hero-section",
  TEAM_MEMBERS: "/api/team-members",
  CLIENTS: "/api/clients",
  SERVICES: "/api/services",
  SUBSCRIBERS: "/api/subscribers",
} as const;
