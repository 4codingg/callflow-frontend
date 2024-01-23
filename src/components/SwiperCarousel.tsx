import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

interface ISwiperCarouselProps {
  children: JSX.Element[];
  minWidth?: string;
  maxWidth?: string;
}

export const SwiperCarousel = ({
  children,
  minWidth = '300px',
  maxWidth = '315px',
}: ISwiperCarouselProps) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={16}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      hidden={false}
      className="flex mt-4 w-full gap-4"
    >
      {children.map((item) => (
        <SwiperSlide
          key={item.key}
          style={{ height: 'auto', minWidth: minWidth, maxWidth: maxWidth }}
        >
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
