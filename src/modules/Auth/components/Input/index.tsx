import React from 'react';
import Call from '@/assets/images/shapes/inputs_icons/input_phone_icon.svg?react';
import Password from '@/assets/images/shapes/inputs_icons/password.svg?react';
import User from '@/assets/images/shapes/inputs_icons/user.svg?react';
import styles from './styles.module.scss';
import { ErrorPop } from '../ErrorPop';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: 'phone' | 'password' | 'user' | string;
  content?: string;
}

export const Input: React.FC<Props> = ({
  icon,
  content,
  className,
  ...rest
}) => {
  const [fouched, setFouced] = React.useState(false);
  const iconMap = {
    phone: <Call />,
    password: <Password />,
    user: <User />,
  };

  const handleFocus = (e) => {
    setFouced(true);
  };

  return (
    <div className={icon ? styles.inputWrapper : ''}>
      {icon && iconMap[icon]}
      <input
        className={styles.input + ' ' + className}
        {...rest}
        onBlur={handleFocus}
        focused={`${fouched}`}
      />
      <span className={styles.error}>
        <ErrorPop content={content} />
      </span>
    </div>
  );
};
