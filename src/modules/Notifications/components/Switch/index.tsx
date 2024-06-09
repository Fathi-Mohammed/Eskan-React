import React, { useEffect, useState } from 'react';
import { Switch as AntdSwitch } from 'antd';
import styles from './styles.module.scss';
import useApi from '@/shared/hooks/useApi';
import { useAuth } from '@/shared/context/AuthProvider';

export const Switch: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isChecked, setIsChecked] = useState(user?.notifiable);
  const { VITE_NOTIFICATIONS_TOGGLE } = import.meta.env;
  const { data, isSuccess, refetch, isLoading } = useApi.get(
    VITE_NOTIFICATIONS_TOGGLE,
  );
  const { notify } = data?.data || {};

  const toggleNotifications = async () => {
    await refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsChecked(notify);
      updateUser({ notifiable: notify });
    }
  }, [isSuccess, notify]);

  return (
    <div className={styles.switchWrapper}>
      <div className={styles.switchContent}>
        <span className={styles.title}>إعدادات الإشعارات</span>
        <span className={styles.parag}>{isChecked ? 'فعال' : 'معطلة'}</span>
      </div>
      <AntdSwitch
        onChange={toggleNotifications}
        value={isChecked}
        className="notificationSwitch"
        loading={isLoading}
      />
    </div>
  );
};
