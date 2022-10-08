import React, { useContext, useState } from 'react';
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Language } from "../Pages";
import './checkout.css';

export default function CheckoutPage() {
  const { cartItem, totalCartAmount, setUserNameInfo } = useContext(Language);
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: ""
  })

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserNameInfo(userInfo);
    navigate('/invoice')
    
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: ""
    });
  }

  return (
    <div className="container pt-5">
      <form onSubmit={handleFormSubmit}>
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>First Name</label>
                  <input required value={userInfo.firstName} onChange={handleUserInput} className="form-control" name="firstName" type="text" placeholder="John" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Last Name</label>
                  <input required value={userInfo.lastName} onChange={handleUserInput} className="form-control" name="lastName" type="text" placeholder="Doe" />
                </div>
                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input required value={userInfo.email} onChange={handleUserInput} className="form-control" name="email" type="text" placeholder="example@email.com" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Mobile No</label>
                  <input required value={userInfo.mobile} onChange={handleUserInput} className="form-control" name="mobile" type="text" placeholder="+123 456 789" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Address Line 1</label>
                  <input required value={userInfo.address1} onChange={handleUserInput} className="form-control" name="address1" type="text" placeholder="123 Street" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Address Line 2</label>
                  <input required value={userInfo.address2} onChange={handleUserInput} className="form-control" name="address2" type="text" placeholder="123 Street" />
                </div>

                <div className="col-md-6 form-group">
                  <label>City</label>
                  <input required value={userInfo.city} onChange={handleUserInput} className="form-control" name="city" type="text" placeholder="New York" />
                </div>
                <div className="col-md-6 form-group">
                  <label>State</label>
                  <input required value={userInfo.state} onChange={handleUserInput} className="form-control" name="state" type="text" placeholder="New York" />
                </div>
                <div className="col-md-6 form-group">
                  <label>ZIP Code</label>
                  <input required value={userInfo.zipcode} onChange={handleUserInput} className="form-control" name="zipcode" type="text" placeholder="123" />
                </div>
              </div>

            </div>
          </div>
          <div className="col-lg-4">
            <div className="card card_border_color mb-5">
              <div className="card-header cart_title_bg border-0">
                <h4 className="font-weight-semi-bold m-0">Order Total</h4>
              </div>
              <div className="card-body">
                <h5 className="font-weight-medium mb-3">Products</h5>
                {
                  cartItem.data?.map((item, idx) => {
                    return (
                      <div className="d-flex justify-content-between" key={idx}>
                        <p>{item.title}</p>
                        <p>{item.totalPrice}<TbCurrencyTaka /></p>
                      </div>
                    )
                  })
                }

                <hr className="mt-0" />

                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Delivery Charge</h6>
                  <h6 className="font-weight-medium">50<TbCurrencyTaka /></h6>
                </div>
              </div>
              <div className="card-footer card_total card_border_color bg-transparent">
                <div className="d-flex justify-content-between mt-2 mb-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">{totalCartAmount.price || 0}<TbCurrencyTaka /></h5>
                </div>
                <div className="card-footer text-center p-0 card_border_color bg-transparent">
                  {/* <Link to="/invoice"> */}
                    <button className="order_btn font-weight-bold my-3 py-3" type="submit">Place Order</button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
