import { QueryParams } from './httpService';

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
