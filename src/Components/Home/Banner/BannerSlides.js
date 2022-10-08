import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { Language } from "../../../pages/Pages";

export default function BannerSlides({ item, ind }) {
  const { lang } = useContext(Language);
  const [product, setProduct] = useState(item);


  useEffect(() => {
    if (lang) {
      const localeToShow = item.locale?.find(i => i._id === lang)
      if (localeToShow) {
        setProduct({
          ...item,
          ...localeToShow,
          _id: item._id,
        })
      }
    } else {
      setProduct(item)
    }
  }, [lang, item]);

  return (
    <>

      <Row className="align-items-center" key={ind}>
        <Col md={5}>
          <div className="banner-slide-img">
            <img src={`https://server.buniyadi.craftedsys.com/api/image/serve/${product.image}?width=400&height=400&quality=75&format=webp&fit=contain&bg=ddd`} alt="" />
          </div>
        </Col>
        <Col md={7}>
          <div className="banner-slide-info">
            <h2>{product.title}</h2>
            <p>{product.shortDescription}</p>
          </div>
        </Col>
      </Row>
    </>
  )
}
