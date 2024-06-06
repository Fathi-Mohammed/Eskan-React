import React from 'react';
import { Link } from 'react-router-dom';
import CallIcon from '@/assets/images/shapes/phone_icon.svg?react';
import styles from './styles.module.scss';

type props = {
  data: string;
};

export const Contacts: React.FC<props> = ({ data }) => {
  return (
    <div className={styles.contacts}>
      <Link
        to={`callto:${data}`}
        className="link footer_contacts"
        target={'_blank'}
      >
        <CallIcon />
        <span>{data}</span>
      </Link>
    </div>
  );
};
