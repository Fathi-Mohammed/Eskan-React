import { Footer, Header } from '@/shared/components';
import {
  Home,
  NotFound,
  ContactUs,
  Auth,
  RealEstates,
  RealEstate,
  OwnerRates,
  AddAqar,
  Profile,
} from './modules';
import { Route, Routes } from 'react-router-dom';
import useLocalizeDocumentAttributes from '@/shared/hooks/useLocalizeDocumentAttributes';
import { tabIcon } from './shared/utils/tabIcon';
import useFetch from './shared/hooks/useFetch';
import { SETTINGS } from './shared/services/api/Api';
import { Loader } from './shared/components/Loader';
import { message } from 'antd';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';

export default function App() {
  useLocalizeDocumentAttributes();
  const { isLoading, data, isError, error } = useFetch(SETTINGS);
  tabIcon(data?.data.favicon);

  if (isError) message.error(error.message);
  if (isLoading) return <Loader visible={isLoading} />;

  return (
    <>
      <Header data={data?.data} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/aqars" element={<RealEstates />} />
        <Route path="/aqars/:id" element={<RealEstate />} />
        <Route path="/aqars/:id/owner_rates" element={<OwnerRates />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/add-aqar" element={<AddAqar />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer data={data?.data} />
    </>
  );
}
