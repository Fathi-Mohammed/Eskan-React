import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ChatBox, Contacts, NoData } from './components';
import useApi from '@/shared/hooks/useApi';
import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const Chat: React.FC = () => {
  const { state } = useLocation();
  const [user, setUser] = useState<number | null>(null);
  const [userData, setUserData] = useState(state?.userData || null);
  const { VITE_CHAT } = import.meta.env;
  const { data, isLoading, isSuccess } = useApi.get(VITE_CHAT);

  useEffect(() => {
    if (userData) {
      setUser(userData.id);
    } else if (isSuccess && data?.data?.length > 0) {
      const { from_me, from, user } = data.data[0];
      const { id } = from_me ? user : from;
      setUser(id);
    }
  }, [userData, isSuccess, data, state]);

  if (isLoading) return <h1>Loading ...</h1>;

  return (
    <main className="default_page">
      <Container>
        <div className="page_head_wrapper">
          <h1 className="page_main_title__">الرسائل</h1>
        </div>
        {isSuccess && data?.data?.length <= 0 && user === null && <NoData />}
        <div className={styles.chatWrapper}>
          <Contacts data={data?.data} setUser={setUser} />
          <ChatBox user={user} userData={userData} />
        </div>
      </Container>
    </main>
  );
};

export default Chat;
