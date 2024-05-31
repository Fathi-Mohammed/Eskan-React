import React from 'react';
import { Collapse } from 'antd';
import { CollapseContent } from './CollapseContent';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

type info = {
  [key: string]: string | number;
};

type props = {
  data: info;
};

export const InfoCollapse: React.FC<props> = ({ data }) => {
  const { t } = useTranslation();

  const items = [
    {
      label: t('aqarInfo.info'),
      children: <CollapseContent data={data} />,
    },
  ];
  return <Collapse items={items} className={`accordion ${styles.accordion}`} />;
};
