import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductSlides from "../../Components/ProductSlides/ProductSlides";
import './ProductCard.css';
import ProductDetailCard from "./ProductDetailCard";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]); // single product state
  const [relatedProduct, setRelatedProduct] = useState([]); // single product related product state
  const [relatedProductLimit, setRelatedProductLimit] = useState(50);


  // fetching single product using dynamic product id
  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/product/${id}?resolveCategory=1&resolvePrimaryCategory=1&resolveBrand=1&resolveTag=1&resolveCover=1&resolveImage=1`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setSingleProduct([res]))
      .catch(err => console.log(err))
  }, [id])

  // fetching single product related products
  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/product/${id}/relatedProduct?limit=${relatedProductLimit}&resolveCategory=1&resolvePrimaryCategory=1&resolveBrand=1&resolveTag=1&resolveCover=1&resolveAttribute=1`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setRelatedProduct(res.data))
      .catch(err => console.log(err))
  }, [id, relatedProductLimit])

  return (
    <section>
      <Container>

        {
          singleProduct?.map((item, ind) => {
            return (
              <ProductDetailCard item={item} key={ind} />
            )
          })
        }

        {/* Related Products */}
        <div>
          <ProductSlides title="Relevant Products" products={relatedProduct} />
        </div>
      </Container>
    </section>
  )
}

export default ProductDetailsPage