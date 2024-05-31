import { Link } from 'react-router-dom';
import { SocialIcon } from './components/SocialIcon';
import styles from './styles.module.scss';
import React from 'react';

type props = {
  data: any[];
};

export const SocialList: React.FC<props> = ({ data }) => {
  return (
    <ul className={styles.socialList}>
      {data?.map(({ id, key, value }) => (
        <li key={id}>
          <Link
            className={styles.link}
            target="_blank"
            rel="noreferrer"
            to={value}
          >
            <SocialIcon className={styles.icon} iconName={key} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
