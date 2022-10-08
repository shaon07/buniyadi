/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
// React icons 
import { BsFillHeartFill } from "react-icons/bs";
import { ImCart } from "react-icons/im";
import { Link, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from "../../Context/actions/actions";
import { Language } from "../../pages/Pages";

export default function ProductCard({ item }) {
  const { id } = useParams('')
  const { cartItem, lang, handleCartDispatch, categoryName } = useContext(Language);
  const [product, setProduct] = useState(item);
  const filteredItem = cartItem?.data?.map(data => data._id);


  useEffect(() => {
    if (lang) {
      const localeToShow = item.locale?.find(i => i._id === lang);
      if (localeToShow) {
        setProduct({
          ...item,
          ...localeToShow,
          _id: item._id,
        })
      }
    } else {
      setProduct(item);
    }
  }, [lang, item, id]);


  const matchedCategory = categoryName.filter(item => item._id === product.category[0])


  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={`https://server.buniyadi.craftedsys.com/api/image/serve/${product.image}?width=400&height=400&quality=75&format=webp&fit=contain&bg=f0f0f0`} alt="product" />
      </div>
      <div className="product-details">
        <span className="product-catagory">{matchedCategory[0]?.title}</span>
        <h4>
          <Link to={`/product-details/${product?._id}`}>
            <span>{product.title}</span>
          </Link>
        </h4>
        <p>{product.shortDescription}</p>
        <div className="product-bottom-details">
          <div className="product-price">Taka <small>{product.variation[0].price?.offer}</small>{product.variation[0].price.regular}</div>
          <div className="product-links">
            <span>
              <BsFillHeartFill />
            </span>
            {
              <span className={`${filteredItem.includes(product._id) ? 'active' : ''}`}>
                <ImCart onClick={() => {
                  if (filteredItem.includes(product._id)) {
                    handleCartDispatch(removeFromCart(product))
                  } else {
                    handleCartDispatch(addToCart({ ...product, totalPrice: product.variation[0].price?.offer || product.variation[0].price?.regular, quantity: 1 }));
                  }
                }} />
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
