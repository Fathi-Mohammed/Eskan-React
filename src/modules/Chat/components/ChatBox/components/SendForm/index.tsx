import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import ClipIcon from '@/assets/images/shapes/clip.svg?react';
import SendIcon from '@/assets/images/shapes/sendMessage.svg?react';
import { CiImageOn } from 'react-icons/ci';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaFile } from 'react-icons/fa';
import useApi from '@/shared/hooks/useApi';
import styles from './styles.module.scss';

type formData = {
  message?: string;
  file?: File | null;
  to_id: number;
};

type Props = {
  refetch: () => void;
  user: number;
};

export const SendForm: React.FC<Props> = ({ refetch, user }) => {
  const [formData, setFormData] = useState<formData>({
    message: '',
    file: null,
    to_id: user,
  });
  const { VITE_SEND_MESSAGE } = import.meta.env;

  const { data, mutate, isLoading, isSuccess }: any = useApi.post(
    VITE_SEND_MESSAGE,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleFinish = async (e) => {
    console.log(formData.to_id);
    e.preventDefault();
    await mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      refetch();
      setFormData({ ...formData, message: '', file: null });
    }
  }, [data, isSuccess, refetch]);

  return (
    <form className="d-flex flex-column align-self-end" onSubmit={handleFinish}>
      {formData.file && (
        <div className={styles.uploadWrapper}>
          <div className={styles.uploadedFile}>
            {formData.file.type.includes('image') ? <CiImageOn /> : <FaFile />}
            <span>{formData.file ? formData.file.name : ''}</span>
            <button onClick={() => setFormData({ ...formData, file: null })}>
              حذف
            </button>
          </div>
        </div>
      )}
      <div className={styles.formWrapper}>
        <Input
          className={styles.input}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          type="text"
          placeholder="اكتب رسالتك ..."
        />
        <label className={styles.upload} htmlFor="upload">
          <input
            className="d-none"
            onChange={handleUploadChange}
            type="file"
            id="upload"
          />
          <ClipIcon />
        </label>
        <button className="button sendButton" type="submit">
          {isLoading ? (
            <AiOutlineLoading className={styles.loading} />
          ) : (
            <SendIcon />
          )}
        </button>
      </div>
    </form>
  );
};
