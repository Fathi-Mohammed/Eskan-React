import React from 'react';
import { Image, Rating } from '@/shared/components';
import { Link, useParams } from 'react-router-dom';
import Arrow from '@/assets/images/shapes/lessor_card_arrow.svg?react';
import ChatIcon from '@/assets/images/shapes/lessor_card_chat.svg?react';
import PhoneIcon from '@/assets/images/shapes/lessor_card_phone.svg?react';

import styles from './styles.module.scss';

type props = {
  data: {
    id: number;
    name: string;
    image: string;
    mobile: string;
    rate: number;
  };

  showPhone: boolean;
};

export const UserInfo: React.FC<props> = ({ data, showPhone }) => {
  const { id } = useParams();
  const { name, image, mobile, rate } = data || {};
  return (
    <div className={styles.userInfo}>
      <div className={styles.imageWrapper}>
        <Image asp={100} src={image} alt="user" />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <div className={styles.rating}>
          <Rating data={rate} />
          <Link className={styles.link} to={`/aqars/${id}/owner_rates`}>
            عرض التقييمات
            <Arrow />
          </Link>
        </div>
      </div>

      <div className={styles.links}>
        {showPhone && (
          <Link
            to={`callto:${mobile}`}
            target="_blank"
            className="link lessor_link lessor_phone__"
          >
            <PhoneIcon />
          </Link>
        )}
        <Link
          to="/chat"
          state={{ userData: data }}
          className="link lessor_link lessor_chat__"
        >
          <ChatIcon />
        </Link>
      </div>
    </div>
  );
};
