import React from 'react';
import { useAuth } from '@/shared/context/AuthProvider';
import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '@/shared/components/Image';

import styles from './styles.module.scss';

import ProfileIcon from '@/assets/images/shapes/info_dropdown_links_shapes/profile.svg?react';
import AdvertisementsIcon from '@/assets/images/shapes/info_dropdown_links_shapes/upgrade.svg?react';
import ProductsIcon from '@/assets/images/shapes/info_dropdown_links_shapes/products.svg?react';
import LogOutIcon from '@/assets/images/shapes/info_dropdown_links_shapes/logout.svg?react';

import type { MenuProps } from 'antd';
import useMutationData from '@/shared/hooks/useMutationData';

export const DropDown: React.FC = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const { mutate } = useMutationData('logout');

  const handleLogout = async () => {
    logout();
    try {
      await mutate();
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <ProfileIcon />,
      label: <Link to="/profile">الملف الشخصي</Link>,
    },
    {
      key: '2',
      icon: <AdvertisementsIcon />,
      label: <Link to="/membership">ترقية العضوية</Link>,
    },
    {
      key: '3',
      icon: <ProductsIcon />,
      label: <Link to="/my-aqars">إعلاناتي</Link>,
    },
    {
      key: '4',
      icon: <LogOutIcon />,
      label: (
        <button className="button__" onClick={handleLogout}>
          تسجيل الخروج
        </button>
      ),
    },
  ];

  return (
    <Dropdown placement="bottom" className="54545" menu={{ items }}>
      <div
        className={`button__ secondary__ outline__ full_rounded__ circle__ ${styles.userIcon}`}
      >
        <Image src={user?.image || ''} asp={100} alt="profile" />
      </div>
    </Dropdown>
  );
};
