import { useMutation } from '@tanstack/react-query';
import Axios from '../services/Axios';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const mutateData = async (endpoint: string, data?: any, options?: any) => {
  const response = await Axios.post(endpoint, data, options);
  return response.data;
};

const useMutationData = (endpoint, data?, options?) => {
  const { i18n } = useTranslation();
  const content = useContext(AuthContext);
  if (!content) throw new Error('useAuth must be used within a AuthProvider');
  const { user } = content;

  return useMutation({
    mutationFn: () => {
      return mutateData(endpoint, data, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          lang: i18n.language,
        },
        ...options,
      });
    },
  });
};

export default useMutationData;
