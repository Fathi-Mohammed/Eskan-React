import React from 'react';
import { Container } from 'react-bootstrap';
import NotFound from '@/assets/images/shapes/notFound.svg?react';

import styles from './styles.module.scss';

type props = {
  error: string;
};

export const FetchingError: React.FC<props> = ({ error }) => {
  console.error(error);
  return (
    <main className="default_page">
      <Container>
        <div className={styles.wrapper}>
          <NotFound />
          <h1 className={styles.mainTitle}>We Have A Problem</h1>
          <h2 className={styles.title}>we cant found this page</h2>
        </div>
      </Container>
    </main>
  );
};
