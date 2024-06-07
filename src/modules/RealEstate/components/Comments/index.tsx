import React, { useContext, useEffect, useState } from 'react';
import { Cards, Form } from './components';
import AuthContext from '@/shared/context/AuthProvider';
import { Axios } from '@/shared/services/Axios';
import { AQARS, COMMENT } from '@/shared/services/api/Api';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';
import { formatDate } from './utils/formatDate';

import type { comment } from './types/comments';

import styles from './styles.module.scss';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type props = {
  data: comment[];
};

export const Comments: React.FC<props> = ({ data }) => {
  const [api, contextHolder] = notification.useNotification();
  const [newData, setNewData] = useState<comment[]>([]);
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext) || {};
  const { id } = useParams();

  const openNotificationWithIcon = (type: NotificationType) => {
    if (type === 'error') {
      api[type]({
        message: 'Error',
        description:
          'You Can not Add Comment without Sing in. Please Sign in and try again.',
      });
    } else if (type === 'success') {
      api[type]({
        message: 'Success',
        description: 'Comment Added Successfully',
      });
    }
  };

  useEffect(() => {
    if (data) setNewData([...data.filter((item) => item?.comment)]);
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        `${AQARS}/${id}/${COMMENT}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        },
      );
      if (!user?.access_token) {
        openNotificationWithIcon('error');
      }
      if (res.status === 200 && user?.access_token) {
        setComment('');
        openNotificationWithIcon('success');
        setNewData([
          {
            id: Math.random() * 999999,
            comment,
            created_at: formatDate(),
            user: {
              name: user?.name!,
              image: user?.image!,
            },
          },
          ...newData,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.comments}>
      <Form
        onSubmit={handleSubmit}
        comment={comment}
        setComment={setComment}
        contextHolder={contextHolder}
      />
      <Cards data={newData} />
    </div>
  );
};
