import { Hero, RealEstates } from './components';
import { tabTitle } from '@/shared/utils/tabTitle';
import useApi from '@/shared/hooks/useApi';
import { FetchingError } from '@/shared/components';

export const Home = () => {
  tabTitle('pages.home');

  const { VITE_HOME } = import.meta.env;

  const { isLoading, data, isSuccess } = useApi.get(VITE_HOME);

  if (isSuccess) {
    if (data?.status === 'error') {
      return <FetchingError error={data?.message} />;
    }
  }

  return (
    <>
      <Hero data={data?.data.intro} isLoading={isLoading} />
      {/* <RealEstates /> */}
    </>
  );
};
