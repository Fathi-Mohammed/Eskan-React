import React from 'react';
import Icon from '@/assets/images/shapes/my_product_no_data.svg?react';
import PlusIcon from '@/assets/images/shapes/plus.svg?react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export const NoData: React.FC = () => {
  return (
    <div className={styles.noData}>
      <Icon className={styles.icon} />
      <h1 className={styles.title}>لا توجد لديك إعلانات</h1>
      <p className={styles.description}>لم تقم بإضافة أي إعلانات خاصة بك</p>
      <Link to="/add-aqar" className="link addAqar">
        <PlusIcon />
        إضافة إعلان
      </Link>
    </div>
  );
};
