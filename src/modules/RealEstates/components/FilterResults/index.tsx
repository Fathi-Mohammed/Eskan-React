import React from 'react';
import { Col, Row } from 'react-bootstrap';
import type { aqars } from '@/shared/model/home';
import { RealEstateCard, RealEstateLoadingCard } from '@/shared/components';

type props = {
  cardData: aqars[];
  isLoading: boolean;
};
export const FilterResults: React.FC<props> = ({ cardData, isLoading }) => {
  return (
    <Row className="row_modify with_row_gap">
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <RealEstateLoadingCard />
          </Col>
        ))}
      {!isLoading &&
        cardData?.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <RealEstateCard cardData={item} />
          </Col>
        ))}
    </Row>
  );
};
