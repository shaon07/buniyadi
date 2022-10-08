import React from 'react';
import Footer from "../Footer/Footer";

import { Col, Container, Row } from "react-bootstrap";
import Header from '../Header/Header';
import Sidebar from "../Sidebar/Sidebar";

export default function Layout({ children, category }) {
  return (
    <div>
      <Header />
      <main className="mt-4">
        <Container>
          <Row>
            <Col lg={3}>
              <Sidebar categoryLists={category} />
            </Col>
            <Col lg={9}>
              {children}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
