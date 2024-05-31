import React from 'react';
// import { createPortal } from 'react-dom';

import SendIcon from '@/assets/images/shapes/comment_button.svg?react';

import styles from './styles.module.scss';

type props = {
  onSubmit: (e: React.FormEvent) => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  contextHolder: any;
};

export const Form: React.FC<props> = ({
  onSubmit,
  comment,
  setComment,
  contextHolder,
}) => {
  return (
    <div>
      {contextHolder}
      <h2 className={styles.title}>التعليقات</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="عنوان التعليق"
          className={styles.input}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button className={`button__ ${styles.button}`}>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};
