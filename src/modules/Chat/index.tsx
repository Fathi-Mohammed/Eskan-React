import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles.module.scss';

export const Chat: React.FC = () => {
  return (
    <main className="default_page">
      <Container>
        <div className="page_head_wrapper">
          <h1 className="page_main_title__">الرسائل</h1>
        </div>
        <div className={styles.chatWrapper}>
          <Contacts />
          <ChatBox />
        </div>
      </Container>
    </main>
  );
};
