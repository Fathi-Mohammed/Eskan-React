import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthTitle } from '../../components';
import { useTranslation } from 'react-i18next';
import { tabTitle } from '@/shared/utils/tabTitle';
import { LOGIN } from '@/shared/services/api/Api';
import { useAuth } from '@/shared/context/AuthProvider';

import Logo from '@/assets/images/register/logo.svg?react';
import styles from './styles.module.scss';
import { notification, Form, Input } from 'antd';
import useMutationData from '@/shared/hooks/useMutationData';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type FieldType = {
  mobile: string;
  password: string;
};

export const SignIn = () => {
  const [formData, setFormData] = useState<FieldType>();

  const [api, contextHolder] = notification.useNotification();

  const context = useAuth();

  const { login } = context;

  const navigate = useNavigate();

  const location = useLocation();
  const from = location?.state?.from || '/';

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

  const {
    mutateAsync: tryLogin,
    isLoading: isTryingLogin,
    isSuccess,
    data,
    error,
  } = useMutationData(LOGIN, formData);

  const handleSubmit = async (value: FieldType) => {
    setFormData(value);
    if (isTryingLogin) return;
    try {
      await tryLogin();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      if (data.status === 'success') {
        openNotificationWithIcon('success', 'Login Success', data.message);
        login(data.data);
        setTimeout(() => navigate(from), 1000);
      } else {
        openNotificationWithIcon('error', 'Login Failed', data.message);
      }
    } else if (error) {
      openNotificationWithIcon('error', 'Login Failed', error.message);
    }
  }, [isSuccess, error]);

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
            <Form onFinish={handleSubmit} className={styles.form}>
              <Form.Item<FieldType>
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: 'Please input your mobile number!',
                  },
                ]}
              >
                <Input className="input" placeholder="Mobile" />
              </Form.Item>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input
                  className="input"
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Link to="/auth/forget-password" className={styles.forgetLink}>
                {t('forgetPassword')}
              </Link>
              <button
                type="submit"
                className={`link primary__ full_width main_rounded__ mb-4 ${styles.link}`}
                disabled={isTryingLogin}
              >
                {t('login')}
              </button>
              <Link
                to="/auth/sign-up"
                className={`link primary__ full_width main_rounded__ outline__ ${styles.link}`}
              >
                {t('signUp')}
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
