import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NoData } from './components';
import useApi from '@/shared/hooks/useApi';
import { RealEstateCard, RealEstateLoadingCard } from '@/shared/components';
import { Pagination } from 'antd';

export const Favorites = () => {
  const [page, setPage] = useState(1);

  const { VITE_FAVORITES } = import.meta.env;
  const {
    data: favData,
    isLoading,
    refetch,
  } = useApi.get(`${VITE_FAVORITES}?page=${page}`);
  const { data, pagination } = favData || {};
  const { total, currentPage, perPage } = pagination || {};
  return (
    <main className="default_page">
      <Container>
        <div className="page_head_wrapper">
          <h1 className="page_main_title__">المفضلة</h1>
        </div>
        <Row className="row_modify with_row_gap">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <RealEstateLoadingCard />
              </Col>
            ))}
          {!isLoading && data && data.length > 0 ? (
            data.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <RealEstateCard cardData={item} refetch={refetch} />
              </Col>
            ))
          ) : (
            <NoData />
          )}
        </Row>
        {data && data.length > 0 && pagination && (
          <Pagination
            defaultCurrent={currentPage}
            total={total}
            pageSize={perPage}
            onChange={(page) => setPage(page)}
          />
        )}
      </Container>
    </main>
  );
};
