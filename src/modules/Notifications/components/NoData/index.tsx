import React from 'react';
import Icon from '@/assets/images/shapes/NotificationsNoData.svg?react';
import styles from './styles.module.scss';

export const NoData: React.FC = () => {
  return (
    <div className={styles.noData}>
      <Icon className={styles.icon} />
      <h1 className={styles.title}>لا يوجد إشعارات</h1>
      <p className={styles.description}>لا يوجد إشعارات</p>
    </div>
  );
};
