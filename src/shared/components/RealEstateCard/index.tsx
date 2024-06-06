import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/shared/components';
import LocationIcon from '@/assets/images/shapes/location_icon.svg?react';
import FavIcon from '@/assets/images/shapes/FavIcon.svg?react';
import type { aqars } from '@/shared/model/home';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { checkFileType } from '@/shared/utils/checkFileType';
import { Video } from '@/shared/components/Video';
import { AQARS } from '@/shared/services/api/Api';
import useMutationData from '@/shared/hooks/useMutationData';
import AuthContext from '@/shared/context/AuthProvider';
import { notification } from 'antd';

type props = {
  cardData: aqars;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const RealEstateCard: React.FC<props> = ({ cardData }) => {
  const [isLiked, setIsLiked] = React.useState(null);
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const context = useContext<any>(AuthContext);
  if (!context) throw new Error('AuthProvider not found');

  const { user } = context;

  const {
    id,
    title,
    for_txt,
    price,
    location: { address },
    image,
    is_liked,
  } = cardData;

  const { data, mutate } = useMutationData(`${AQARS}/${id}/like`);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const handleAqarsLike = async () => {
    try {
      await mutate();
      if (user?.access_token && !isLiked) {
        setIsLiked(data?.data.like);
        buttonRef.current?.classList.toggle('active');
        openNotificationWithIcon(
          'success',
          'Success',
          'Item Added To Favorites',
        );
      } else if (user?.access_token && isLiked) {
        setIsLiked(data?.data.like);
        buttonRef.current?.classList.toggle('active');
        openNotificationWithIcon(
          'success',
          'Success',
          'Item Removed From Favorites',
        );
      } else {
        openNotificationWithIcon(
          'error',
          'Error',
          'You Have To Sign In First or Activate Your Account',
        );
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.realEstateCard}>
        <Link to={`/aqars/${id}`} className={styles.imgWrapper}>
          {checkFileType(image) === 'image' ? (
            <Image src={image} asp={83.96624472} alt="aqars" />
          ) : (
            <Video src={image} asp={83.96624472} autoPlay loop muted />
          )}
          <div className={styles.status}>{for_txt}</div>
        </Link>
        <Link to={`/aqars/${id}`} className={styles.title}>
          {title}
        </Link>
        <div className={styles.info}>
          <div className={styles.location}>
            <LocationIcon />
            {address}
          </div>
          <button
            onClick={handleAqarsLike}
            ref={buttonRef}
            className={`button__ add_to_fav__ ${isLiked || !!is_liked ? 'active' : ''}`}
          >
            <FavIcon />
          </button>
        </div>
        <h5 className={styles.price}>
          {price} {t('RAS')}
        </h5>
      </div>
    </>
  );
};
