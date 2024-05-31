import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Contacts, Copyright, NavLinks, SocialList } from './components';

type socials = {
  id: number;
  key: string;
  value: string;
};

type footerData = {
  footer_logo: string;
  mobile: string;
  socials: socials[];
};

type props = {
  data: footerData;
};

export const Footer: React.FC<props> = ({ data }) => {
  const { t } = useTranslation();

  const { footer_logo, mobile, socials } = data || {};

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div>
            <div className={styles.logo}>
              <img src={footer_logo} alt="logo" />
            </div>
          </div>
          <div>
            <h2 className={styles.footerTitle}>{t('footer.quickLinks')}</h2>
            <NavLinks />
          </div>
          <div>
            <h2 className={styles.footerTitle}>{t('footer.contacts')}</h2>
            <Contacts data={mobile} />
            <h2 className={styles.footerTitle}>{t('footer.followUs')}</h2>
            <SocialList data={socials} />
          </div>
        </div>
        <Copyright />
      </Container>
    </footer>
  );
};
