import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Map, UploadFiles } from './components';
import { Select } from 'antd';
import { modifySelectObj } from '@/shared/utils/modifySelectObj';
import type { filterData } from '@/shared/model/home';

type props = {
  data: filterData;
  setForm: (formUpdate: any) => void;
  setMoreDetails: (hasDetails: boolean) => void;
  formData: any;
};

export const FirstForm: React.FC<props> = ({
  data,
  setMoreDetails,
  setForm,
  formData,
}) => {
  const { for: forData, categories, areas, purpose } = data || {};
  const [cities, setCities] = useState<any>([]);
  const [hais, setHais] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedHai, setSelectedHai] = useState(null);
  const citiesRef = useRef(null);

  const handleLocationSelect = (data) => {
    setForm((prevForm) => ({
      ...prevForm,
      location: {
        ...prevForm.location,
        lat: data.lat,
        lng: data.lng,
        address: data.address,
      },
    }));
  };

  const handleCategorySelectChange = (value) => {
    const selectedCategory = categories.find((item) => item.id === value)?.[
      'has_details'
    ];
    setMoreDetails(selectedCategory);
    setForm((prevForm) => ({
      ...prevForm,
      category_propery_id: value,
    }));
  };

  const handleAreaSelectChange = (value) => {
    const selectedArea = areas.find((item) => item.id === value);
    setCities(selectedArea?.cities);
    setHais([]);
    setSelectedCity(null);
    setSelectedHai(null);
    setForm((prevForm) => ({
      ...prevForm,
      area_id: value,
    }));
  };

  const handleCitySelectChange = (value) => {
    const selectedCity = cities.find((item) => item.id === value);
    setHais(selectedCity ? selectedCity.hais : []);
    setSelectedHai(null);
    setForm((prevForm) => ({
      ...prevForm,
      city_id: value,
    }));
  };

  const handleHaiSelectChange = (value) => {
    setSelectedHai(value);
    setForm((prevForm) => ({
      ...prevForm,
      hai_id: value,
    }));
  };

  return (
    <Row className="row_modify with_row_gap ">
      <Col xs={12}>
        <UploadFiles setForm={setForm} formData={formData} />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="عقار معروض / مطلوب"
          options={modifySelectObj(forData, 'key', 'value')}
          value={formData['for'] || null}
          onChange={(e) => setForm((prevForm) => ({ ...prevForm, for: e }))}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <input
          className="input"
          type="text"
          placeholder="عنوان العقار"
          value={formData.title}
          onChange={(e) =>
            setForm((prevForm) => ({ ...prevForm, title: e.target.value }))
          }
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="اختر التصنيف ( القسم )"
          value={formData.category_propery_id || null}
          onChange={handleCategorySelectChange}
          options={modifySelectObj(categories, 'id', 'name')}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <input
          placeholder="السعر"
          className="input"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setForm((prevForm) => ({ ...prevForm, price: e.target.value }))
          }
        />
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
            setForm((prevForm) => ({
              ...prevForm,
              city_id: value,
            }));
          }}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="الحي"
          value={selectedHai}
          options={modifySelectObj(hais, 'id', 'name')}
          onChange={handleHaiSelectChange}
        />
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          placeholder="الغرض"
          value={formData.purpose || null}
          onChange={(e) => setForm((prev) => ({ ...prev, purpose: e }))}
          options={modifySelectObj(purpose, 'key', 'value')}
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
          value={formData.info?.description || ''}
          onChange={(e) =>
            setForm((prevForm) => ({
              ...prevForm,
              info: {
                ...prevForm.info,
                description: e.target.value,
              },
            }))
          }
        />
      </Col>
      <Col sm={12} lg={6}>
        <Map onLocationSelect={handleLocationSelect} formData={formData} />
      </Col>
    </Row>
  );
};
