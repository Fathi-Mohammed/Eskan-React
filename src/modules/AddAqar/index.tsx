import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import { Container } from 'react-bootstrap';
import { ADD_AQAR_FORM } from '@/shared/services/api/Api';
import { Loader } from '@/shared/components/Loader';
import styles from './styles.module.scss';

import { FirstForm, SecondForm, Submit } from './components';
import useMutationData from '@/shared/hooks/useMutationData';
import useApi from '@/shared/hooks/useApi';

const AddAqar: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({
    files: [],
    for: '',
    title: '',
    category_propery_id: '',
    price: '',
    area_id: '',
    city_id: '',
    hai_id: '',
    purpose: '',
    info: {
      description: '',
      size: '',
      meter_price: '',
      front: '',
      street_size: '',
      sleep_rooms: '',
      halls: '',
      bathrooms: '',
      level: '',
      is_new: '',
      age: '',
      has_kitchen: '',
      has_elevator: '',
      has_cooler: '',
      has_guard: '',
    },
    show_phone: '',
    location: {
      lat: '',
      lng: '',
      address: '',
    },
  });

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const {
    mutate: tryAddAqar,
    isSuccess,
    data: addAqar,
  } = useMutationData('aqars', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { isLoading, data, isRefetching } = useApi.get(ADD_AQAR_FORM);

  const [hasMoreDetails, setHasMoreDetails] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      console.log(addAqar);
    }
  }, [isSuccess]);

  const handleSubmit = async () => {
    try {
      await tryAddAqar();
    } catch (error) {
      console.error(error);
    }
  };

  const steps = [
    {
      title: 'First',
      content: (
        <FirstForm
          data={data?.data}
          setMoreDetails={setHasMoreDetails}
          setForm={setFormData}
          formData={formData}
        />
      ),
    },
    {
      title: 'Second',
      content: (
        <SecondForm
          data={data?.data}
          setForm={setFormData}
          formData={formData}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <main className="default_page">
      <Container>
        <div className="section_head_wrapper">
          <h2 className="section_main_title__">إضافة إعلان جديد</h2>
        </div>
        {isLoading || isRefetching ? (
          <Loader visible={isLoading || isRefetching} />
        ) : (
          <>
            <Steps current={current} items={items} />
            <div>{steps[current].content}</div>

            <div className="buttonsWrapper">
              {current === 0 && (
                <>
                  {hasMoreDetails ? (
                    <button
                      type="button"
                      className="button primary__ fixed_size__ secondary_rounded__ margin_start_auto__ mt-5"
                      onClick={handleNext}
                    >
                      التالي
                    </button>
                  ) : (
                    <Submit
                      formData={formData}
                      setFormData={setFormData}
                      handleSubmit={handleSubmit}
                    />
                  )}
                </>
              )}
              {current === 1 && (
                <div className={styles.prevAndSubmitWrapper}>
                  <Submit
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                  />
                  <button
                    type="button"
                    className="button grey__ fixed_size__ secondary_rounded__ margin_start_auto__"
                    onClick={handlePrev}
                  >
                    السابق
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </main>
  );
};

export default AddAqar;
