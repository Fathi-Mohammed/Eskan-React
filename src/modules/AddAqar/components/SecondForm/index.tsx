import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Select } from 'antd';
import { modifySelectObj } from '@/shared/utils/modifySelectObj';

type props = {
  data: any;
  setForm: (formUpdate: any) => void;
  formData: any;
};

export const SecondForm: React.FC<props> = ({ data, setForm, formData }) => {
  const { purpose, type } = data;
  const handleInputChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      info: { ...prev.info, [e.target.name]: e.target.value },
    }));
  };
  const yesOrNoOptions = [
    { value: '1', label: 'نعم' },
    { value: '0', label: 'لا' },
  ];
  return (
    <Row className="row_modify with_row_gap ">
      {/* <Col xs={12} sm={6} md={3} lg={2}>
        <Select
          placeholder="الغرض"
          value={formData.purpose || null}
          onChange={(e) => setForm((prev) => ({ ...prev, purpose: e }))}
          options={modifySelectObj(purpose, 'key', 'value')}
        />
      </Col> */}
      <Col xs={12} sm={6} md={3} lg={2}>
        <Select
          placeholder="الفئة"
          value={formData.info?.type || null}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, info: { ...prev.info, type: e } }))
          }
          options={modifySelectObj(type, 'key', 'value')}
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="number"
          name="size"
          value={formData.info?.size || ''}
          onChange={handleInputChange}
          placeholder="المساحة"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="number"
          name="meter_price"
          value={formData.info?.meter_price || ''}
          onChange={handleInputChange}
          placeholder="سعر المتر"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="text"
          name="front"
          value={formData.info?.front || ''}
          onChange={handleInputChange}
          placeholder="الواجهة"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="number"
          name="street_size"
          value={formData.info?.street_size || ''}
          onChange={handleInputChange}
          placeholder="عرض الشارع"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="number"
          name="sleep_rooms"
          value={formData.info?.sleep_rooms || ''}
          onChange={handleInputChange}
          placeholder="عدد غرف النوم"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="number"
          name="halls"
          value={formData.info?.halls || ''}
          onChange={handleInputChange}
          placeholder="عدد الصالات"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="number"
          name="bathrooms"
          value={formData.info?.bathrooms || ''}
          onChange={handleInputChange}
          placeholder="عدد دورات المياه"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input"
          type="number"
          name="level"
          value={formData.info?.level || ''}
          onChange={handleInputChange}
          placeholder="تحديد الدور"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <Select
          className="smallPlaceholder"
          placeholder="هل العقار جديد ؟"
          value={formData.info.is_new || null}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, info: { ...prev.info, is_new: e } }))
          }
          options={yesOrNoOptions}
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <input
          className="input smallPlaceholder"
          type="number"
          name="age"
          value={formData.info?.age || ''}
          onChange={handleInputChange}
          placeholder="عمر العقار بالسنوات"
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <Select
          className="smallPlaceholder"
          placeholder="هل يوجد مطبخ ؟"
          value={formData.info?.has_kitchen || null}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              info: { ...prev.info, has_kitchen: e },
            }))
          }
          options={yesOrNoOptions}
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <Select
          className="smallPlaceholder"
          placeholder="هل يوجد مصعد ؟"
          value={formData.info?.has_elevator || null}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              info: { ...prev.info, has_elevator: e },
            }))
          }
          options={yesOrNoOptions}
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <Select
          className="smallPlaceholder"
          placeholder="هل يوجد مكيفات ؟"
          value={formData.info?.has_cooler || null}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              info: { ...prev.info, has_cooler: e },
            }))
          }
          options={yesOrNoOptions}
        />
      </Col>
      <Col xs={12} sm={6} md={3} lg={2}>
        <Select
          className="smallPlaceholder"
          placeholder="هل يوجد أمن ؟"
          value={formData.info?.has_guard || null}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              info: { ...prev.info, has_guard: e },
            }))
          }
          options={yesOrNoOptions}
        />
      </Col>
    </Row>
  );
};
