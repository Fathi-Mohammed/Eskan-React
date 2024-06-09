import { useAuth } from '@/shared/context/AuthProvider';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AiOutlineGlobal } from 'react-icons/ai';
import { useLanguage } from '@/shared/hooks/useLanguage';

import SearchIcon from '@/assets/images/shapes/header_shapes/header_search_icon.svg?react';
import AddIcon from '@/assets/images/shapes/header_shapes/header_add_icon.svg?react';
import ProfileIcon from '@/assets/images/shapes/header_shapes/header_profile_icon.svg?react';
import NotificationIcon from '@/assets/images/shapes/notification_icon.svg?react';
import FavIcon from '@/assets/images/shapes/header_shapes/FavIcon.svg?react';
import ChatIcon from '@/assets/images/shapes/header_shapes/Chat.svg?react';

import styles from './styles.module.scss';
import { DropDown } from './components';

type props = {
  onClick: () => void;
};

export const ToolBar = ({ onClick }: props) => {
  const context = useAuth();

  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();

  const handleLangButtonClick = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    onClick();
  };
  return (
    <ul
      className={`${styles.toolBar} ${context.user ? styles.userLogoedIn : ''}`}
    >
      <li className={styles.listItem}>
        <div className={styles.searchWrapper}>
          <SearchIcon />
          <input type="text" placeholder={t('search')} />
        </div>
      </li>
      <li className={styles.listItem}>
        <Link
          to="/add-aqar"
          className="button__ secondary__ main_rounded__ fixed_size__ full_width_sm header_add_button__"
        >
          <AddIcon />
          {t('header.addAd')}
        </Link>
      </li>
      {context.user ? (
        <>
          <li className={`${styles.listItem} ${styles.profileButtonItem}`}>
            <Link
              to="/notifications"
              className="button__ secondary__ outline__ full_rounded__ circle__ headerLinks"
            >
              <NotificationIcon />
            </Link>
          </li>
          <li className={`${styles.listItem} ${styles.profileButtonItem}`}>
            <Link
              to="/favorites"
              className="button__ secondary__ outline__ full_rounded__ circle__ headerLinks"
            >
              <FavIcon />
            </Link>
          </li>
          <li className={`${styles.listItem} ${styles.profileButtonItem}`}>
            <Link
              to="/chat"
              className="button__ secondary__ outline__ full_rounded__ circle__ headerLinks"
            >
              <ChatIcon />
            </Link>
          </li>
          <li className={`${styles.listItem} ${styles.profileButtonItem}`}>
            <DropDown />
          </li>
        </>
      ) : (
        <li className={`${styles.listItem} ${styles.profileButtonItem}`}>
          <Link
            to="/auth/sign-in"
            className="button__ secondary__ outline__ full_rounded__ circle__ headerLinks"
          >
            <ProfileIcon />
          </Link>
        </li>
      )}
      <li className={`${styles.listItem} ${styles.langButtonItem}`}>
        <button
          className={`button__ secondary__ outline__ circle__ headerLinks ${styles.langButton}`}
          onClick={handleLangButtonClick}
        >
          <AiOutlineGlobal />
        </button>
      </li>
    </ul>
  );
};
