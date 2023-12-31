import { HEADER_FETCH_DATE, EXPIRE_TIME } from '../constants';
import { SearchWordType } from '../types';

export const getIsCacheExpired = (cacheResponse: Response) => {
  const cachedDate = cacheResponse.headers.get(HEADER_FETCH_DATE);

  if (!cachedDate) return;

  const fetchDate = new Date(cachedDate).getTime();
  const today = new Date().getTime();

  return today - fetchDate > EXPIRE_TIME;
};

export const getCachedResponse = async (url: string, queryStr: string) => {
  const cacheStorage = await caches.open(url);
  const cachedResponse = await cacheStorage.match(queryStr);
  if (cachedResponse) {
    if (!getIsCacheExpired(cachedResponse)) return cachedResponse;
    await cacheStorage.delete(queryStr);
    return null;
  }
  return null;
};

export const setCacheStorage = async (
  url: string,
  queryStr: string,
  data: SearchWordType[],
) => {
  const cacheStorage = await caches.open(url);
  const response = new Response(JSON.stringify(data));

  const clonedResponse = response.clone();
  const newBody = await clonedResponse.blob();
  const newHeaders = new Headers(clonedResponse.headers);
  newHeaders.append(HEADER_FETCH_DATE, new Date().toISOString());

  const newResponse = new Response(newBody, {
    status: clonedResponse.status,
    statusText: clonedResponse.statusText,
    headers: newHeaders,
  });

  cacheStorage.put(queryStr, newResponse);
};
