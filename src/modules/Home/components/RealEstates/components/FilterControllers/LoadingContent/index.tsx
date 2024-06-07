import { Skeleton } from '@/shared/components';
import { Col, Row } from 'react-bootstrap';
import styles from './styles.module.scss';
import React from 'react';

export const LoadingContent: React.FC = () => {
  return (
    <Row className="row_modify with_row_gap">
      <Col sm={12} md={6} lg={2}>
        <div className={styles.title}>
          <Skeleton height={4.4} radius={50} />
          <Skeleton height={3} radius={1} />
        </div>
      </Col>
      <Col sm={12} md={6} lg={2}>
        <Skeleton height={6.6} radius={3.5} />
      </Col>
      <Col sm={12} md={6} lg={2}>
        <Skeleton height={6.6} radius={3.5} />
      </Col>
      <Col sm={12} md={6} lg={2}>
        <Skeleton height={6.6} radius={3.5} />
      </Col>
      <Col sm={12} md={6} lg={2}>
        <Skeleton height={6.6} radius={3.5} />
      </Col>
      <Col sm={12} md={6} lg={2}>
        <Skeleton height={6.6} radius={3.5} />
      </Col>
    </Row>
  );
};
