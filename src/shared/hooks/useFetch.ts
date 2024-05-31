import { useQuery } from '@tanstack/react-query';
import Axios from '../services/Axios';
import { useTranslation } from 'react-i18next';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';

const fetchData = async (endpoint: string, options?: any) => {
  const response = await Axios.get(endpoint, options);
  return response.data;
};

const useFetch = (endpoint: string, options?: any, queryKey?: any) => {
  const { i18n } = useTranslation();
  const context = useContext(AuthContext);
  const { user } = context || {};

  return useQuery({
    queryKey: [endpoint + queryKey],
    queryFn: () =>
      fetchData(endpoint + (queryKey ? `?${queryKey}` : ''), {
        headers: {
          lang: i18n.language,
          Authorization: `Bearer ${user?.access_token}`,
        },
        ...options,
      }),
    refetchOnWindowFocus: false,
  });
};

export default useFetch;
