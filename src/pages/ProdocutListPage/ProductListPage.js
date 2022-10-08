import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Nav, NavDropdown, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Language } from "../Pages";


const ProductListPage = () => {
  const { id } = useParams('');
  const [products, setProduct] = useState([]);
  const { brands, tags } = useContext(Language);
  const [brandID, setBrandID] = useState('');
  const [tagName, setTagName] = useState('');
  const [limit] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(7)


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)


  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/product?limit=${limit}&category=${id === undefined ? "" : id}&brand=${brandID}&tag=${tagName}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.log(res.status, "status");
        }
      })
      .then(res => setProduct(res?.data))
      .catch(err => console.log(err))
  }, [id, brandID, tagName, limit]);

  return (
    <section>
      <Container>
        <div className="product-list-head d-flex justify-content-between align-items-center product-found-wrapper mb-4">
          <div className="product-found">
            <h6>{products?.length} products found</h6>
          </div>
          <div className="product-filter">
            <Nav className="ms-auto">
              <NavDropdown title={"Brands"} className="header-user-icon" id="user-dropdown">
                {
                  brands?.map((item, ind) => {
                    return (
                      <NavDropdown.Item href="#" key={ind} onClick={() => setBrandID(item._id)}>{item.title}</NavDropdown.Item>
                    )
                  })
                }

              </NavDropdown>
              <NavDropdown title="Tags" id="lng-dropdown">
                {
                  tags?.map((item, ind) => {
                    return (
                      <NavDropdown.Item href="#" key={ind} onClick={() => {
                        setTagName(item._id);
                      }}>{item.title}</NavDropdown.Item>
                    )
                  })
                }
              </NavDropdown>
            </Nav>
          </div>
        </div>
        <Row>
          {
            products?.length === 0 ? <div className="notFound">
              <img src="https://eonbazar.com/images/npf.jpg" alt="not found" className="img-fluid" />
            </div> :
              currentProducts?.map((data, idx) => (
                <Col md={6} lg={4} className="mb-4" key={idx}>
                  <ProductCard item={data} id={id} />
                </Col>
              ))
          }
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={products.length} />
        </Row>
      </Container>
    </section>
  )
}

export default ProductListPage