import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Image } from '@/shared/components';

import TimeIcon from '@/assets/images/shapes/time_icon.svg?react';

import type { comment } from '../../types/comments';

import styles from './styles.module.scss';

type props = {
  data: comment[];
};

export const Cards: React.FC<props> = ({ data }) => {
  return (
    <Row className="row_modify with_row_gap">
      {data?.map(({ id, comment, created_at, user }) => (
        <Col key={id} sm={12} lg={6}>
          <div className={styles.card}>
            <div className={styles.head}>
              <div className={styles.imageWrapper}>
                <Image src={user?.image} asp={100} alt="user" />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{user?.name}</span>
                <span className={styles.date}>
                  <TimeIcon /> {created_at}
                </span>
              </div>
            </div>
            <p className={styles.parag}>{comment}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};
