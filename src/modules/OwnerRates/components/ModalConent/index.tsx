import React from 'react';
import ModalIcon from '@/assets/images/shapes/star_modal_icon.svg?react';
import { useTranslation } from 'react-i18next';
import { Modal, Rate } from 'antd';

import styles from './styles.module.scss';
import { Spinner } from 'react-bootstrap';

type props = {
  open: boolean;
  setIsModalOpen: (value: boolean) => void;
  data: {
    comment: string;
    rate: number;
  };
  setData: React.Dispatch<React.SetStateAction<props['data']>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

export const ModalConent: React.FC<props> = ({
  open,
  setIsModalOpen,
  data,
  setData,
  handleSubmit,
  loading,
}) => {
  const { t } = useTranslation();

  const handleRateChange = (value: number) => {
    setData({ ...data, rate: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, comment: e.target.value });
  };

  return (
    <Modal open={open} onCancel={() => setIsModalOpen(false)} footer={null}>
      <div className={styles.titleWrapper}>
        <ModalIcon />
        <div>
          <h3 className={styles.title}>تقييم المعلن</h3>
          <p className={styles.subtitle}>يمكنك تقييم المعلن وكتابة رأيك فيه</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Rate value={data.rate} onChange={handleRateChange} />

        <input
          type="text"
          name="comment"
          value={data.comment}
          onChange={handleChange}
          className={styles.input}
          placeholder={t('comment')}
        />

        <button
          type="submit"
          disabled={loading}
          className="button__ primary__ full_width main_rounded__ submit_rate__btn"
        >
          {t('send')}
          {loading && <Spinner animation="border" />}
        </button>
      </form>
    </Modal>
  );
};
