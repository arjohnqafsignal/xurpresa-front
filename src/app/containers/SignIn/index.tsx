import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  CardText,
} from 'reactstrap';
interface Props {}

export function SignIn(props: Props) {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div>
        <Row className="mt-5">
          <Col lg="6" className="mt-5"></Col>
          <Col lg="6" className="mt-5">
            <Card>
              <CardBody>
                <CardTitle>Sign using Third Party Account</CardTitle>
                <Button block="true" color="primary">
                  Login using Facebook
                </Button>
                <Button block="true" color="danger">
                  Login using Google
                </Button>
                <hr />
                <CardText>
                  Want to become our Agent ?
                  <Link to="/become-agent">Register here</Link> <br />
                  Already an Agent ? <Link to="/agent-login">Login here</Link>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
