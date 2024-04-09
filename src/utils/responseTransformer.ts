import { BASE_URL } from './baseUrl';
import { ContentResponse } from '@/types/content.type';
import { PageResponse } from '@/types/page.type';

export const pageTransformer = (data?: PageResponse) => {
  if (data !== undefined) {
    const { title, contentData } = data.data.contentType.contentDataList[0];
    const transformedDataContent = contentData.reduce((acc, obj) => {
      // @ts-ignore
      acc[obj.fieldId] = obj;
      return acc;
    }, {});
    const fieldId = contentData.map((i) => i.fieldId);
    return { title, content: transformedDataContent as any, fieldId };
  }
  return { title: '', content: {}, fieldId: [] };
};

export const contentTransformer = (data: ContentResponse) => {
  const { title, contentData } = data.data.contentDataList[0];
  const transformedDataContent = contentData.reduce((acc, obj) => {
    // @ts-ignore
    acc[obj.fieldId] = obj;
    return acc;
  }, {});
  const fieldId = contentData.map((i) => i.fieldId);
  return { title, content: transformedDataContent as any, fieldId };
};

export const singleImageTransformer = (data: any) => {
  if (!data || data?.value === '-')
    return {
      imageUrl: '',
      altText: ''
    };
  const image = JSON.parse(data.value)[0];
  return {
    imageUrl: `${BASE_URL.image}/${image?.imageUrl ?? ''}`,
    altText: image?.altText ?? ''
  };
};

export const contentStringTransformer = (data: any) => {
  if (data?.value === '-') return '';
  return data?.value ?? '';
};
