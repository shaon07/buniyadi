import React, { useContext } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { Language } from "../../../pages/Pages"
import CategoryCard from "../../CategoryCard/CategoryCard"
export default function Category({ category }) {
  const { lang } = useContext(Language)
  return (
    <div className="category-lists my-4">
      <Container className="px-md-0">
        <Row>
          <h2 className="fs-4 mb-3">{lang ? "পণ্য বিভাগ" : "Products Category"}</h2>
          {
            category?.map((item, ind) => {
              return (
                <Col sm={2} md={3} lg={3} className="mb-4" key={ind}>
                  <CategoryCard item={item} />
                </Col>
              )
            })
          }

        </Row>
      </Container>
    </div>
  )
}
