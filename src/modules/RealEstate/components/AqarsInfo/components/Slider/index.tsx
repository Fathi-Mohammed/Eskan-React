import React, { useState } from 'react';
import { Image } from '@/shared/components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Thumbs } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Swiper as SwiperClass } from 'swiper/types';
import { checkFileType } from '@/shared/utils/checkFileType';
import { Video } from '@/shared/components/Video';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.scss';

type file = {
  id: number;
  path: string;
};

type props = {
  data: file[];
};

export const Slider: React.FC<props> = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const { i18n } = useTranslation();

  let swiperParams = {
    className: 'realEstateSlider',
    modules: [Pagination, Thumbs],
    thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
    dir: i18n.language === 'en' ? undefined : 'rtl',
    spaceBetween: 0,
    slidesPerView: 1,
    pagination: { clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };

  let thumbSwiperParams = {
    className: 'realEstateThumbSlider',
    modules: [FreeMode, Thumbs],
    watchSlidesProgress: true,
    onSwiper: setThumbsSwiper,
    dir: i18n.language === 'en' ? undefined : 'rtl',
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    pagination: { clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };
  return (
    <>
      <Swiper key={i18n.language} {...swiperParams}>
        {data?.map(({ id, path }) => (
          <SwiperSlide key={id}>
            {checkFileType(path) === 'image' ? (
              <Image src={path} asp={78.35815324} alt="aqars" />
            ) : (
              <Video src={path} asp={78.35815324} autoPlay loop muted />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper key={'thumb' + i18n.language} {...thumbSwiperParams}>
        {data?.map(({ id, path }) => (
          <SwiperSlide
            className={checkFileType(path) === 'video' ? 'video' : ''}
            key={id}
          >
            {checkFileType(path) === 'image' ? (
              <Image src={path} asp={78.35815324} alt="aqars" />
            ) : (
              <Video src={path} asp={78.35815324} muted />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
