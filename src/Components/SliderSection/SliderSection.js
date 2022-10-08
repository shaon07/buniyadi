import React from 'react';
import Slider from "react-slick";
import './SliderSection.css';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function SliderSection({ item }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (

    <div className="container">
      <Slider {...settings} className="slider-wrapper">
      <div className="w-55">
        <img src={`https://server.buniyadi.craftedsys.com/api/image/serve/${item.image[0]._id}?width=400&height=400&quality=75&format=webp&fit=contain&bg=fff`} className="img-fluid" alt="slider" />
      </div>

    </Slider>
    </div>
  )
}
