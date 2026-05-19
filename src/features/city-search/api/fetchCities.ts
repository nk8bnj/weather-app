import { apiGet } from '@/shared/lib/api';
import type { CityLocation, OpenWeatherGeoLocation } from './types';

interface FetchCitiesParams {
  query: string;
  limit?: number;
  signal?: AbortSignal;
}

const normalize = (data: OpenWeatherGeoLocation[]): CityLocation[] =>
  data.map((item) => ({
    name: item.name,
    country: item.country,
    state: item.state,
    lat: item.lat,
    lon: item.lon,
  }));

export const fetchCities = async ({
  query,
  limit = 5,
  signal,
}: FetchCitiesParams): Promise<CityLocation[]> => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const data = await apiGet<OpenWeatherGeoLocation[]>(
    '/geo/1.0/direct',
    { q: trimmed, limit },
    { signal },
  );
  return normalize(data);
};
