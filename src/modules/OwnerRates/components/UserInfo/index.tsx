import React from 'react';
import { Image, Rating } from '@/shared/components';

import RatingIcon from '@/assets/images/shapes/add_rating_icon.svg?react';
import Arrow from '@/assets/images/shapes/arrow_left_2.svg?react';

import styles from './styles.module.scss';

type props = {
  data: {
    name: string;
    image: string;
    rate: number;
  };
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserInfo: React.FC<props> = ({ data, setIsModalOpen }) => {
  const { name, image, rate } = data;
  return (
    <div className={styles.user}>
      <div className={styles.imageWrapper}>
        <Image asp={100} src={image} alt="user" />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <div className={styles.rating}>
          <Rating color="yellow" data={rate} />
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="button__ add_rating_button__"
      >
        <RatingIcon />
        قم بتقييم المعلن
        <Arrow />
      </button>
    </div>
  );
};
