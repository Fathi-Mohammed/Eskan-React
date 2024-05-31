import { AuthRoutes } from './routes/authRoutes';

import styles from './styles.module.scss';

export const Auth = () => (
  <main className={styles.registrationPage}>
    <AuthRoutes />
  </main>
);
