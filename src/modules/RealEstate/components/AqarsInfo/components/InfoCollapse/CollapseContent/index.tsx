import React from 'react';
import { keysMap } from './utils/keysMap';
import { checkKey } from './utils/checkKey';
import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

type info = {
  [key: string]: string | number;
};

type props = {
  data: info;
};

export const CollapseContent: React.FC<props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      {Object.keys(data).length === 1 && !!data.description && (
        <Empty
          className={styles.empty}
          description={<h4>{t('noInfo')}</h4>}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      <div className={styles.content}>
        {Object.keys(data).map((key) => {
          if (key === 'type' || key === 'description') return null;
          return (
            <div key={key} className={styles.info}>
              <span className={styles.infoKey}>{keysMap(key)}</span>
              <span className={styles.infoValue}>{checkKey(key, data)}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
