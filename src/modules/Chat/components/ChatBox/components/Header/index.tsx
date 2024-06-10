import React, { useEffect } from 'react';
import { Image } from '@/shared/components';
import TimeIcon from '@/assets/images/shapes/time_icon.svg?react';
import TrashIcon from '@/assets/images/shapes/trash.svg?react';

import styles from './styles.module.scss';
import useApi from '@/shared/hooks/useApi';

type props = {
  name: string;
  image: string;
  lastMessageDate: string;
  user: number | null;
};

export const Header: React.FC<props> = ({
  name,
  image,
  lastMessageDate,
  user,
}) => {
  const { VITE_CHAT } = import.meta.env;
  const { data, mutate, isSuccess } = useApi.remove(
    `${VITE_CHAT}/${user}/delete`,
  );

  const handleClick = () => {
    if (user) {
      mutate();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  });
  return (
    <div className={styles.header}>
      <div className={styles.contact}>
        <div className={styles.imageWrapper}>
          <Image src={image || ''} alt="user" />
          <span className={styles.status} />
        </div>
        <div className={styles.infoWrapper}>
          <h3 className={styles.name}>{name || 'Unknown User'}</h3>
          <span className={styles.date}>
            <TimeIcon />
            آخر محادثة : {lastMessageDate}
          </span>
        </div>
      </div>

      <button onClick={handleClick} className="button chatDelete">
        <TrashIcon />
        حذف المحادثة
      </button>
    </div>
  );
};
