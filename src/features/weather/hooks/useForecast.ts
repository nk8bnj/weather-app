import { useQuery } from '@tanstack/react-query';

import { fetchForecast } from '../api';
import { weatherKeys } from './queryKeys';

interface UseForecastParams {
  lat: number | null;
  lon: number | null;
}

export const useForecast = ({ lat, lon }: UseForecastParams) => {
  return useQuery({
    queryKey:
      lat !== null && lon !== null ? weatherKeys.forecast(lat, lon) : weatherKeys.forecast(0, 0),
    queryFn: ({ signal }) => fetchForecast({ lat: lat!, lon: lon!, signal }),
    enabled: lat !== null && lon !== null,
  });
};
