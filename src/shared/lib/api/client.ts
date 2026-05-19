import { env } from '@/shared/config/env';
import { ApiError, NetworkError } from './errors';

interface RequestOptions {
  signal?: AbortSignal;
}

const buildUrl = (path: string, params: Record<string, string | number>): string => {
  const url = new URL(path, env.OPENWEATHER_BASE_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  url.searchParams.set('appid', env.OPENWEATHER_API_KEY);
  return url.toString();
};

export const apiGet = async <T>(
  path: string,
  params: Record<string, string | number>,
  options: RequestOptions = {},
): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(buildUrl(path, params), { signal: options.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    throw new NetworkError(error instanceof Error ? error.message : 'Network request failed');
  }

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // response body was not JSON — keep statusText
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
};
