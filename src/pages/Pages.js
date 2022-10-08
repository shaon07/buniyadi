import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { cartReducer, initData, initTotalAmount, totalAMountReducer } from "../Context/Context";
import CheckoutPage from "./checkoutpage/CheckoutPage";
import Homepage from "./Homepage/Homepage";
import Invoice from "./Invoicepage/Invoice";
import ProductListPage from "./ProdocutListPage/ProductListPage";
import ProductDetailsPage from "./ProductDetailsPage/ProductDetailsPage";

const Language = createContext();

export default function Pages({ category, products }) {
  const [lang, setLang] = useState(null);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [cartItem, handleCartDispatch] = useReducer(cartReducer, initData);
  const [showCartBox, setShowcartBox] = useState(false);
  const [allPrice, setAllPrice] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [categoryName, setCategoryName] = useState([]);
  const [totalCartAmount, handleTotalAmountDispatch] = useReducer(totalAMountReducer, initTotalAmount);
  const [userNameInfo, setUserNameInfo] = useState({})

  // calling brands api
  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/brand?limit=50`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setBrands(res.data))
      .catch(err => console.log(err))
  }, []);


  // calling tags api
  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/tag?limit=50`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setTags(res.data))
      .catch(err => console.log(err))
  }, []);


  // calling category api

  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/category`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setCategoryName(res.data))
  }, []);

  const ProviderVal = { lang, setLang, brands, tags, category, cartItem, handleCartDispatch, showCartBox, setShowcartBox, allPrice, setAllPrice, currentIdx, setCurrentIdx, categoryName, totalCartAmount, handleTotalAmountDispatch, userNameInfo, setUserNameInfo }



  return (
    <Language.Provider value={ProviderVal}>
      <Layout category={category}>
        <Routes>
          <Route path="/" element={<Homepage products={products} category={category} />} />
          <Route path="/product-list" element={<ProductListPage />} >
            <Route path="/product-list" element={<ProductListPage />} />
            <Route path="/product-list/:id" element={<ProductListPage />} />
          </Route>
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </Layout>
    </Language.Provider>
  )
}

export { Language };

