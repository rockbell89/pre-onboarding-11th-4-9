import { AxiosError, AxiosRequestConfig } from 'axios';
import { apiClient } from '../utils/apiClient';
import { getCachedResponse, setCacheStorage } from '../utils/cacheStorage';
import { API_URL } from '../constants';
import { SearchWordType } from '../types';

type ErrorResponse = {
  message: string;
};

export const searchAPI = async (keyword: string) => {
  if (keyword === '') return [];

  const config: AxiosRequestConfig = {
    params: {
      q: keyword,
    },
  };
  const queryStr = new URLSearchParams(config.params).toString();
  const responsedCache = await getCachedResponse(API_URL.search, queryStr);

  if (responsedCache) return await responsedCache.json();

  try {
    const { data } = await apiClient.get<SearchWordType[]>(
      API_URL.search,
      config,
    );
    console.info('calling api');

    setCacheStorage(API_URL.search, queryStr, data);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.log(axiosError.response?.data.message);
    return [];
  }
};
