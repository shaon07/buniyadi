import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Language } from "../../pages/Pages";


export default function SidebarList({ item, ind }) {
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

  const { title, _id, icon, productCount } = product;

  return (
    <>
      <Link className="category-title" to={`/product-list/${_id} `} key={ind}
      >
        <img src={`https://server.buniyadi.craftedsys.com/api/image/serve/${icon._id}`} alt={title} />
        {title}
      </Link>
      <span className="category-quantity">({productCount})</span>
    </>

  )
}
