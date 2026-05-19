export const citySearchKeys = {
  all: ['cities'] as const,
  search: (query: string) => [...citySearchKeys.all, 'search', query] as const,
  reverse: (lat: number, lon: number) => [...citySearchKeys.all, 'reverse', lat, lon] as const,
};
