import { useAuth } from '@/shared/context/AuthProvider';
import { NavLinks } from './components/NavLinks';
import { ToolBar } from './components/ToolBar';
import styles from './styles.module.scss';
import Logo from '@/assets/images/logo.png';

interface navProps {
  onClick: () => void;
  isNavOpen: boolean;
}
export const Nav = ({ onClick, isNavOpen }: navProps) => {
  const { user } = useAuth();
  return (
    <nav
      className={`${styles.nav}  ${user?.access_token ? styles.userLogoedIn : ''} ${isNavOpen ? styles.open : ''}`}
    >
      <figure className={styles.logo}>
        <img src={Logo} alt="logo" />
      </figure>
      <NavLinks onClick={onClick} />
      <ToolBar onClick={onClick} />
      <button onClick={onClick} className={styles.closeButton}></button>
    </nav>
  );
};
