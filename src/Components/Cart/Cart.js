import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Table } from "react-bootstrap";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import { addTotalAmount, clearCartItem } from "../../Context/actions/actions";
import { Language } from "../../pages/Pages";
import Dialogue from "../Dialogue/Dialogue";
import CartPopUp from "./CartPopUp";
export default function Cart({ show, onHide }) {

  // const { cartItem, handleCartDispatch } = useContext(Language);
  const { cartItem, handleCartDispatch, handleTotalAmountDispatch } = useContext(Language);
  const [totalPrice, setTotalPrice] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(50);
  const [totalAmount, setTotalAmount] = useState();


  const showTotalPrice = () => {
    const price = cartItem.data.map((item) => item.totalPrice);
    const sumWithInitial = price.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    setTotalPrice(parseInt(sumWithInitial));
    setTotalAmount(totalPrice + deliveryCharge)
  }

  useEffect(() => {
    showTotalPrice();
    // setDeliveryCharge(cartItem.data.length === 0 ? 0 : 50)
  })

  return (
    <Dialogue show={show} onHide={onHide} >
      <div className="cart">
        <div>
          <h2 className="fs-4 p-3">Cart Lists</h2>
        </div>
        <div className="cart-content p-3">
          <Row>
            <Col lg={8} style={{ overflow: "hidden", position: "relative" }}>
              <Table className="cart-table align-middle" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="table-column-lg">Product</th>
                    <th className="table-column-md">Price</th>
                    <th className="table-column-md">quantity</th>
                    <th className="table-column-md">total</th>
                    <th className="table-column-md" onClick={() => handleCartDispatch(clearCartItem())}>Remove</th>
                  </tr>
                </thead>
                <tbody >
                  {
                    cartItem?.data?.map((item, idx) => {
                      const imageID = typeof item.image[0] == 'object' ? item.image[0]._id : item.image[0];
                      const price = item.variation[0].price?.offer || item.variation[0].price?.regular;
                      return (
                        <CartPopUp item={item} idx={idx} key={idx} imageID={imageID} price={price} setTotalPrice={setTotalPrice} />
                      )
                    })
                  }
                </tbody>
              </Table>
              {
                cartItem.data.length === 0 ? <img className="empty-cart-img" src={require('../../assets/images/emptycart.png')} alt="cart" /> : ""
              }
            </Col>
            <Col lg={4}>
              <div className="product-cart-details">
                <h2 className="fs-5 mb-3">Price Details( {cartItem.data.length} items )</h2>
                <ul>
                  <li>
                    <p>Subtotal</p>
                    <p>{totalPrice}<sup><TbCurrencyTaka /></sup> </p>
                  </li>
                  <li>
                    <p>Discounts</p>
                    <p>{0}<sup><TbCurrencyTaka /></sup> </p>
                  </li>
                  <li>
                    <p>Delivery Charge</p>
                    <p>50<sup><TbCurrencyTaka /></sup> </p>
                  </li>
                  <li>
                    <p>Total Amount</p>
                    <p>{totalPrice ? totalAmount : 0}<sup><TbCurrencyTaka /></sup> </p>
                  </li>
                </ul>
              </div>

              {
                cartItem.data.length === 0 ?
                  "" :
                  <Link to={`/checkout`}>
                    <div className="btn btn-outline-danger mt-4" onClick={() => {
                      handleTotalAmountDispatch(addTotalAmount(totalAmount));
                      onHide()
                    }}>continue to checkout</div>
                  </Link>
              }


            </Col>
          </Row>
        </div>
      </div>
    </Dialogue>
  )
}
