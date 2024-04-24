export const camelToKebabCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};

export const convertToKebabCase = (str: string) => {
  const cleanText = (text: string) => text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
  return cleanText(str).replace(/\s+/g, '-');
};

export const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link?.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };