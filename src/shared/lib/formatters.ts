export const formatTemperature = (celsius: number): string => {
  return `${Math.round(celsius)}°C`;
};

export const formatWindSpeed = (metersPerSecond: number): string => {
  return `${metersPerSecond.toFixed(1)} m/s`;
};

export const formatHumidity = (percent: number): string => {
  return `${percent}%`;
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const capitalize = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatHour = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  return `${hours}:00`;
};

export const formatWeekday = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const formatShortDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
