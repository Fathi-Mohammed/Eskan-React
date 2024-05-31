import React from 'react';
import { Col, Row } from 'react-bootstrap';
import type { aqars } from '@/shared/model/home';
import { RealEstateCard } from '@/shared/components';

type props = {
  cardData: aqars[];
};
export const FilterResults: React.FC<props> = ({ cardData }) => {
  return (
    <Row className="row_modify with_row_gap">
      {cardData &&
        cardData.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <RealEstateCard cardData={item} />
          </Col>
        ))}
    </Row>
  );
};
