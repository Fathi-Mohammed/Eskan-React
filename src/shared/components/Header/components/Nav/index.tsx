import { NavLinks } from './components/NavLinks';
import { ToolBar } from './components/ToolBar';
import styles from './styles.module.scss';
import Logo from '@/assets/images/logo.png';

interface navProps {
  onClick: () => void;
  isNavOpen: boolean;
}
export const Nav = ({ onClick, isNavOpen } : navProps) => {
  return (
    <nav className={`${styles.nav} ${isNavOpen ? styles.open : ''}`}>
      <figure className={styles.logo}>
        <img src={Logo} alt="logo" />
      </figure>
      <NavLinks onClick={onClick} />
      <ToolBar onClick={onClick} />
      <button onClick={onClick} className={styles.closeButton}></button>
    </nav>
  );
};
