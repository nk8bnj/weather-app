import { useQuery } from '@tanstack/react-query';

import { useDebounce } from '@/shared/lib/hooks';
import { fetchCities } from '../api';
import { citySearchKeys } from './queryKeys';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

export const useCityAutocomplete = (query: string) => {
  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_MS);
  const isEnabled = debouncedQuery.length >= MIN_QUERY_LENGTH;

  return useQuery({
    queryKey: citySearchKeys.search(debouncedQuery),
    queryFn: ({ signal }) => fetchCities({ query: debouncedQuery, signal }),
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000,
  });
};
