// import useLoadScript from '@/shared/hooks/useLoadScript';
import React, { useRef, useEffect } from 'react';
import styles from './styles.module.scss';

type props = {
  onLocationSelect: (data: any) => void;
  formData: any;
};

export const Map: React.FC<props> = ({ onLocationSelect, formData }) => {
  const mapEle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapEle.current) {
      const map = new google.maps.Map(mapEle.current, {
        center: formData.location.lat
          ? { lat: formData.location.lat, lng: formData.location.lng }
          : { lat: 31.040535301961892, lng: 31.382732203359694 },
        zoom: 15,
      });

      const marker = new google.maps.Marker({
        position: formData.location.lat
          ? { lat: formData.location.lat, lng: formData.location.lng }
          : { lat: 31.040535301961892, lng: 31.382732203359694 },
        map: map,
        draggable: true,
      });

      const geocoder = new google.maps.Geocoder();

      const getAddress = async (latLng: google.maps.LatLng) => {
        const result = await geocoder.geocode(
          { location: latLng },
          (results, status) => {
            if (status === 'OK' && results![0]) {
              results![0].formatted_address;
            } else {
              console.error('Geocoder failed due to:', status);
            }
          },
        );

        return result.results[0].formatted_address;
      };

      const updatePosition = async (latLng: google.maps.LatLng) => {
        marker.setPosition(latLng);
        const lat = latLng.lat();
        const lng = latLng.lng();
        const address = await getAddress(latLng);
        onLocationSelect({ lat, lng, address });
      };

      marker.addListener('dragend', () => {
        const newPosition = marker.getPosition();
        if (newPosition) {
          updatePosition(newPosition);
        }
      });

      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          updatePosition(event.latLng);
        }
      });
    }
  }, []);

  return <div ref={mapEle} className={styles.map}></div>;
};
