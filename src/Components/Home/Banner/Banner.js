import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import BannerSlides from "./BannerSlides";

export default function Banner({ products }) {
  

  return (
    <Swiper pagination={{
      dynamicBullets: true
    }} modules={[Pagination]} className="mySwiper banner">
      {
        products?.map((item, ind) => {
          return (
            <SwiperSlide className="banner-slide" key={ind}>
              <BannerSlides item={item} ind={ind} />
            </SwiperSlide>
          )
        })
      }

    </Swiper>
  )
}
