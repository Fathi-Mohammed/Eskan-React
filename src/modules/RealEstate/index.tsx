import React from 'react';
import { Container } from 'react-bootstrap';

import useFetch from '@/shared/hooks/useApi';

import { AQARS } from '@/shared/services/api/Api';
import { useParams } from 'react-router-dom';
import { AqarsInfo, Comments, Related } from './components';
import useMutationData from '@/shared/hooks/useMutationData';

export const RealEstate: React.FC = () => {
  const param = useParams();

  const { data, refetch } = useFetch(AQARS + `/${param.id}`);
  const { details, comments, related } = data?.data || {};
  const [isLike, setIsLike] = React.useState(details?.is_liked);

  const mutation = useMutationData(`${AQARS}/${param.id}/like`);

  const handleAqarsLike = async () => {
    try {
      await mutation.mutate();
      setIsLike(!isLike);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    refetch();
  }, [isLike]);

  return (
    <main className="default_page">
      <Container>
        <AqarsInfo data={details} handleFav={handleAqarsLike} />
        <Comments data={comments} />
        <Related cardData={related} />
      </Container>
    </main>
  );
};
