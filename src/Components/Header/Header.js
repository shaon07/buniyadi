import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import { BiUserCircle } from "react-icons/bi";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoLanguageOutline } from "react-icons/io5";
import { Language } from "../../pages/Pages";
import Cart from "../Cart/Cart";
import SearchField from "../SearchField/SearchField";

export default function Header() {
  const { cartItem, setLang, setShowcartBox, showCartBox, setCurrentIdx,lang } = useContext(Language);
  const cartHandler = () => setShowcartBox(!showCartBox);
  const [locale, setLocale] = useState([]);

  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/locale?limit=10`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setLocale(res?.data))
      .catch(err => console.log(err))
  }, []);



  return (
    <>
      <Navbar bg="light" expand="lg" className="header">
        <Container>
          <div className="header-logo" onClick={() => setCurrentIdx(null)} >
            <Link to="/">
              E-Commerce
            </Link>
          </div>
          <SearchField className="mx-auto" />
          <Nav className="ms-lg-auto d-flex align-items-center">

            <div onClick={() => setCurrentIdx(null)}>
              <Link to={"/product-list"} className=" me-3 text">
                {
                  lang ? "সব পণ্য" : "All Products"
                }

              </Link>
            </div>

            <div className="cart me-3" role="button" onClick={cartHandler}>
              <AiOutlineShoppingCart />
              <span>{cartItem.data.length}</span>
            </div>

            <div className="lng-selector">
              <IoLanguageOutline />
              <select className="form-select" aria-label="Default select example" onChange={(e) => setLang(e.target.value)}>
                <option value={""}>Eng</option>
                {
                  locale?.map((item, ind) => {
                    const { _id, title } = item;
                    return (
                      <option value={_id} key={ind}>{title}</option>
                    )
                  })
                }
              </select>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Cart show={showCartBox} onHide={cartHandler} />
    </>
  )
}
