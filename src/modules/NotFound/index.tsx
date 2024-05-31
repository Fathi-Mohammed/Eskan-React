import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';


export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{t('NotFound')}</h1>
    </section>
  );
};
