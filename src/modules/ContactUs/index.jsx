import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import styles from './styles.module.scss';
import { tabTitle } from '@/shared/utils/tabTitle';

const ContactUs = () => {
  const { t } = useTranslation();

  tabTitle(t('ContactUs'));

  return (
    <main className={`${styles.contactUsSection} defaultPage `}>
      <Container>
        <div className="page_head_wrapper">
          <h2 className="page_main_title__">{t('contactUsSectionTitle')}</h2>
          <p className="page_sub_title__">{t('contactUsSectionSubTitle')}</p>
        </div>

        <form>
          <div className={styles.inputWrapper}>
            <input className="input" type="text" placeholder={t('firstName')} />
            <input className="input" type="text" placeholder={t('lastName')} />
            <input
              className="input"
              type="number"
              placeholder={t('phoneNumber')}
            />
            <input className="input" type="email" placeholder={t('email')} />
            <textarea
              className="input textarea"
              placeholder={t('message')}
            ></textarea>
            <button className="link primary__ main_rounded__ half_width center">
              {t('send')}
            </button>
          </div>
        </form>
      </Container>
    </main>
  );
};

export default ContactUs;
