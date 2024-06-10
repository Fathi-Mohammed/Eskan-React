import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { Header, Message, SendForm } from './components';
import useApi from '@/shared/hooks/useApi';

type props = {
  user: number | null;
  userData: {
    id: number;
    name: string;
    image: string;
    mobile: string;
    rate: number;
  } | null;
};

export const ChatBox: React.FC<props> = ({ user, userData }) => {
  const { VITE_CHAT } = import.meta.env;
  const { data, isLoading, isSuccess, refetch } = useApi.get(
    `${VITE_CHAT}/${user}`,
  );

  useEffect(() => {
    if (user !== null) {
      refetch();
    }
  }, [user, refetch]);

  if (user === null) return;
  if (isLoading) return <h1>Loading ...</h1>;

  const messages = data?.data || [];
  const { name, image } = userData || messages[0]?.user || {};
  const lastMessageDate = messages[0]?.sent_at || '';

  return (
    <div className={styles.chatBox}>
      <Header
        name={name || 'Unknown User'}
        image={image || ''}
        lastMessageDate={lastMessageDate || ''}
        user={user}
      />
      <div className={styles.body}>
        <div className={styles.messages}>
          {isSuccess &&
            messages.map((item) => <Message key={item.id} data={item} />)}
        </div>
        <SendForm refetch={refetch} user={user} />
      </div>
    </div>
  );
};
