import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Select } from 'antd';
import FilterIcon from '@/assets/images/shapes/filter_icon.svg?react';
import type { filterData, cities as CityType } from '@/shared/model/home';

import styles from './styles.module.scss';
import { LoadingContent } from './LoadingContent';

type props = {
  data: filterData;
  isLoading: boolean;
  handleSelectChange: (value: string, type: string) => void;
};

export const FilterControllers: React.FC<props> = ({
  data,
  handleSelectChange,
  isLoading,
}) => {
  const [cities, setCities] = useState<CityType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(!isLoading);

  const handleAreaChange = (value: string, type: string) => {
    const selectedAreaObj = data?.areas.find((area) => area.value === value);
    handleSelectChange(value, type);
    if (selectedAreaObj) {
      setCities(selectedAreaObj.cities);
      setSelectedCity(null); // Reset selected city
    } else {
      setCities([]);
      setSelectedCity(null); // Reset selected city
    }
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    handleSelectChange(value, 'city_id');
  };

  useEffect(() => {
    if (isLoading) {
      setIsDataLoaded(true);
    }
  }, []);

  return (
    <div className={styles.filterControllers}>
      {!isDataLoaded && <LoadingContent />}
      <Row className="row_modify with_row_gap">
        <Col className="d-flex align-items-center" sm={12} md={6} lg={2}>
          <h3 className={styles.title}>
            <div className={styles.filterIcon}>
              <FilterIcon />
            </div>
            فلترة النتائج
          </h3>
        </Col>
        <Col sm={12} md={6} lg={2}>
          <Select
            placeholder="حسب النوع"
            onChange={(value) => handleSelectChange(value, 'aqar_category_id')}
            options={data?.categories}
          />
        </Col>
        <Col sm={12} md={6} lg={2}>
          <Select
            placeholder="فئة العقار"
            onChange={(value) => handleSelectChange(value, 'purpose')}
            options={data?.purpose}
          />
        </Col>
        <Col sm={12} md={6} lg={2}>
          <Select
            placeholder="الغرض"
            onChange={(value) => handleSelectChange(value, 'for')}
            options={data?.for}
          />
        </Col>
        <Col sm={12} md={6} lg={2}>
          <Select
            placeholder="المنطقة"
            onChange={(value) => handleAreaChange(value, 'area_id')}
            options={data?.areas}
          />
        </Col>
        <Col sm={12} md={6} lg={2}>
          <Select
            placeholder="المدينة"
            value={selectedCity}
            onChange={handleCityChange}
            options={cities}
          />
        </Col>
      </Row>
    </div>
  );
};
