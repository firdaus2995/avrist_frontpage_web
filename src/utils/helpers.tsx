import { QueryParams } from './httpService';
import { ContentData } from '@/types/content.type';

export const camelToKebabCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};

export const convertToKebabCase = (str: string) => {
  const cleanText = (text: string) =>
    text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
  return cleanText(str).replace(/\s+/g, '-');
};

export const handleDownload = async (fileUrl: string) => {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const newBlob = new Blob([blob], { type: blob.type });
    const url = URL.createObjectURL(newBlob);
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

export const htmlParser = (str: string): string => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(str, 'text/html');

  if (doc.body) {
    const textContent = doc.body.textContent?.trim();
    return textContent || '';
  }

  return '';
};

export const filterAttributes = <T extends Record<string, any>>(
  obj: T
): QueryParams => {
  const newObj: QueryParams = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const strValue = String(value);
      if (strValue.trim()) {
        newObj[key] = strValue;
      }
    }
  }

  return newObj;
};

export const getYouTubeId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    const videoId = params.get('v');
    return videoId;
  } catch (error) {
    console.error('Invalid YouTube URL');
    return '';
  }
};

export const mergeAllData = (data: Record<string, ContentData[]>) => {
  let mergedData: ContentData[] = [];

  Object.keys(data)?.map((item: string) => {
    mergedData = mergedData.concat(data[item]);
  });

  return mergedData;
};

export const generateDaftarIsi = (data: any[], section: string) => {
  const listSection: any = [];
  data.map((item) => {
    item?.details.map((detail: Record<string, string>, idx: number) => {
      if (detail.fieldId === section) {
        listSection.push({ key: idx, label: detail.value });
      }
    });
  });

  return listSection;
};

export const isContentNotEmpty = (str: string) => {
  return (
    str !== '<p>-</p>' &&
    str !== '["-"]' &&
    str !== '-' &&
    !str?.includes('>-<')
  );
};

export const tableReplacement = (item: any) => {
  const isMobile = window.innerWidth < 640;
  const replacements = {
    '<ol>': "<ol class='list-decimal list-outside font-opensans px-5'>",
    '<ul>': "<ul class='list-disc list-outside font-opensans px-5' >",
    '<table>': `<table class='table-auto border-collapse border-spacing-2 border border-slate-500 ${isMobile ? 'text-[14px]' : ''}' >`,
    '<th>': `<th class='border border-slate-500 ${isMobile ? 'p-2' : 'p-4'}'>`,
    '<td>': `<td class='border border-slate-500 ${isMobile ? 'p-2' : 'p-4'}' >`,
    '<figure class="table">':
      "<span class='w-full flex items-center justify-center text-center'><figure class='table'>",
    '</figure>': '</figure></span>'
  };

  let valueDescription = item.replace(/\\{3}/g, '');

  for (const [key, value] of Object.entries(replacements)) {
    valueDescription = valueDescription.replaceAll(key, value);
  }

  return valueDescription;
};
