import { useEffect, useRef, useState } from 'react';

import { Spinner } from '@/shared/ui';
import type { CityLocation } from '../../api';
import { useCityAutocomplete } from '../../hooks';
import styles from './CitySearch.module.scss';

interface CitySearchProps {
  onSelect: (city: CityLocation) => void;
}

export const CitySearch = ({ onSelect }: CitySearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: cities, isFetching, isError } = useCityAutocomplete(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (city: CityLocation) => {
    onSelect(city);
    setQuery('');
    setIsOpen(false);
  };

  const showDropdown = isOpen && query.trim().length >= 2;
  const hasResults = cities && cities.length > 0;
  const showNoResults = showDropdown && !isFetching && !isError && cities && cities.length === 0;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search for a city..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          aria-label="Search for a city"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
        {isFetching && (
          <div className={styles.spinner}>
            <Spinner size="sm" />
          </div>
        )}
      </div>

      {showDropdown && (
        <div className={styles.dropdown} role="listbox">
          {isError && <div className={styles.message}>Failed to load cities. Try again.</div>}

          {showNoResults && <div className={styles.message}>No cities found.</div>}

          {hasResults && (
            <ul className={styles.list}>
              {cities.map((city) => (
                <li key={`${city.lat}-${city.lon}`}>
                  <button
                    type="button"
                    className={styles.item}
                    onClick={() => handleSelect(city)}
                    role="option"
                  >
                    <span className={styles.cityName}>{city.name}</span>
                    <span className={styles.cityMeta}>
                      {[city.state, city.country].filter(Boolean).join(', ')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
