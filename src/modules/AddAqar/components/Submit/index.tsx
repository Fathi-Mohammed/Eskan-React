import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Arrow from '@/assets/images/shapes/arrow_left.svg?react';
import styles from './styles.module.scss';

type props = {
  formData: any;
  setFormData: any;
  handleSubmit: () => void;
};

export const Submit: React.FC<props> = ({
  formData,
  setFormData,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.submitWrapper}>
      <label htmlFor="showPhone" className="checkbox">
        <input
          type="checkbox"
          name="show_phone"
          id="showPhone"
          checked={formData.show_phone}
          className="checkboxInput"
          onChange={(e) =>
            setFormData({
              ...formData,
              show_phone: Number(e.target.checked),
            })
          }
        />
        <div className="checkboxCircle"></div>
        <span className="checkboxText">اظهار رقم الهاتف</span>
      </label>
      <label htmlFor="acceptBonusesPay" className="checkbox">
        <input
          type="checkbox"
          name="acceptBonusesPay"
          id="acceptBonusesPay"
          required
          className="checkboxInput"
        />
        <div className="checkboxCircle"></div>
        <span className="checkboxText">نعم , أتعهد بدفع العمولة</span>
        <Link className="link bonusesDetails" to="/bonuses-details">
          تفاصيل العمولة
          <Arrow />
        </Link>
      </label>
      <button
        type="button"
        className="button__ primary__ fixed_size__ secondary_rounded__"
        onClick={handleSubmit}
      >
        إضافة
      </button>
    </div>
  );
};
