// OpenWeather geocoding response (direct + reverse share the same shape)
export interface OpenWeatherGeoLocation {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Normalized shape used by the UI
export interface CityLocation {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
