import React from 'react';
import Icon from '@/assets/images/shapes/rating_no_data.svg?react';
import styles from './styles.module.scss';

export const NoData: React.FC = () => {
  return (
    <div className={styles.noData}>
      <Icon />
      <h1 className={styles.title}>لا يوجد تقييمات</h1>
      <p className={styles.description}>لا يوجد أي تقييمات لهذا المعلن</p>
    </div>
  );
};
