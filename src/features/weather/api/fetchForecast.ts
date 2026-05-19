import { apiGet, ApiError, CityNotFoundError } from '@/shared/lib/api';
import type { Forecast, ForecastPoint, OpenWeatherForecastResponse } from './types';

interface FetchForecastParams {
  lat: number;
  lon: number;
  signal?: AbortSignal;
}

const normalize = (data: OpenWeatherForecastResponse): Forecast => {
  const points: ForecastPoint[] = data.list.map((entry) => {
    const primary = entry.weather[0];
    return {
      timestamp: entry.dt,
      temperature: entry.main.temp,
      feelsLike: entry.main.feels_like,
      humidity: entry.main.humidity,
      windSpeed: entry.wind.speed,
      condition: primary?.main ?? 'Unknown',
      description: primary?.description ?? '',
      iconCode: primary?.icon ?? '01d',
    };
  });

  return {
    cityName: data.city.name,
    country: data.city.country,
    points,
  };
};

export const fetchForecast = async ({
  lat,
  lon,
  signal,
}: FetchForecastParams): Promise<Forecast> => {
  try {
    const data = await apiGet<OpenWeatherForecastResponse>(
      '/data/2.5/forecast',
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
