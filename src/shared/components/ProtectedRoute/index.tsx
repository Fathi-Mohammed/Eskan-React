import { useAuth } from '@/shared/context/AuthProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

export const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(3);
  const currentLocation = window.location.pathname;

  useEffect(() => {
    if (user === null) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            navigate('/auth/sign-in', {
              replace: true,
              state: { from: currentLocation },
            });
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [navigate, user]);

  if (user) {
    return <Outlet />;
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>برجاء تسجيل الدخول أولا</h1>
      <p className={styles.subtitle}>
        سيتم تحويلك تلقائياً لصفحة تسجيل الدخول خلال
        <span className={styles.countdown}>{countdown}</span> ثواني.
      </p>
    </section>
  );
};
