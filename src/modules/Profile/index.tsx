import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import styles from './styles.module.scss';
import { Image, Rating } from '@/shared/components';
import { Loader } from '@/shared/components/Loader';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthProvider';
import useApi from '@/shared/hooks/useApi';

type formData = {
  name: string;
  image?: any;
};

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<formData>({
    name: '',
  });
  const { data, isLoading, isError, error, isSuccess } =
    useApi.get('myprofile');
  const { image, name, rate, mobile } = data?.data || {};
  const { updateUser } = useAuth();

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formDataToSubmit = new FormData();

    if (e.target.files) {
      const file = e?.target?.files?.[0];
      const url = URL.createObjectURL(file!);
      file['url'] = url;
      formDataToSubmit.append('file', file);
    }
    setFormData({ ...formData, image: formDataToSubmit.get('file') || '' });
  };

  const {
    data: userData,
    mutate,
    isSuccess: isMutationSuccess,
  } = useApi.post('profile/edit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const handleSubmit = async () => {
    try {
      await mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setFormData({ ...formData, name: name || '' });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isMutationSuccess) {
      updateUser(userData.data);
    }
  }, [isMutationSuccess]);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <Loader visible={isLoading} />;

  return (
    <main className="default_page defaultForm">
      <Container>
        <div className={styles.formWrapper}>
          <label htmlFor="image" className={styles.profileImageWrapper}>
            <Image asp={100} src={formData.image?.url || image} />
            <input
              type="file"
              className="d-none"
              accept="image/*"
              id="image"
              onChange={handleFileInputChange}
              name="image"
            />
          </label>
          <h3 className={styles.name}>مرحبا , {formData.name}</h3>
          <Rating data={rate} color="yellow" center />
          <input
            className="input"
            onChange={handleChangeInputs}
            name="name"
            type="text"
            value={formData.name || ''}
          />
          <input
            className="input readOnly"
            name="mobile"
            type="number"
            value={mobile || ''}
            readOnly
          />
          <button
            className="button primary__ full_width main_rounded__"
            onClick={handleSubmit}
          >
            حفظ التعديلات
          </button>
          <Link className="" to="/profile/change_password">
            تغيير كلمة المرور
          </Link>
          <Link className="" to="/profile/mobile">
            تغيير رقم الجوال
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default Profile;
