export interface StrapiService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

export interface ServiceResponse {
  data: StrapiService[];
  meta: Record<string, any>;
}

export interface ServiceData {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}
