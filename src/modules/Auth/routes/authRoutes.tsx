import { Route, Routes } from 'react-router-dom';
import {
  ForgetPassword,
  SignIn,
  SignUp,
  Validation,
  SetNewPassword,
} from '../pages';

export const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/new-password" element={<SetNewPassword />} />
        <Route path="/validation" element={<Validation />} />
      </Routes>
    </>
  );
};
