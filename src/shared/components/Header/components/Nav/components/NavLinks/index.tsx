import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import HomeIcon from '@/assets/images/shapes/header_shapes/home_icon.svg?react';
import AdsIcon from '@/assets/images/shapes/header_shapes/advertisements_icon.svg?react';

import styles from './styles.module.scss';

interface isActiveProps {
  isActive: boolean;
}

type props = {
  onClick: () => void;
};
export const NavLinks = ({ onClick }: props) => {
  const { t } = useTranslation();

  const navLinkClass = ({ isActive }: isActiveProps) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;
  return (
    <ul className={styles.navLinks}>
      <li className={styles.listItem}>
        <NavLink onClick={onClick} className={navLinkClass} to="/">
          <div className={styles.imgWrapper}>
            <HomeIcon />
          </div>
          {t('Home')}
        </NavLink>
      </li>
      <li className={styles.listItem}>
        <NavLink onClick={onClick} className={navLinkClass} to="/aqars">
          <div className={styles.imgWrapper}>
            <AdsIcon />
          </div>
          {t('header.ads')}
        </NavLink>
      </li>
    </ul>
  );
};
