import { AQARS, RATE, USER } from '@/shared/services/api/Api';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ModalConent, NoData, RateCard, UserInfo } from './components';
import { useEffect, useState } from 'react';
import useMutationData from '@/shared/hooks/useMutationData';
import useApi from '@/shared/hooks/useApi';

type rate = {
  comment: string;
  rate: number;
};

export const OwnerRates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rateData, setRateData] = useState<rate>({
    comment: '',
    rate: 0,
  });
  const { id } = useParams();
  const { data, refetch } = useApi.get(AQARS + '/' + id + '/owner_rates');
  const mutation = useMutationData(`${USER}/${id}/${RATE}`, rateData);
  const { name, image, rate, rates } = data?.data || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutation.mutate();
      setRateData({ ...rateData, comment: '', rate: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
    let timeout;
    if (mutation?.isSuccess) {
      timeout = setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [mutation?.isSuccess]);

  return (
    <main className="default_page">
      <Container>
        <div className="page_head_wrapper flex_display justify_content_between">
          <div>
            <h1 className="page_main_title__">تقييمات المعلن</h1>
            <h5 className="page_sub_title__">عرض لتقييمات هذا المعلن</h5>
          </div>
          <UserInfo
            setIsModalOpen={setIsModalOpen}
            data={{ name, image, rate }}
          />
        </div>
        <Row className="row_modify with_row_gap">
          {rates?.length === 0 && <NoData />}
          {rates?.map((rate) => (
            <Col key={rate.id} lg={4}>
              <RateCard key={rate.id} data={rate} />
            </Col>
          ))}
        </Row>
        <ModalConent
          open={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={rateData}
          handleSubmit={handleSubmit}
          loading={mutation?.isPending}
          setData={setRateData}
        />
      </Container>
    </main>
  );
};
