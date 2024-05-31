import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { RealEstateCard } from '@/shared/components';
import type { aqars } from '@/shared/model/home';

import styles from './styles.module.scss';

type props = {
  cardData: aqars[];
};
export const Related: React.FC<props> = ({ cardData }) => {
  return (
    <div>
      <h3 className={styles.title}>إعلانات مشابهة</h3>
      <Row className="row_modify with_row_gap">
        {cardData &&
          cardData.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <RealEstateCard cardData={item} />
            </Col>
          ))}
      </Row>
    </div>
  );
};
