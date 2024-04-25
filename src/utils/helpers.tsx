export const camelToKebabCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};

export const convertToKebabCase = (str: string) => {
  const cleanText = (text: string) => text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
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