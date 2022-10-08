/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Language } from "../../pages/Pages";

export default function CategoryCard({ item }) {
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
    }else{
      setProduct(item)
    }
  }, [lang, item]);


  const { title, _id, image } = product;
  return (
    <Link to={`/product-list/${_id}`} >
      <div className="category-card border text-center">
        <div className="category-card__img">
          <img src={`https://server.buniyadi.craftedsys.com/api/image/serve/${image[0]._id}?width=400&height=400&quality=75&format=webp&fit=contain&bg=fff`} alt="" />
        </div>
        <h2 >{title} </h2>
      </div>
    </Link>
  )
}
