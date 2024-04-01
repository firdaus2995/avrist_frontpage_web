import { PageResponse } from '@/types/page.type';
import { httpService } from '@/utils/httpService';

export const getImagePencarian = async () => {
  return await httpService<PageResponse>('page', 'pencarian', {
    method: 'GET'
  });
};
