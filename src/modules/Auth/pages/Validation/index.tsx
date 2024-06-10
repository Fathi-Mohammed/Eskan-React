import { Container } from 'react-bootstrap';
import { AuthTitle } from '../../components/AuthTitle';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';
import { tabTitle } from '@/shared/utils/tabTitle';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { ACTIVATE, RESET_CODE } from '@/shared/services/api/Api';
import useMutationData from '@/shared/hooks/useMutationData';

export const Validation = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    mobile: location.state.mobile,
    code: '',
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  tabTitle(t('Validation'));

  const handleChange = (value) => {
    setFormData({ ...formData, code: value });
  };

  const isSetPassword = location.state.session === 'forgetPassword';

  const { mutateAsync, isSuccess, data } = useMutationData(
    isSetPassword ? RESET_CODE : ACTIVATE,
    formData,
  );

  const handleSubmit = async (e) => {
    console.log(isSetPassword ? RESET_CODE : ACTIVATE);
    e.preventDefault();
    await mutateAsync();
    if (isSuccess) {
      if (data.status === 'success') {
        if (isSetPassword) {
          navigate('/auth/new-password', {
            state: {
              mobile: formData.mobile,
              code_id: data.data.code_id,
            },
          });
        }
      }
    }
  };
  return (
    <Container>
      <div className="defaultForm">
        <AuthTitle
          center
          title={t('ValidationTitle')}
          subtitle={t('ValidationSubtitle')}
        />
        <form onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            <Input.OTP length={5} onChange={handleChange} />
          </Form.Item>
          <button
            className={`link primary__ full_width main_rounded__ mb-4 ${styles.link}`}
          >
            {t('verify')}
          </button>
          <div className={styles.resendCodeWrapper}>
            {t('didNotReceiveCode')}
            <button className={styles.resendCode}>{t('resendCode')}</button>
          </div>
        </form>
      </div>
    </Container>
  );
};
