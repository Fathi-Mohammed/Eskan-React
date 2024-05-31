import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FilterControllers, FilterResults } from './components';
import styles from './styles.module.scss';
import { AQARS } from '@/shared/services/api/Api';
import useFetch from '@/shared/hooks/useFetch';
import { message, Pagination } from 'antd';
import { buildQueryString } from './utils/buildQueryString';
import { useTranslation } from 'react-i18next';
import { tabTitle } from '@/shared/utils/tabTitle';

export const RealEstates: React.FC = () => {
  const { t } = useTranslation();
  tabTitle(t('pages.ads'));
  const [filterData, setFilterData] = useState({
    purpose: '',
    for: '',
    aqar_category_id: '',
    area_id: '',
    city_id: '',
    page: 1,
  });

  const queryString = buildQueryString(filterData);

  const { isLoading, isError, error, data, isRefetching } = useFetch(
    AQARS,
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
          <Pagination
            defaultCurrent={currentPage}
            total={total}
            pageSize={perPage}
            onChange={(page) => setFilterData({ ...filterData, page })}
          />
        </Container>
      </main>
    </>
  );
};
