import React from 'react';
import { Container } from 'react-bootstrap';
import { Nav } from './components/Nav';
import { FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useHeaderState } from './hooks/useHeaderState';
import { useScrollEffect } from './hooks/useScrollEffect';

type props = {
  data?: any;
};

export const Header: React.FC<props> = ({ data }) => {
  const { isNavOpen, handleNavToggle, headerHeight, headerRef } =
    useHeaderState();
  const { FixedHeaderRef } = useScrollEffect(headerHeight);
  return (
    <header ref={headerRef} className={styles.header}>
      <div ref={FixedHeaderRef} className={styles.headerContentWrapper}>
        <Container>
          <div className={styles.headerContent}>
            <Link to="/" className={styles.logo}>
              <figure>
                <img src={data.logo} alt="logo" />
              </figure>
            </Link>

            <Nav onClick={handleNavToggle} isNavOpen={isNavOpen} />
            <button onClick={handleNavToggle} className={styles.navToggle}>
              <FaBars />
            </button>
          </div>
        </Container>
      </div>
      <div
        onClick={handleNavToggle}
        className={`${styles.overlay} ${isNavOpen ? `${styles.active}` : ''}`}
      ></div>
    </header>
  );
};
