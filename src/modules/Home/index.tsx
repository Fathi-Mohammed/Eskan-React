import { useTranslation } from 'react-i18next';
import { Hero, RealEstates } from './components';
import { tabTitle } from '@/shared/utils/tabTitle';
import useFetch from '@/shared/hooks/useFetch';
import { Loader } from '@/shared/components/Loader';
import { message } from 'antd';
import { HOME } from '@/shared/services/api/Api';

export const Home = () => {
  const { t } = useTranslation();
  tabTitle(t('Home'));

  const { isLoading, isError, error, data, isRefetching } = useFetch(HOME);

  if (isError) message.error(error.message);
  if (isLoading || isRefetching)
    return <Loader visible={isLoading || isRefetching} />;

  return (
    <>
      {data?.data && <Hero data={data?.data.intro} />}
      <RealEstates />
    </>
  );
};
