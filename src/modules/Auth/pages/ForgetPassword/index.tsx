import { Container } from 'react-bootstrap';
import { AuthTitle } from '../../components/AuthTitle';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { tabTitle } from '@/shared/utils/tabTitle';
import { Input } from '../../components';
import { useState } from 'react';
import { FORGET } from '@/shared/services/api/Api';
import { useNavigate } from 'react-router-dom';
import useMutationData from '@/shared/hooks/useMutationData';

export const ForgetPassword = () => {
  const [mobile, setMobile] = useState('');
  const { t } = useTranslation();
  tabTitle(t('forgetPassword'));

  const navegate = useNavigate();

  const { mutateAsync, isSuccess, data, isError, error } = useMutationData(
    FORGET,
    {
      mobile,
    },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    await mutateAsync();

    if (isSuccess) {
      console.log(data);
      if (data.status === 'success') {
        navegate('/auth/validation', {
          state: { mobile, session: 'forgetPassword' },
        });
      }
    }

    if (isError) {
      console.log(error);
    }

    // const res = await Axios.post(FORGET, { mobile });

    // if (res.status === 200) {
    //   window.localStorage.setItem('mobile', mobile);
    //   window.localStorage.setItem('last_session', 'forgetPassword');

    //   setMobile('');
    //   navegate('/auth/validation');
    // }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <AuthTitle
          center
          title={t('forgetPasswordTitle')}
          subtitle={t('forgetPasswordSubtitle')}
        />
        <form onSubmit={handleSubmit}>
          <Input
            icon="phone"
            className="input mb-4"
            type="text"
            placeholder={t('phoneNumber')}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button
            className={`link primary__ full_width main_rounded__ mb-4 ${styles.link}`}
          >
            {t('sendCode')}
          </button>
        </form>
      </div>
    </Container>
  );
};
