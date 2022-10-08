import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { ImCart } from "react-icons/im";
import SliderSection from "../../Components/SliderSection/SliderSection";
import { addToCart, removeFromCart } from "../../Context/actions/actions";
import { Language } from "../Pages";



export default function ProductDetailCard({ item }) {
  const { lang, handleCartDispatch, cartItem } = useContext(Language);

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

  const { title, shortDescription, variation, tag, brand, category } = product;
  const filteredItem = cartItem?.data?.map(data => data._id);


  return (
    <div >
      <SliderSection item={item} />
      <div className="productDetail_description">
        <div className="col-12">
          <div className="card d-flex justify-content-between">
            <div className="d-flex justify-content-between">
              <div className="about"> <h4 className="font-weight-bold">{title}</h4>
                <h5 className="font-weight-bold">{variation[0].price?.offer || variation[0].price?.regular} Taka</h5>
              </div>
              <div className="buttons d-flex gap-2">
              {
                filteredItem.includes(product._id) ?
                  <ImCart className="icons" onClick={() => handleCartDispatch(removeFromCart(product))} />
                  :
                  <AiOutlineShoppingCart className="icons" onClick={() => {
                    handleCartDispatch(addToCart({...product,totalPrice:variation[0].price?.offer || variation[0].price?.regular,quantity:1}));
                  }} />
              }
                <AiOutlineHeart className="icons" />
              </div>
            </div>
          </div>
          <hr />
          <div className="product-description">

            <div className="mt-2"> <span className="font-weight-bold" style={{ fontSize: "1.5rem" }}>Description</span>
              <p>{shortDescription}</p>
            </div>

            <h5 className="my-2 font-16px fw-bold">
              Category :
              <span className="font-16px text-muted fw-normal">
                {category?.map(item => item.title)}
              </span>
            </h5>
            <h5 className="my-2 font-16px fw-bold">Brand :
              <span className="font-16px text-muted fw-normal">
                {brand.title}
              </span>
            </h5>
            <h5 className="my-2 font-16px fw-bold">
              Tags : {tag.map((item, idx) =>
                <span className="font-16px text-muted fw-normal" key={idx}>
                  {item.title},
                </span>)}
            </h5>

          </div>
        </div>

      </div>
    </div>
  )
}
