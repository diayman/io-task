# Centralized Configuration

This directory contains centralized configuration and API utilities for the IO Agency application.

## Configuration (`config.ts`)

The configuration automatically handles different environments:

- **Development**: Uses `http://localhost:1337` (Strapi local)
- **Production**: Uses `https://engaging-dinosaur-fd8c167e0b.strapiapp.com` (Strapi production)
- **Custom**: Can be overridden with `NEXT_PUBLIC_STRAPI_URL` environment variable

## API Utilities (`api.ts`)

Provides centralized API functions with:

- Error handling
- Type safety
- Revalidation support
- Cache control

## Usage

```typescript
import { apiFetchWithRevalidation, API_ENDPOINTS } from "@/lib/api";

// Fetch with ISR revalidation
const data = await apiFetchWithRevalidation(
  `${API_ENDPOINTS.HERO_SECTION}?locale=${locale}`,
  10 // revalidate every 10 seconds
);

// Fetch without cache
const data = await apiFetchNoCache(`${API_ENDPOINTS.SERVICES}`);
```

## Environment Setup

Create a `.env.local` file in your project root:

```bash
# Optional: Override default API URL
NEXT_PUBLIC_STRAPI_URL=https://your-custom-api.com

# Environment (auto-detected)
NODE_ENV=development
```

## Benefits

1. **Centralized Configuration**: Single place to manage API URLs
2. **Environment Awareness**: Automatic dev/prod switching
3. **Type Safety**: Full TypeScript support
4. **Error Handling**: Consistent error handling across the app
5. **Maintainability**: Easy to update API endpoints
