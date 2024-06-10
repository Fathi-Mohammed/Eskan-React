import { useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthTitle, Input } from '../../components';
import { useTranslation } from 'react-i18next';
import { tabTitle } from '@/shared/utils/tabTitle';
import { SIGNUP } from '@/shared/services/api/Api';
import useMutationData from '@/shared/hooks/useMutationData';

import Logo from '@/assets/images/register/logo.svg?react';
import styles from './styles.module.scss';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const { mutate, isSuccess, isError, error, isPending } = useMutationData(
    SIGNUP,
    formData,
  );

  const { t } = useTranslation();
  tabTitle(t('auth.loginTitle'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await mutate();
    localStorage.setItem('mobile', formData.mobile);

    if (isSuccess) {
      window.localStorage.setItem('mobile', formData.mobile);
      setFormData({
        name: '',
        mobile: '',
        password: '',
        confirmPassword: '',
      });

      window.localStorage.setItem('last_session', 'signUp');

      navigate('/auth/validation', {
        state: { mobile: formData.mobile, session: 'signUp' },
      });
    }

    if (isError) {
      console.log(error);
    }
  };

  const inputs = [
    {
      icon: 'user',
      content: t('auth.nameError'),
      name: 'name',
      className: 'input',
      type: 'text',
      onChange: handleChange,
      required: true,
      placeholder: t('auth.name'),
    },
    {
      icon: 'phone',
      name: 'mobile',
      className: 'input',
      type: 'text',
      content: t('auth.phoneNumberError'),
      onChange: handleChange,
      pattern: '^05[0-9]{8}$',
      required: true,
      placeholder: t('auth.phoneNumber'),
    },
    {
      icon: 'password',
      name: 'password',
      className: 'input',
      type: 'password',
      onChange: handleChange,
      required: true,
      pattern: '^.{8,}$',
      placeholder: t('auth.password'),
      content: t('auth.passwordError'),
    },
    {
      icon: 'password',
      name: 'confirmPassword',
      className: 'input',
      type: 'password',
      onChange: handleChange,
      required: true,
      pattern: formData.password,
      placeholder: t('auth.confirmPassword'),
      content: t('auth.confirmPasswordError'),
    },
  ];

  return (
    <div>
      <Container>
        <Row className="row_modify with_row_gap items_center__">
          <Col xs={12} lg={6}>
            <Logo />
            <AuthTitle
              title={t('auth.signUpTitle')}
              subtitle={t('auth.signUpSubtitle')}
            />
          </Col>
          <Col xs={12} lg={6}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {inputs.map((input) => (
                <Input
                  key={input.name}
                  icon={input.icon}
                  content={input.content}
                  name={input.name}
                  className={input.className}
                  type={input.type}
                  onChange={input.onChange}
                  required={input.required}
                  pattern={input.pattern}
                  placeholder={input.placeholder}
                />
              ))}
              <button
                disabled={
                  !formData.name ||
                  !formData.mobile ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  isPending
                }
                className={`button primary__ full_width main_rounded__ ${styles.link}`}
              >
                {t('auth.signUp')}
                {isPending && <Spinner animation="border" size="sm" />}
              </button>
              <Link
                to="/auth/sign-up"
                className={`link primary__ full_width main_rounded__ outline__ ${styles.link}`}
              >
                {t('auth.alreadyHaveAccount')}
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
