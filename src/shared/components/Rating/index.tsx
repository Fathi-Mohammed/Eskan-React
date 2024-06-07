import React from 'react';
import RateStarActive from '@/assets/images/shapes/rateStarActive.svg?react';
import RateStar from '@/assets/images/shapes/rateStar.svg?react';

import styles from './styles.module.scss';

type props = {
  data: number | string;
  color?: string;
  center?: boolean;
};

export const Rating: React.FC<props> = ({ data, color, center }) => {
  const colorClass = color === 'yellow' ? styles.yellow : '';
  return (
    <span className={styles.rating + ' ' + (center ? styles.center : '')}>
      <div className={styles.rateIcons}>
        {new Array(5).fill(0).map((_, index) => {
          if (index < Math.ceil(+data)) {
            return <RateStarActive className={colorClass} key={index} />;
          } else {
            return <RateStar className={colorClass} key={index} />;
          }
        })}
      </div>
      <span className={`${styles.rateNum} ${colorClass}`}>({data})</span>
    </span>
  );
};
