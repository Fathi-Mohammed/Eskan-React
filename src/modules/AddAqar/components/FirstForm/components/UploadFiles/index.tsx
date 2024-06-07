import React, { useState } from 'react';
import UploadFileIcon from '@/assets/images/shapes/upload_file_icon.svg?react';
import { Image, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

import styles from './styles.module.scss';

type FileType = File;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type Props = {
  setForm: (formUpdate: any) => void;
  formData: any;
};

export const UploadFiles: React.FC<Props> = ({ setForm, formData }) => {
  const files = formData.files.map((file) => {
    const url = URL.createObjectURL(file);
    return { ...file, url };
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(files || []);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const formDataToSubmit = new FormData();

    newFileList.forEach((file) => {
      formDataToSubmit.append('files', file.originFileObj as FileType);
    });

    setForm((prevForm) => ({
      ...prevForm,
      files: formDataToSubmit.getAll('files'),
    }));
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid),
    );
  };

  const uploadButton = (
    <div className={styles.uploadButton}>
      <div className={styles.uploadIcon}>
        <UploadFileIcon />
      </div>
      <div className={styles.uploadText}>
        <span>أرفق ملفات الإعلان</span>
        <span>قم بإرفاق صور وفيديو توضيحية للإعلان</span>
      </div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        multiple
        beforeUpload={() => false}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Image
        wrapperStyle={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(''),
        }}
        src={previewImage}
      />
    </>
  );
};
