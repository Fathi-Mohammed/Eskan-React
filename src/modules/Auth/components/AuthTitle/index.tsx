import React from 'react';

import styles from './styles.module.scss';

type props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};
export const AuthTitle: React.FC<props> = ({ title, subtitle, center }) => {
  return (
    <div
      className={`${styles.authTitleWrapper} ${center ? styles.center : ''}`}
    >
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
