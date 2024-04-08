import { PageResponse } from '@/types/page.type';
import { httpService } from '@/utils/httpService';

export const getInformasiNasabah = async (slug: string) => {
  return await httpService<PageResponse>('page', slug, { method: 'GET' });
};

export const getPanduanPembayaran = async (slug: string) => {
  return await httpService<PageResponse>('page', slug, { method: 'GET' });
};
