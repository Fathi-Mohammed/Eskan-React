import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import useLocalizeDocumentAttributes from '@/shared/hooks/useLocalizeDocumentAttributes';
import { tabIcon } from './shared/utils/tabIcon';
import { SETTINGS } from './shared/services/api/Api';
import { Loader } from './shared/components/Loader';
import { message } from 'antd';
import { PrivateRoute } from '@/shared/components/PrivateRoute';
import useApi from './shared/hooks/useApi';
import { ToastContainer } from 'react-toastify';
import { Footer, Header } from '@/shared/components';

const Home = lazy(() => import('./modules/Home'));
const NotFound = lazy(() => import('./modules/NotFound'));
const ContactUs = lazy(() => import('./modules/ContactUs'));
const Auth = lazy(() => import('./modules/Auth'));
const RealEstates = lazy(() => import('./modules/RealEstates'));
const RealEstate = lazy(() => import('./modules/RealEstate'));
const OwnerRates = lazy(() => import('./modules/OwnerRates'));
const AddAqar = lazy(() => import('./modules/AddAqar'));
const Profile = lazy(() => import('./modules/Profile'));
const MyAqars = lazy(() => import('./modules/MyAqars'));
const Membership = lazy(() => import('./modules/Membership'));
const Notifications = lazy(() => import('./modules/Notifications'));
const Favorites = lazy(() => import('./modules/Favorites'));
const Chat = lazy(() => import('./modules/Chat'));

export default function App() {
  useLocalizeDocumentAttributes();
  const { isLoading, data, isError, error } = useApi.get(SETTINGS);
  tabIcon(data?.data.favicon);

  if (isError) message.error(error.message);
  if (isLoading) return <Loader visible={isLoading} />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <Suspense fallback={<Loader visible={true} />}>
        <Header data={data?.data} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/aqars" element={<RealEstates />} />
          <Route path="/aqars/:id" element={<RealEstate />} />
          <Route path="/aqars/:id/owner_rates" element={<OwnerRates />} />
          <Route element={<PrivateRoute />}>
            <Route path="/add-aqar" element={<AddAqar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-aqars" element={<MyAqars />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
        <Footer data={data?.data} />
      </Suspense>
    </>
  );
}
