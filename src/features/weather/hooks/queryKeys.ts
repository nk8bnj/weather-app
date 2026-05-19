export const weatherKeys = {
  all: ['weather'] as const,
  current: (lat: number, lon: number) => [...weatherKeys.all, 'current', lat, lon] as const,
  forecast: (lat: number, lon: number) => [...weatherKeys.all, 'forecast', lat, lon] as const,
};
