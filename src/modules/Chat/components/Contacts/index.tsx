import React from 'react';
import { Image } from '@/shared/components';
import TimeIcon from '@/assets/images/shapes/time_icon.svg?react';
import { FaFile } from 'react-icons/fa';
import styles from './styles.module.scss';
import { truncateString } from '@/shared/utils/truncateString';

type userData = {
  id: number;
  name: string;
  image: string;
  mobile: string;
  rate: number;
};

type contactData = {
  from: {
    id: number;
    name: string;
    image: string;
  };
  from_me?: boolean;
  message?: string | null;
  sent_at: string;
  not_seen_count: number;
  file?: string;
  user: {
    id: number;
    name: string;
    image: string;
  };
};

type props = {
  data: contactData[];
  setUser: (id: number) => void;
  userData?: userData | null;
};

export const Contacts: React.FC<props> = ({ data, setUser, userData }) => {
  const handleClick = (id) => {
    setUser(id);
  };

  return (
    <div className={styles.contacts}>
      {userData && (
        <div
          onClick={() => handleClick(userData.id)}
          className={styles.contactCard}
        >
          <div className={styles.head}>
            <div className={styles.imageWrapper}>
              <Image src={userData.image} alt="user" />
              <span className={styles.status} />
            </div>
            <div className={styles.infoWrapper}>
              <h3 className={styles.name}>{userData.name}</h3>
              <span className={styles.date}>
                رقم الجوال : {userData.mobile}
              </span>
            </div>
          </div>
          <div className={styles.body}>
            <p className={styles.parag}>تقييم: {userData.rate}</p>
          </div>
        </div>
      )}
      {data.length > 0 &&
        data.map((item) => {
          const {
            from,
            message,
            sent_at,
            not_seen_count,
            file,
            user,
            from_me,
          } = item;
          const { id, name, image } = from_me ? user : from;

          return (
            <div
              onClick={() => handleClick(id)}
              key={id}
              className={styles.contactCard}
            >
              <div className={styles.head}>
                <div className={styles.imageWrapper}>
                  <Image src={image} alt="user" />
                  <span className={styles.status} />
                </div>
                <div className={styles.infoWrapper}>
                  <h3 className={styles.name}>{name}</h3>
                  <span className={styles.date}>
                    <TimeIcon />
                    آخر محادثة : {sent_at}
                  </span>
                </div>
              </div>
              <div className={styles.body}>
                <p className={styles.parag}>
                  {file && <FaFile />}
                  {truncateString(message || `${file}`, 30)}
                </p>
                {not_seen_count > 0 && (
                  <span className={styles.count}>{not_seen_count}</span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
