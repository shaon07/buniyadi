import React, { useContext, useRef } from 'react';
import { TbCurrencyTaka } from "react-icons/tb";
import ReactToPrint from "react-to-print";
import { Language } from "../Pages";
import './invoice.css';

export default function Invoice() {
  const { cartItem, totalCartAmount, userNameInfo } = useContext(Language);
  const componentRef = useRef();

  return (
    <div className="container" ref={componentRef}>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className="left">
            Invoice
            <strong style={{ paddingLeft: "10px" }}>{new Date().toLocaleDateString()}</strong>
          </div>
          <div className="right">
            <ReactToPrint
              trigger={() => (<span className="float-right"> <strong className="btn btn-success">Download</strong></span>)}
              content={() => componentRef.current}
            />
          </div>
        </div>
        <div className="card-body pt-3">
          <div className="row mb-4">
            <div className="col-sm-6">
              <h6 className="mb-3">From:</h6>
              <div>
                <strong>E-commerce.com</strong>
              </div>
              <div>Baridhara</div>
              <div>Dhaka, Bangladesh</div>
              <div>Email: e-commerce@ecommerce.com</div>
              <div>Phone: +48 444 666 3333</div>
            </div>

            <div className="col-sm-6">
              <h6 className="mb-3">To:</h6>
              <div>
                <strong>{`${userNameInfo.firstName} ${userNameInfo.lastName}`}</strong>
              </div>
              <div>Email: {userNameInfo.email}</div>
              <div>Phone: {userNameInfo.mobile}</div>
              <div>{userNameInfo.address1}</div>
              <div>{`${userNameInfo.state} - ${userNameInfo.zipcode}`}</div>
            </div>



          </div>

          <div className="table-responsive-sm">
            <table className="table table-striped">
              <thead className="bg-info">
                <tr>
                  <th className="center">#</th>
                  <th>Item</th>
                  <th>Unit Info</th>

                  <th className="right">Unit Cost</th>
                  <th className="center">Qty</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItem.data.map((item, idx) => {
                    const basePrice = item.variation[0].price.offer || item.variation[0].price.regular;
                    const unitInfo = item.variation[0].attribute[0].value;
                    return (
                      <tr key={idx}>
                        <td className="center">{idx + 1}</td>
                        <td className="left strong">{item.title}</td>
                        <td className="left">{unitInfo}</td>

                        <td className="right">{basePrice}<TbCurrencyTaka /></td>
                        <td className="center">{item.quantity}</td>
                        <td className="right">{item.totalPrice}<TbCurrencyTaka /></td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
          <div className="row">


            <div className="col-12 ml-auto">
              <table className="table table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Subtotal</strong>
                    </td>
                    <td className="text-end p-right">{totalCartAmount.price - 50 || 0}<TbCurrencyTaka /></td>
                  </tr>
                  {/* <tr>
                    <td className="left">
                      <strong>Discount (20%)</strong>
                    </td>
                    <td className="text-end p-right">$1,699,40</td>
                  </tr> */}
                  <tr>
                    <td className="left">
                      <strong>Delivery Charge</strong>
                    </td>
                    <td className="text-end p-right">50<TbCurrencyTaka /> </td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Total</strong>
                    </td>
                    <td className="text-end p-right">
                      <strong>{totalCartAmount.price || 0}<TbCurrencyTaka /></strong>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
