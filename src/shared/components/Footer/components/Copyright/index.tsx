import { RiCopyrightLine } from 'react-icons/ri';
import styles from './styles.module.scss';

export const Copyright = () => {
  return (
    <div className={styles.copyright}>
      <RiCopyrightLine />
      جميع الحقوق محفوظة - إسكان للتعمير والعقارات
    </div>
  );
};
