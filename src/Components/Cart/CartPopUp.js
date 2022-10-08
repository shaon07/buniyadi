import React, { useContext, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { cartQuantity, onChangeCartQuantity, removeFromCart } from "../../Context/actions/actions";
import { Language } from "../../pages/Pages";

export default function CartPopUp({ item, imageID, price, idx, setTotalPrice }) {
  let [quantity, setQuantity] = useState(item.quantity);
  const { cartItem, handleCartDispatch } = useContext(Language);

  const hanldeQuantity = (e, id) => {
    if (quantity) {
      const qtty = (parseInt(e.target.value) || 1);
      const filtered = cartItem?.data.filter(data => data._id === id);
      const totalPrice = price * qtty;
      handleCartDispatch(onChangeCartQuantity({ ...filtered[0], quantity: quantity }, qtty, totalPrice));
    } else {
      setQuantity(1)
    }
  }



  const addQuantity = (id) => {
    if (quantity >= 0) {
      setQuantity(quantity + 1);
      const filtered = cartItem?.data.filter(data => data._id === id);
      handleCartDispatch(cartQuantity({ ...filtered[0], totalPrice: price * ++quantity, quantity: quantity }));
      setTotalPrice()
    } else {
      setQuantity(quantity);
    }
  }

  const removeQuantity = (id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const filtered = cartItem?.data.filter(data => data._id === id);
      handleCartDispatch(cartQuantity({ ...filtered[0], totalPrice: price * --quantity, quantity: quantity }));
      setTotalPrice()
    } else {
      setQuantity(1)
    }
  }



  return (
    <tr>
      <td>{idx + 1}</td>
      <td className="table-column-lg">
        <div className="product-cart">
          <div className="product-cart__img">
            <img style={{ width: "50%" }} src={`https://server.buniyadi.craftedsys.com/api/image/serve/${imageID}?width=400&height=400&quality=75&format=webp&fit=contain&bg=fff`} alt="product title" />
          </div>
          <div className="product-cart__info">
            <p>Product Category</p>
            <h2>{item.title} </h2>
          </div>
        </div>
      </td>
      <td className="table-column-md">
        <span className="product-cart-price">{price} <sup>tk</sup> </span>
      </td>
      <td className="table-column-md">
        <div className="product-cart-counter">
          <button onClick={() => {
            removeQuantity(item._id)
          }} className="dec">
            <AiOutlineMinus />
          </button>
          <input type="number" value={quantity || 1} onChange={(e) => {
            setQuantity(parseInt(e.target.value));
            hanldeQuantity(e, item._id)
          }
          } />
          <button onClick={() => {
            addQuantity(item._id);
          }} className="inc">
            <AiOutlinePlus />
          </button>
        </div>
      </td>
      <td className="table-column-md">
        <span className="product-cart-total"> {item.totalPrice} tk</span>
      </td>
      <td className="table-column-md">
        <button className="product-cart-remove" onClick={() => {
          handleCartDispatch(removeFromCart(item))
        }}>
          <MdOutlineRemoveShoppingCart />
          remove</button>
      </td>
    </tr>
  )
}
