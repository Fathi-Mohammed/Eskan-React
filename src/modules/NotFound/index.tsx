import React from 'react';
import { Container } from 'react-bootstrap';
import NotFoundIcon from '@/assets/images/shapes/notFound.svg?react';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type props = {
  error?: string;
};

export const NotFound: React.FC<props> = ({ error }) => {
  console.error(error);
  return (
    <main className="default_page">
      <Container>
        <div className={styles.wrapper}>
          <NotFoundIcon />
          <h1 className={styles.mainTitle}>We Have A Problem</h1>
          <h2 className={styles.title}>we cant found this page</h2>
          <Link to={'/'} replace className={styles.link}>
            Back to Home
          </Link>
        </div>
      </Container>
    </main>
  );
};
