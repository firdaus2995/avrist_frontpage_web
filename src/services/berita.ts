import { ContentCategoryResponse } from '@/types/content.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import { filterAttributes } from '@/utils/helpers';
import { QueryParams, httpService } from '@/utils/httpService';

export const getAvristTerkini = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/category',
    BASE_SLUG.PROMO_BERITA.CONTENT.AVRIST_TERKINI,
    {
      method: 'GET',
      queryParams: filterAttributes(query)
    }
  );
};

export const getAvristTerkiniNew = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/filter',
    BASE_SLUG.PROMO_BERITA.CONTENT.AVRIST_TERKINI,
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE_CACHE
          ? parseInt(process.env.NEXT_PUBLIC_REVALIDATE_CACHE)
          : 60
      }
    },
    'body'
  );
};

export const getAvriStory = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/category',
    BASE_SLUG.PROMO_BERITA.CONTENT.AVRISTORY,
    {
      method: 'GET',
      queryParams: filterAttributes(query)
    }
  );
};

export const getAvriStoryNew = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/filter',
    BASE_SLUG.PROMO_BERITA.CONTENT.AVRISTORY,
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE_CACHE
          ? parseInt(process.env.NEXT_PUBLIC_REVALIDATE_CACHE)
          : 60
      }
    },
    'body'
  );
};

export const getAvristLifeGuide = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/category',
    BASE_SLUG.PROMO_BERITA.CONTENT.AVRIST_LIFE_GUIDE,
    {
      method: 'GET',
      queryParams: filterAttributes(query)
    }
  );
};

export const getAvristLifeGuideNew = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/filter',
    BASE_SLUG.PROMO_BERITA.CONTENT.AVRIST_LIFE_GUIDE,
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE_CACHE
          ? parseInt(process.env.NEXT_PUBLIC_REVALIDATE_CACHE)
          : 60
      }
    },
    'body'
  );
};

export const getBeritaPers = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/category',
    BASE_SLUG.PROMO_BERITA.CONTENT.KUMPULAN_BERITA_PERS_NEW,
    {
      method: 'GET',
      queryParams: filterAttributes(query)
    }
  );
};

export const getBeritaPersNew = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/filter',
    BASE_SLUG.PROMO_BERITA.CONTENT.KUMPULAN_BERITA_PERS_NEW,
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE_CACHE
          ? parseInt(process.env.NEXT_PUBLIC_REVALIDATE_CACHE)
          : 60
      }
    },
    'body'
  );
};

export const getTestimoni = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/category',
    BASE_SLUG.PROMO_BERITA.CONTENT.TESTIMONI,
    {
      method: 'GET',
      queryParams: filterAttributes(query)
    }
  );
};

export const getTestimoniNew = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/filter',
    BASE_SLUG.PROMO_BERITA.CONTENT.TESTIMONI,
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE_CACHE
          ? parseInt(process.env.NEXT_PUBLIC_REVALIDATE_CACHE)
          : 60
      }
    },
    'body'
  );
};

export const getPenawaran = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/category',
    BASE_SLUG.PROMO_BERITA.CONTENT.PENAWARAN,
    {
      method: 'GET',
      queryParams: filterAttributes(query)
    }
  );
};

export const getPenawaranNew = async (query: QueryParams) => {
  return await httpService<ContentCategoryResponse>(
    'content/filter',
    BASE_SLUG.PROMO_BERITA.CONTENT.PENAWARAN,
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE_CACHE
          ? parseInt(process.env.NEXT_PUBLIC_REVALIDATE_CACHE)
          : 60
      }
    },
    'body'
  );
};

export const subscribeApi = async (query: QueryParams) => {
  return await httpService('default', 'subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });
};
