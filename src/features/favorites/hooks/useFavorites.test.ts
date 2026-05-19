import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { CityLocation } from '@/features/city-search';
import { useFavorites } from './useFavorites';

const STORAGE_KEY = 'weather-app:favorites';

const london: CityLocation = {
  name: 'London',
  country: 'GB',
  lat: 51.5074,
  lon: -0.1278,
};

const paris: CityLocation = {
  name: 'Paris',
  country: 'FR',
  lat: 48.8566,
  lon: 2.3522,
};

const kyiv: CityLocation = {
  name: 'Kyiv',
  country: 'UA',
  lat: 50.4501,
  lon: 30.5234,
};

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts with an empty list when storage is empty', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('loads favorites from localStorage on mount', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([london]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([london]);
  });

  it('falls back to empty when localStorage contains invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json');
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('falls back to empty when localStorage contains non-array data', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('filters out entries with invalid shape', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([london, { name: 'broken' }, paris]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([london, paris]);
  });

  it('adds a favorite and persists it to localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(london);
    });

    expect(result.current.favorites).toEqual([london]);
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    expect(stored).toEqual([london]);
  });

  it('does not add a duplicate favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(london);
      result.current.addFavorite(london);
    });

    expect(result.current.favorites).toEqual([london]);
  });

  it('removes a favorite by coordinates', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(london);
      result.current.addFavorite(paris);
    });

    act(() => {
      result.current.removeFavorite({ lat: london.lat, lon: london.lon });
    });

    expect(result.current.favorites).toEqual([paris]);
  });

  it('toggleFavorite adds when missing and removes when present', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(kyiv);
    });
    expect(result.current.favorites).toEqual([kyiv]);

    act(() => {
      result.current.toggleFavorite(kyiv);
    });
    expect(result.current.favorites).toEqual([]);
  });

  it('isFavorite reflects current state', () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite(london)).toBe(false);

    act(() => {
      result.current.addFavorite(london);
    });

    expect(result.current.isFavorite(london)).toBe(true);
    expect(result.current.isFavorite(paris)).toBe(false);
  });
});
