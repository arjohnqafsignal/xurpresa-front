/**
 *
 * AgentLogin
 *
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectError, selectSuccess } from './selectors';
import {
  selectVerifySuccess,
  selectVerifyError,
} from '../VerifyAgent/selectors';
import { agentLoginSaga } from './saga';

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  FormText,
  Alert,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
interface Props {}

export function AgentLogin(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: agentLoginSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const verifyError = useSelector(selectVerifyError);
  const verifySuccess = useSelector(selectVerifySuccess);
  const loginError = useSelector(selectError);
  const loginSuccess = useSelector(selectSuccess);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const [loginButton, setLoginButton] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    setLoginButton(true);
    const formData = {
      email: email,
      password: password,
    };
    dispatch(actions.submitForm(formData));
    dispatch(actions.toogleLoading());
  };

  useEffect(() => {
    if (loginError) {
      setLoginButton(false);
    }

    if (loginSuccess) {
      window.location.href = '/agent-dashboard';
    }
  }, [loginSuccess, loginError, setLoginButton]);

  return (
    <>
      <Helmet>
        <title>Agent Login</title>
        <meta name="description" content="Description of AgentLogin" />
      </Helmet>
      <div>
        <Row className="mt-5">
          <Col lg="6" className="mt-5"></Col>
          <Col lg="6" className="mt-5">
            <Card>
              <CardBody>
                <AvForm onValidSubmit={handleSubmit}>
                  {verifyError && <Alert color="danger">{verifyError}</Alert>}
                  {loginError && <Alert color="danger">{loginError}</Alert>}
                  {verifySuccess && (
                    <Alert color="primary">{verifySuccess}</Alert>
                  )}
                  <AvField
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Please provide your email address.',
                      },
                      maxLength: {
                        value: 50,
                      },
                      email: {
                        value: true,
                        errorMessage: 'Please provide proper email.',
                      },
                    }}
                  />
                  <AvField
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Please provide your valid password.',
                      },
                      minLength: {
                        value: 8,
                        errorMessage:
                          'Your password must be 8 characters minimum.',
                      },
                    }}
                  />
                  <FormGroup>
                    <Button className="mt-4 mb-4" disabled={loginButton}>
                      Login
                    </Button>
                    <FormText>
                      Want to become our Agent? &nbsp;
                      <Link to="/become-agent">Register here</Link>
                    </FormText>
                  </FormGroup>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
