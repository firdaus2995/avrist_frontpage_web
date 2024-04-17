import { notFound } from 'next/navigation';
import { ContentResponse } from '@/types/content.type';
import { PageResponse } from '@/types/page.type';
import { QueryParams, httpService } from '@/utils/httpService';

export const getContentPage = async (slug: string) => {
  return await httpService<PageResponse>('page', slug, { method: 'GET' });
};

export const getContent = async (slug: string, query: QueryParams) => {
  return await httpService<ContentResponse>('content', slug, {
    method: 'GET',
    queryParams: query
  });
};

export const getContentCategory = async (slug: string, query: QueryParams) => {
  return await httpService<ContentResponse>('content/category', slug, {
    method: 'GET',
    queryParams: query
  });
};

export const handleGetContentPage = async (slug: string) => {
  try {
    const data = await getContentPage(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};

export const handleGetContent = async (slug: string, query: QueryParams) => {
  try {
    const data = await getContent(slug, query);
    return data;
  } catch (error) {
    return notFound();
  }
};
