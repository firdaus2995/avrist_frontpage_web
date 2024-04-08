import { PageResponse } from '@/types/page.type';
import { httpService } from '@/utils/httpService';

export const getDetailKarir = async (slug: string) => {
  return await httpService<PageResponse>('page', slug, { method: 'GET' });
};
