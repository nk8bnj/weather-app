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
