import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { UploadFiles } from './components';
import { Select } from 'antd';
import { modifySelectObj } from '@/shared/utils/modifySelectObj';
import type { filterData } from '@/shared/model/home';

type props = {
  data: filterData;
};

export const FirstForm: React.FC<props> = ({ data }) => {
  const { for: forData, categories, areas } = data || {};
  const [cities, setCities] = useState([]);
  const [hais, setHais] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedHai, setSelectedHai] = useState(null);

  const citiesRef = useRef(null);

  const handleAreaSelectChange = (value) => {
    const selectedArea = areas.find((item) => item.id === value);
    setCities(selectedArea ? selectedArea.cities : []);
    setHais([]);
    setSelectedCity(null);
    setSelectedHai(null);
  };

  const handleCitySelectChange = (value) => {
    const selectedCity = cities.find((item) => item.id === value);
    setHais(selectedCity ? selectedCity.hais : []);
    setSelectedHai(null);
  };

  return (
    <Row className="row_modify with_row_gap ">
      <Col xs={12}>
        <UploadFiles />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="عقار معروض / مطلوب"
          options={modifySelectObj(forData, 'key', 'value')}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <input className="input" type="text" placeholder="عنوان العقار" />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="اختر التصنيف ( القسم )"
          options={modifySelectObj(categories, 'id', 'name')}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <input placeholder="السعر" className="input" type="number" />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="المنطقة"
          options={modifySelectObj(areas, 'id', 'name')}
          onChange={handleAreaSelectChange}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="المدينة"
          ref={citiesRef}
          value={selectedCity}
          options={modifySelectObj(cities, 'id', 'name')}
          onChange={(value) => {
            handleCitySelectChange(value);
            setSelectedCity(value);
          }}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="الحي"
          value={selectedHai}
          options={modifySelectObj(hais, 'id', 'name')}
          onChange={(value) => setSelectedHai(value)}
        />
      </Col>
      <Col sm={12} lg={6}>
        <textarea
          className="input"
          style={{ height: '163px', resize: 'none' }}
          placeholder="وصف العقار"
          name="description"
          id="description"
          cols={30}
          rows={10}
        />
      </Col>
    </Row>
  );
};
