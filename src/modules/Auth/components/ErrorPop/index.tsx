import React from 'react';
import { Popover } from 'antd';
import { PiWarningCircleFill } from 'react-icons/pi';
import styles from './styles.module.scss';

type props = {
  content: React.ReactNode;
  className?: string;
};

export const ErrorPop: React.FC<props> = ({ content, className }) => {
  return (
    <div className={styles.error + ' ' + className}>
      <Popover content={content} trigger="hover">
        <span className={styles.icon}>
          <PiWarningCircleFill />
        </span>
      </Popover>
    </div>
  );
};
