import {
  useQuery,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';
import { Axios } from '../services/Axios';
import { AxiosRequestConfig } from 'axios';

const fetchData = async (endpoint: string, options?: AxiosRequestConfig) => {
  const response = await Axios(endpoint, options);
  return response.data;
};

const useApi = (() => {
  const get = (
    endpoint: string,
    options?: AxiosRequestConfig,
    queryString?: string,
  ) => {
    const { headers, ...args } = options || {};

    return useQuery({
      queryFn: () =>
        fetchData(endpoint + (queryString ? `?${queryString}` : ''), {
          headers: {
            ...headers,
          },
          ...args,
        }),
      queryKey: [endpoint + queryString],
      refetchOnWindowFocus: false,
    });
  };

  const post = (endpoint: string, data?: any, options?: AxiosRequestConfig) => {
    const { headers, ...args } = options || {};

    return useMutation({
      mutationFn: () =>
        fetchData(endpoint, {
          method: 'POST',
          data,
          headers: {
            ...headers,
          },
          ...args,
        }),
    });
  };

  const remove = (
    endpoint: string,
    data?: any,
    options?: AxiosRequestConfig,
  ) => {
    const { headers, ...args } = options || {};

    return useMutation({
      mutationFn: () =>
        fetchData(endpoint, {
          method: 'DELETE',
          data,
          headers: {
            ...headers,
          },
          ...args,
        }),
    });
  };

  return { get, post, remove };
})();

export default useApi;
