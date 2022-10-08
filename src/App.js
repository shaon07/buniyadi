import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import '../src/app.css';
import '../src/index.css';
import Pages from "./pages/Pages";
import "./styles/sass/app.scss";

function App() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([])

  const [categoryLimit, setCategoryLimit] = useState(50); // set api limit fro category
  const [productLimit, setProductLimit] = useState(50); // set api limit for products

  // calling api for category
  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/category?limit=${categoryLimit}&resolveCover=1&resolveIcon=1&recursive=1&resolveParent=1&resolveImage=1&productCount=1&childCount=1&parent`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setCategory(res.data))
      .catch(err => console.log(err))
  }, [categoryLimit]);

  // calling api for products
  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/product?limit=${productLimit}`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [productLimit]);


  return (
    <BrowserRouter>
      <Pages category={category} products={products} />
    </BrowserRouter>
  );
}

export default App;
