// OpenWeather current weather response (subset — only fields we use)
export interface OpenWeatherCurrentResponse {
  name: string;
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  dt: number; // unix timestamp
  timezone: number; // offset in seconds
}

// OpenWeather 5-day / 3-hour forecast response (subset)
export interface OpenWeatherForecastResponse {
  list: ForecastEntry[];
  city: {
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
}

// Normalized shape used by the UI
export interface CurrentWeather {
  cityName: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  condition: string;
  description: string;
  iconCode: string;
  timestamp: number;
}

export interface ForecastPoint {
  timestamp: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  iconCode: string;
}

export interface Forecast {
  cityName: string;
  country: string;
  points: ForecastPoint[];
}
