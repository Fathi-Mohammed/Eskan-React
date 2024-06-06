import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { InfoCollapse, Map, Slider, UserInfo } from './components';
import { useTranslation } from 'react-i18next';
import { truncateString } from '../../utils/truncateString';
import { Popover } from 'antd';

import type { aqarsInfo } from '../../types';

import FavIcon from '@/assets/images/shapes/FavIcon.svg?react';
import LocationIcon from '@/assets/images/shapes/location_icon.svg?react';
import TimeIcon from '@/assets/images/shapes/time_icon.svg?react';

import styles from './styles.module.scss';

type props = {
  data: aqarsInfo;
  handleFav: () => void;
};

export const AqarsInfo: React.FC<props> = ({ data, handleFav }) => {
  const { t } = useTranslation();

  const {
    title,
    price,
    for_txt,
    is_liked,
    created_at,
    description,
    location,
    files,
    info,
    user,
    show_phone,
  } = data || {};

  return (
    <Row className={styles.aqarsInfo}>
      <Col lg={6}>
        <Slider data={files} />
      </Col>
      <Col lg={6}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleContent}>
            <h1 className={styles.title}>{title}</h1>
            <span className={styles.status}>{for_txt}</span>
          </div>
          <button
            onClick={handleFav}
            className={`button__ add_to_fav__ ${is_liked ? 'active' : 'not-active'}`}
          >
            <FavIcon />
          </button>
        </div>

        <div className={styles.infoWrapper}>
          <Popover content={location?.address} trigger="hover">
            <div className={styles.info}>
              <LocationIcon />
              {location?.address && truncateString(location?.address, 25)}
            </div>
          </Popover>
          <div className={styles.info}>
            <TimeIcon />
            {t('realEstate.createdAt') + created_at}
          </div>
        </div>

        <span className={styles.price}>{price + ' ' + t('RAS')}</span>

        <p className={styles.parag}>{description}</p>
        <Map data={location} />
        <InfoCollapse data={info} />
        <UserInfo data={user} showPhone={show_phone} />
      </Col>
    </Row>
  );
};
