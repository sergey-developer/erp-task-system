export const getTextWithCounter = (text: string, arr: any[]): string =>
  arr.length ? `${text} (${arr.length})` : text
