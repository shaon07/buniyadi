import React, { useContext } from 'react'
import Banner from "../../Components/Home/Banner/Banner"
import Category from "../../Components/Home/Category/Category"
import ProductSlides from "../../Components/ProductSlides/ProductSlides"
import { Language } from "../Pages"

const Homepage = ({ products, category }) => {
  const { lang } = useContext(Language)
  return (
    <>
      {/* Banner */}
      <Banner products={products} />

      {/* Category  */}
      <Category category={category} />
      {/* Latest Product */}
      <ProductSlides products={products} title={lang ? "সর্বশেষ পণ্য" : "Latest Product"} />
    </>
  )
}
export default Homepage