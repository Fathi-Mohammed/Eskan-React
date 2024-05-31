import { Spinner } from 'react-bootstrap';
import styles from './styles.module.scss';
import Image from '@/assets/images/logo.svg';

type Iprops = {
  visible: boolean
}

export const Loader = ({visible} : Iprops) => {
  return (
    <div className={`${styles.loader} ${visible ? '' : styles.hidden }`}>
      <figure className={styles.logo}>
        <img src={Image} alt="" />
      </figure>

      <Spinner className={styles.spinner} animation="border" />
    </div>
  );
};
