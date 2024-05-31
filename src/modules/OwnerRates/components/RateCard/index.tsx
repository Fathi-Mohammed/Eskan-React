import React from 'react';

import { Image, Rating } from '@/shared/components';
import TimeIcon from '@/assets/images/shapes/time_icon.svg?react';
import styles from './styles.module.scss';

type props = {
  data: {
    user: {
      name: string;
      image: string;
      rate: number;
    };
    text: string;
    published_at: string;
    rate: number;
  };
};

export const RateCard: React.FC<props> = ({ data }) => {
  const { user, text, published_at, rate } = data || {};
  const { name, image } = user;
  return (
    <div className={styles.rateCard}>
      <div className={styles.head}>
        <div className={styles.imageWrapper}>
          <Image asp={100} src={image} alt="user" />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.name}>{name}</span>
            <div className={styles.rating}>
              <Rating color="yellow" data={rate} />
            </div>
          </div>
          <div className={styles.time}>
            <TimeIcon />
            تم التقييم في : {published_at}
          </div>
        </div>
      </div>

      <p className={styles.description}>{text}</p>
    </div>
  );
};
