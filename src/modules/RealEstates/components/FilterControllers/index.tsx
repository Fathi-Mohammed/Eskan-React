import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Select } from 'antd';
import FilterIcon from '@/assets/images/shapes/filter_icon.svg?react';
import type { filterData, cities } from '@/shared/model/home';

import styles from './styles.module.scss';

type props = {
  data: filterData;
  handleSelectChange: (value: string, type: string) => void;
};

export const FilterControllers: React.FC<props> = ({
  data,
  handleSelectChange,
}) => {
  const [cities, setCities] = useState<cities[]>([]);

  const handleAreaChange = (value: string, type: string) => {
    const selectedAreaObj = data?.areas.find((area) => area.value === value);
    handleSelectChange(value, type);
    if (selectedAreaObj) {
      setCities(selectedAreaObj.cities);
    } else {
      setCities([]);
    }
  };

  return (
    <div className={styles.filterControllers}>
      <Row className="row_modify with_row_gap">
        <Col sm={12} md={6} lg={2}>
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
            onChange={(value) => handleSelectChange(value, 'city_id')}
            options={cities}
          />
        </Col>
      </Row>
    </div>
  );
};
