import React from 'react';
import styles from './styles.module.scss';
import { Skeleton } from '../Skeleton';
import { Image } from '../Image';

export const RealEstateLoadingCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <Image src="" asp={83.96624472} />
      </div>
      <Skeleton height={2} width={20} style={{ marginBottom: '2rem' }} />
      <Skeleton style={{ marginBottom: '2rem' }} count={3} space={1} />
      <Skeleton height={2} width={15} />
    </div>
  );
};
