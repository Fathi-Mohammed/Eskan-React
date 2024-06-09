import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/shared/components';
import LocationIcon from '@/assets/images/shapes/location_icon.svg?react';
import FavIcon from '@/assets/images/shapes/FavIcon.svg?react';
import type { aqars } from '@/shared/model/home';
import { useTranslation } from 'react-i18next';
import { checkFileType } from '@/shared/utils/checkFileType';
import { Video } from '@/shared/components/Video';
import { useAuth } from '@/shared/context/AuthProvider';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import useApi from '@/shared/hooks/useApi';

type props = {
  cardData: aqars;
  refetch?: () => void;
};

export const RealEstateCard: React.FC<props> = ({ cardData, refetch }) => {
  const [isLiked, setIsLiked] = useState(cardData.is_liked);
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    id,
    title,
    for_txt,
    price,
    location: { address },
    image,
  } = cardData;

  const { VITE_AQARS } = import.meta.env;

  const { data, mutate, isSuccess } = useApi.post(`${VITE_AQARS}/${id}/like`);

  const handleAqarsLike = async () => {
    if (user?.access_token) {
      try {
        await mutate();
      } catch (error) {
        toast.error('An error occurred while processing your request');
      }
    } else {
      toast.error('You Have To Sign In First or Activate Your Account');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsLiked(data?.data.like);
      if (refetch) refetch();

      if (data?.data.like) {
        toast.success('You Have Successfully Liked This Aqar');
      } else {
        toast.success('This Aqar Removed From Favorites');
      }
    }
  }, [isSuccess, data]);

  return (
    <>
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
            className={`button__ add_to_fav__ ${isLiked ? 'active' : ''}`}
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
