import React from 'react';
import styles from './styles.module.scss';

interface props extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  height?: number;
  space?: number;
  width?: number;
  radius?: number;
}

export const Skeleton: React.FC<props> = ({
  count = 1,
  height = 1,
  space = 0.2,
  radius = 0,
  width,
  ...args
}) => {
  const style = {
    height: height + 'rem',
    marginBottom: space + 'rem',
    borderRadius: radius + 'rem',
  };
  return (
    <div {...args} style={{ maxWidth: width + 'rem', ...args.style }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={Math.random()}
          className={
            styles.skeleton +
            ' ' +
            (i === count - 1 && count > 1 ? styles.last : '')
          }
          style={style}
        />
      ))}
    </div>
  );
};
