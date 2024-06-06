import { Container } from 'react-bootstrap';
import { AuthTitle } from '../../components/AuthTitle';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { tabTitle } from '@/shared/utils/tabTitle';
import { Input } from '../../components';
import { RESET } from '@/shared/services/api/Api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Axios from '@/shared/services/Axios';
import useMutationData from '@/shared/hooks/useMutationData';

export const SetNewPassword = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    mobile: location.state.mobile,
    code_id: location.state.code_id,
    password: '',
    confirmPassword: '',
  });
  const { t } = useTranslation();
  tabTitle(t('forgetPassword'));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutateAsync, isSuccess, data } = useMutationData(RESET, formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync();
    if (isSuccess) {
      if (data.status === 'success') {
        navigate('/auth/sign-in');
      }
    }
  };

  return (
    <Container>
      <div className="default_form">
        <AuthTitle
          center
          title={t('auth.newPasswordTitle')}
          subtitle={t('auth.newPasswordSubtitle')}
        />
        <form onSubmit={handleSubmit}>
          <Input
            icon="password"
            className="input mb-4"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t('auth.newPasswordPlaceholder')}
          />
          <Input
            icon="password"
            className="input mb-4"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={t('auth.newPasswordConfirmPlaceholder')}
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
