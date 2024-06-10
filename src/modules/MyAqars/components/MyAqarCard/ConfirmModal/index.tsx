import { Modal } from 'antd';
import React, { useEffect } from 'react';
import CloseIcon from '@/assets/images/shapes/close_modal_button.svg?react';
import DeleteIcon from '@/assets/images/shapes/trash.svg?react';
import styles from './styles.module.scss';
import useApi from '@/shared/hooks/useApi';
import { toast } from 'react-toastify';

type props = {
  id: number | string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

export const ConfirmModal: React.FC<props> = ({
  id,
  refetch,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { VITE_AQARS } = import.meta.env;
  const { data, mutate, isSuccess } = useApi.remove(VITE_AQARS + '/' + id);

  const handleDelete = async () => {
    try {
      await mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      refetch();
      setIsModalOpen(false);
      toast.success('Your Aqar Has Been Deleted Successfully');
    }
  }, [isSuccess, data, refetch, setIsModalOpen]);

  return (
    <Modal
      footer={null}
      closeIcon={<CloseIcon />}
      onCancel={() => setIsModalOpen(false)}
      open={isModalOpen}
    >
      <h3 className={styles.title}>
        <DeleteIcon />
        حذف الإعلان
      </h3>
      <p className={styles.parag}>هل أنت متأكد من حذف هذا الإعلان ؟</p>
      <button
        onClick={handleDelete}
        className="button red__ main_rounded__ full_width deleteModalBtn"
      >
        حذف
      </button>
    </Modal>
  );
};
