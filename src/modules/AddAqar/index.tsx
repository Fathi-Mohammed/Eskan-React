import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import { Container } from 'react-bootstrap';
import useFetch from '@/shared/hooks/useFetch';
import { ADD_AQAR_FORM } from '@/shared/services/api/Api';
import { Loader } from '@/shared/components/Loader';

import { FirstForm } from './components';

export const AddAqar: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const { isLoading, isError, error, data, isRefetching } =
    useFetch(ADD_AQAR_FORM);
  console.log(data);

  if (isError) console.error(error.message);
  if (isLoading || isRefetching)
    return <Loader visible={isLoading || isRefetching} />;

  const steps = [
    {
      title: 'First',
      content: <FirstForm data={data?.data} />,
    },
    {
      title: 'Second',
      content: <h1>'Second-content'</h1>,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <main className="default_page">
      <Container>
        <div className="section_head_wrapper">
          <h2 className="section_main_title__">إضافة إعلان جديد</h2>
        </div>
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => handleNext()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => handlePrev()}>
              Previous
            </Button>
          )}
        </div>
      </Container>
    </main>
  );
};
