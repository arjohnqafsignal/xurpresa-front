import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Row, Col } from 'reactstrap';
export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Xurpresa is an online service provider who cater suprises."
        />
      </Helmet>
      <Row>
        <Col lg="12">
          <h1 className="text-center">Home page details</h1>
        </Col>
      </Row>
    </>
  );
}
