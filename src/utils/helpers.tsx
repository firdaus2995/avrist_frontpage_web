export const camelToKebabCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};
