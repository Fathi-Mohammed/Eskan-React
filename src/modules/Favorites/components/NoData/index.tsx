import React from 'react';
import Icon from '@/assets/images/shapes/favoritesNoData.svg?react';
import styles from './styles.module.scss';

export const NoData: React.FC = () => {
  return (
    <div className={styles.noData}>
      <Icon className={styles.icon} />
      <h1 className={styles.title}>المفضلة فارغة</h1>
      <p className={styles.description}>لم تقم بإضافة أي عقارات إلى مفضلتك</p>
    </div>
  );
};
