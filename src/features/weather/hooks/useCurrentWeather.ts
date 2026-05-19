import { useQuery } from '@tanstack/react-query';

import { fetchCurrentWeather } from '../api';
import { weatherKeys } from './queryKeys';

interface UseCurrentWeatherParams {
  lat: number | null;
  lon: number | null;
}

export const useCurrentWeather = ({ lat, lon }: UseCurrentWeatherParams) => {
  return useQuery({
    queryKey:
      lat !== null && lon !== null ? weatherKeys.current(lat, lon) : weatherKeys.current(0, 0),
    queryFn: ({ signal }) => fetchCurrentWeather({ lat: lat!, lon: lon!, signal }),
    enabled: lat !== null && lon !== null,
  });
};
