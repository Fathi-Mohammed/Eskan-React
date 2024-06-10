import { AuthRoutes } from './routes/authRoutes';

import styles from './styles.module.scss';

const Auth = () => (
  <main className={styles.registrationPage}>
    <AuthRoutes />
  </main>
);

export default Auth;
