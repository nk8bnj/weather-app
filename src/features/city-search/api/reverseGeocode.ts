import { apiGet } from '@/shared/lib/api';
import type { CityLocation, OpenWeatherGeoLocation } from './types';

interface ReverseGeocodeParams {
  lat: number;
  lon: number;
  signal?: AbortSignal;
}

export const reverseGeocode = async ({
  lat,
  lon,
  signal,
}: ReverseGeocodeParams): Promise<CityLocation | null> => {
  const data = await apiGet<OpenWeatherGeoLocation[]>(
    '/geo/1.0/reverse',
    { lat, lon, limit: 1 },
    { signal },
  );

  const first = data[0];
  if (!first) return null;

  return {
    name: first.name,
    country: first.country,
    state: first.state,
    lat: first.lat,
    lon: first.lon,
  };
};
