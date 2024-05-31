import { useState, useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthTitle, Input } from '../../components';
import { useTranslation } from 'react-i18next';
import { tabTitle } from '@/shared/utils/tabTitle';
import { LOGIN } from '@/shared/services/api/Api';
import AuthContext from '@/shared/context/AuthProvider';

import Logo from '@/assets/images/register/logo.svg?react';
import styles from './styles.module.scss';
import { notification } from 'antd';
// import Axios from '@/shared/services/Axios';
import useMutationData from '@/shared/hooks/useMutationData';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });
  const [api, contextHolder] = notification.useNotification();

  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider not found');

  const { login } = context;

  const navigate = useNavigate();

  const { t } = useTranslation();
  tabTitle(t('auth.loginTitle'));

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    mutateAsync: tryLogin,
    isSuccess,
    isLoading: isTryingToLogin,
    data,
  } = useMutationData(LOGIN, formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isTryingToLogin) return;

    await tryLogin();
    if (data.status == 'success') {
      login(data.data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.status === 'success') {
        openNotificationWithIcon('success', 'Success', 'Login Success');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        openNotificationWithIcon('error', 'Error', data?.message);
      }
    }
  }, [isSuccess]);

  return (
    <div>
      {contextHolder}
      <Container>
        <Row className="row_modify with_row_gap items_center__">
          <Col xs={12} lg={6}>
            <Logo />
            <AuthTitle
              title={t('auth.loginTitle')}
              subtitle={t('auth.loginSubtitle')}
            />
          </Col>
          <Col xs={12} lg={6}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Input
                icon="phone"
                name="mobile"
                className="input"
                type="text"
                onChange={handleChange}
                placeholder={t('auth.phoneNumber')}
              />
              <Input
                icon="password"
                name="password"
                className="input"
                type="password"
                onChange={handleChange}
                placeholder={t('auth.password')}
              />
              <Link to="/auth/forget-password" className={styles.forgetLink}>
                {t('forgetPassword')}
              </Link>
              <button
                type="submit"
                className={`link__ primary__ full_width main_rounded__ mb-4 ${styles.link}`}
              >
                {t('login')}
              </button>
              <Link
                to="/auth/sign-up"
                className={`link__ primary__ full_width main_rounded__ outline__ ${styles.link}`}
              >
                {t('signUp')}
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
