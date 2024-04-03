import { ContentDetailResponse, ContentResponse } from '@/types/content.type';
import { httpService } from '@/utils/httpService';

export const getPopUpModalHome = async (slug: string) => {
  return await httpService<ContentResponse>('content', slug, { method: 'GET' });
};

export const getPopUpDetailHome = async (id: string) => {
  return await httpService<ContentDetailResponse>('contentDetail', id, { method: 'GET' });
};
