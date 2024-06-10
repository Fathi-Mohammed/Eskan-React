import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FilterControllers, FilterResults } from './components';
import styles from './styles.module.scss';
import { Pagination, message } from 'antd';
import { buildQueryString } from './utils/buildQueryString';
import useApi from '@/shared/hooks/useApi';

const RealEstates: React.FC = () => {
  const [filterData, setFilterData] = useState({
    purpose: '',
    for: '',
    aqar_category_id: '',
    area_id: '',
    city_id: '',
    page: 1,
  });

  const queryString = buildQueryString(filterData);

  const { VITE_AQARS } = import.meta.env;

  const { isLoading, isError, error, data, refetch, isRefetching } = useApi.get(
    VITE_AQARS,
    {},
    queryString,
  );
  const { aqars, filter_form } = data?.data || {};
  const { total, currentPage, perPage } = data?.pagination || {};

  const handleSelectChange = function (value: string | number, type: string) {
    setFilterData({
      ...filterData,
      [type]: value,
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isError) message.error(error.message);

  return (
    <main className={`${styles.realEstates} default_page`}>
      <Container>
        <div className="section_head_wrapper">
          <h2 className="section_main_title__">الإعلانات</h2>
        </div>

        <FilterControllers
          data={filter_form}
          handleSelectChange={handleSelectChange}
          isLoading={isLoading}
        />
        <FilterResults cardData={aqars} isLoading={isRefetching || isLoading} />

        <Pagination
          defaultCurrent={currentPage}
          total={total}
          pageSize={perPage}
          onChange={(page) => setFilterData({ ...filterData, page })}
        />
      </Container>
    </main>
  );
};

export default RealEstates;
