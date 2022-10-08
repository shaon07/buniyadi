import React from 'react';
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductSlides({ title, products }) {

  return (
    <section className="product-slides">
      <h2 className="product-slides__title">{title}</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={12}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          products.map((item, ind) => {
            return (
              <SwiperSlide key={ind}>
                <ProductCard item={item} />
              </SwiperSlide>
            )
          })
        }

      </Swiper>
    </section>
  )
}
