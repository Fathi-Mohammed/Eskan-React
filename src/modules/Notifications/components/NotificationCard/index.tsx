import React, { useEffect } from 'react';
import NotificationIcon from '@/assets/images/shapes/notificationIcon.svg?react';

import styles from './styles.module.scss';
import useApi from '@/shared/hooks/useApi';

type props = {
  data: {
    id: number;
    created_at: string;
    seen: boolean;
    title: string;
    text: string;
  };
};

export const NotificationCard: React.FC<props> = ({ data }) => {
  const { id, created_at, seen, title, text } = data;
  const { VITE_NOTIFICATIONS } = import.meta.env;
  const { data: notificationData, isSuccess } = useApi.get(
    `${VITE_NOTIFICATIONS}/${id}`,
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(notificationData);
    }
  }, []);

  return (
    <div key={id} className={styles.notification}>
      <div className={styles.head}>
        <div className={`${styles.iconWrapper} ${!seen && styles.new}`}>
          <NotificationIcon />
        </div>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.date}>{created_at}</span>
        </div>
      </div>
      <p className={styles.parag}>{text}</p>
    </div>
  );
};
