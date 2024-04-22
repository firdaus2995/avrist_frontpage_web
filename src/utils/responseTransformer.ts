import { BASE_URL } from './baseUrl';
import { ContentCategoryResponse, ContentData, ContentDetailResponse, ContentResponse } from '@/types/content.type';
import { ContentDatum, PageResponse } from '@/types/page.type';

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

export const contentCategoryTransformer = (data: ContentCategoryResponse, category: string) => {
  try {
    
    const categoryData = data.data.categoryList[category];
    if (!categoryData || categoryData.length === 0) {
      throw new Error("Category data is empty or not found.");
    }

    return categoryData.map(({ title, contentData, id }: ContentData) => {
      return {
        ...handleTransformedContent(contentData, title),
        id
      };
    });
  }
  catch(error) {
    console.error(error);
    return [];
  }
};

export const contentTransformer = (data: ContentResponse) => {
  const { title, contentData } = data.data.contentDataList[0];
  return handleTransformedContent(contentData, title);
};

export const contentDetailTransformer = (data: ContentDetailResponse) => {
  const contentData = data.data.contentData;
  return handleTransformedContent(contentData, '');
};

export const handleTransformedContent = (contentData: ContentDatum[], title: string) => {
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
