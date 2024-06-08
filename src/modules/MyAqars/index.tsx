import { RealEstateCard, RealEstateLoadingCard } from '@/shared/components';
import useApi from '@/shared/hooks/useApi';
import { Pagination } from 'antd';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { buildQueryString } from '../RealEstates/utils/buildQueryString';
import { MyAqarCard } from './components';
import { NoData } from './components/NoData';

export const MyAqars: React.FC = () => {
  const [filterData, setFilterData] = useState({
    page: 1,
  });
  const queryString = buildQueryString(filterData);
  const { VITE_MY_AQARS } = import.meta.env;
  const { isLoading, data, refetch } = useApi.get(
    VITE_MY_AQARS,
    {},
    queryString,
  );
  const { data: cardData, pagination } = data || {};
  const { total, currentPage, perPage } = pagination || {};

  if (isLoading) return <h1>Loading</h1>;

  return (
    <main className="default_page">
      <Container>
        <div className="section_head_wrapper">
          <h2 className="section_main_title__">اعلاناتي</h2>
        </div>
        {!isLoading && cardData.length === 0 ? (
          <NoData />
        ) : (
          <>
            <Row className="row_modify with_row_gap">
              {!isLoading &&
                cardData?.map((item) => (
                  <Col key={item.id} xs={12} sm={6} md={4} lg={4}>
                    <MyAqarCard data={item} refetch={refetch} />
                  </Col>
                ))}
            </Row>
            <Pagination
              defaultCurrent={currentPage}
              total={total}
              pageSize={perPage}
              onChange={(page) => setFilterData({ ...filterData, page })}
            />
          </>
        )}
      </Container>
    </main>
  );
};
