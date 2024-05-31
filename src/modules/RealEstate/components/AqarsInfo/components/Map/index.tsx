import React from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from '@vis.gl/react-google-maps';

import styles from './styles.module.scss';

type props = {
  data: {
    lat: number;
    lng: number;
    address: string;
  };
};

export const Map: React.FC<props> = ({ data }) => {
  const position = {
    lat: Number(data?.lat),
    lng: Number(data?.lng),
  };

  return (
    <APIProvider apiKey={'AIzaSyDSmHn7BxSPc7XLnIqshaxiG4IVLwz1QGs'}>
      {position.lat && position.lng && (
        <>
          <GoogleMap
            className={styles.map}
            defaultCenter={position}
            defaultZoom={8}
          />
          <Marker position={position} />
        </>
      )}
    </APIProvider>
  );
};
