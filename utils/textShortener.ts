export const textShortener = (text: string) => {
  return text.length > 10 ? text.slice(0, 10) + '...' : text;
};
