import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FilterControllers, FilterResults } from './components';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { message } from 'antd';
import { buildQueryString } from './utils/buildQueryString';
import useApi from '@/shared/hooks/useApi';

export const RealEstates: React.FC = () => {
  const [filterData, setFilterData] = useState({
    purpose: '',
    for: '',
    aqar_category_id: '',
    area_id: '',
    city_id: '',
  });

  const queryString = buildQueryString(filterData);

  const { VITE_AQARS } = import.meta.env;

  const { isLoading, isError, error, data, isRefetching, refetch } = useApi.get(
    VITE_AQARS,
    {},
    queryString,
  );
  const { aqars, filter_form } = data?.data || {};

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
    <>
      {(isLoading || isRefetching) && <h1>Loading...</h1>}
      <main className={`${styles.realEstates} default_section`}>
        <Container>
          <div className="section_head_wrapper">
            <h2 className="section_main_title__">الإعلانات</h2>
          </div>

          <FilterControllers
            data={filter_form}
            handleSelectChange={handleSelectChange}
          />
          <FilterResults cardData={aqars} />

          <Link
            to="/aqars"
            className="link primary__ outline__ fixed_size__ main_rounded__ center margin_top"
          >
            عرض المزيد
          </Link>
        </Container>
      </main>
    </>
  );
};
