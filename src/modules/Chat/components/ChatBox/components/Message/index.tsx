import React from 'react';
import TimeIcon from '@/assets/images/shapes/time_icon.svg?react';
import styles from './styles.module.scss';
import { Image } from 'antd';

type props = {
  data: {
    message: string;
    sent_at: string;
    from_me: boolean;
    file?: string;
  };
};

export const Message: React.FC<props> = ({ data }) => {
  const { message, sent_at, from_me, file } = data;
  return (
    <div className={`${styles.message} ${!from_me && styles.otherMessage}`}>
      {message && <p className={styles.parag}>{message}</p>}
      {file && <Image src={file} alt="file" />}
      <span className={styles.date}>
        <TimeIcon /> {sent_at}
      </span>
    </div>
  );
};
