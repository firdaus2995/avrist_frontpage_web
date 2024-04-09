import { notFound } from 'next/navigation';
import { PageResponse } from '@/types/page.type';
import { httpService } from '@/utils/httpService';

export const getContentPage = async (slug: string) => {
  return await httpService<PageResponse>('page', slug, { method: 'GET' });
};

export const handleGetContentPage = async (slug: string) => {
  try {
    const data = await getContentPage(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};
