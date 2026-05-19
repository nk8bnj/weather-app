import { apiGet, ApiError, CityNotFoundError } from '@/shared/lib/api';
import type { CurrentWeather, OpenWeatherCurrentResponse } from './types';

interface FetchCurrentWeatherParams {
  lat: number;
  lon: number;
  signal?: AbortSignal;
}

const normalize = (data: OpenWeatherCurrentResponse): CurrentWeather => {
  const primary = data.weather[0];
  return {
    cityName: data.name,
    country: data.sys.country,
    coord: { lat: data.coord.lat, lon: data.coord.lon },
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    condition: primary?.main ?? 'Unknown',
    description: primary?.description ?? '',
    iconCode: primary?.icon ?? '01d',
    timestamp: data.dt,
  };
};

export const fetchCurrentWeather = async ({
  lat,
  lon,
  signal,
}: FetchCurrentWeatherParams): Promise<CurrentWeather> => {
  try {
    const data = await apiGet<OpenWeatherCurrentResponse>(
      '/data/2.5/weather',
      { lat, lon, units: 'metric' },
      { signal },
    );
    return normalize(data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new CityNotFoundError(`${lat},${lon}`);
    }
    throw error;
  }
};
