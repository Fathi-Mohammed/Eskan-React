import React from 'react';
import { NoData, NotificationCard, Switch } from './components';
import { Container } from 'react-bootstrap';
import useApi from '@/shared/hooks/useApi';

const Notifications: React.FC = () => {
  const { VITE_NOTIFICATIONS } = import.meta.env;
  const { data, isLoading } = useApi.get(VITE_NOTIFICATIONS);
  return (
    <main className="default_page">
      <Container>
        <div className="page_head_wrapper flex_display justify_content_between">
          <h1 className="page_main_title__">الإشعارات</h1>
          <Switch />
        </div>

        {!isLoading && data?.data && data?.data?.length > 0 ? (
          data?.data?.map((item) => (
            <NotificationCard key={item.id} data={item} />
          ))
        ) : (
          <NoData />
        )}
      </Container>
    </main>
  );
};

export default Notifications;
