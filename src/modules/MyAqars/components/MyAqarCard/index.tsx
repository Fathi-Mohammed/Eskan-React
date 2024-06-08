import React, { useState } from 'react';
import { Image } from '@/shared/components';
import type { aqars } from '@/shared/model/home';
import { truncateString } from '@/shared/utils/truncateString';
import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from './ConfirmModal';
import LocationIcon from '@/assets/images/shapes/location_icon.svg?react';
import EditIcon from '@/assets/images/shapes/edit_icon.svg?react';
import DeleteIcon from '@/assets/images/shapes/trash.svg?react';
import styles from './styles.module.scss';

type props = {
  data: aqars;
  refetch: () => void;
};

export const MyAqarCard: React.FC<props> = ({ data, refetch }) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.card}>
      <Link to={`/aqars/${data.id}`} className={styles.header}>
        <div className={styles.imageWrapper}>
          <Image src={data.image} asp={88.659793814} alt={data.title} />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>
            {
              <Popover content={data.title}>
                {truncateString(data.title, 30)}
              </Popover>
            }
          </h3>
          <p className={styles.info}>
            <LocationIcon />
            {
              <Popover content={data.location.address}>
                {truncateString(data.location.address, 20)}
              </Popover>
            }
          </p>
          <p className={styles.price}>
            {data.price} {t('RAS')}
          </p>
        </div>
      </Link>
      <div className={styles.footer}>
        <Link
          className={`link primary__ main_rounded__ ${styles.editBtn}`}
          to={`/aqars/${data.id}/edit`}
        >
          <EditIcon />
          تعديل الإعلان
        </Link>
        <button
          onClick={showModal}
          className={`button__ red__ main_rounded__ ${styles.deleteBtn}`}
        >
          <DeleteIcon />
        </button>
      </div>
      <ConfirmModal
        refetch={refetch}
        id={data.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
