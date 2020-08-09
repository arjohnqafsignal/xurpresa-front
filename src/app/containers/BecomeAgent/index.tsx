/**
 *
 * BecomeAgent
 *
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { becomeAgentSaga } from './saga';
import { AvForm, AvInput, AvField } from 'availity-reactstrap-validation';

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  Spinner,
  Alert,
} from 'reactstrap';

import { selectError, selectLoading, selectSuccess } from './selectors';

import { BecomeAgentDetails } from '../../components/BecomeAgentDetails';

interface Props {}

export function BecomeAgent(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: becomeAgentSaga });

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('Arjohn Quijano');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('1234567');
  const [company, setCompany] = useState('SingleDraft');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const toggleAgree = evt => {
    const value = evt === 'true' ? true : false;
    setAgree(value);
    setDisabledButton(value);
    console.log(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const formData = {
      name: fullName,
      email: email,
      mobileNumber: mobileNumber,
      company: company,
      password: password,
      confirmPassword: confirmPassword,
    };
    dispatch(actions.submitForm(formData));
    dispatch(actions.toogleLoading());
    setDisabledButton(true);
  };

  useEffect(() => {
    if (error) {
      setDisabledButton(false);
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>Become Agent</title>
        <meta name="description" content="Description of Become Agent" />
      </Helmet>
      <Row className="mt-5">
        <Col lg="5" className="mt-5">
          <Card>
            <CardBody>
              <AvForm onValidSubmit={handleSubmit}>
                {success && !error && <Alert color="success">{success}</Alert>}
                {error && !success && <Alert color="danger">{error}</Alert>}
                <AvField
                  label="Full Name"
                  type="text"
                  name="fullName"
                  id="name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please provide your full name.',
                    },
                    maxLength: {
                      value: 50,
                    },
                  }}
                />
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
                  label="Mobile Number"
                  type="text"
                  name="mobile_number"
                  id="mobile_number"
                  value={mobileNumber}
                  onChange={e => setMobileNumber(e.target.value)}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please provide your mobile number.',
                    },
                    pattern: {
                      value: '^[0-9]+$',
                      errorMessage:
                        'Your mobile number must composed with numbers only.',
                    },
                    maxLength: {
                      value: 50,
                    },
                  }}
                />
                <AvField
                  label="Company (Optional)"
                  type="text"
                  name="company"
                  id="company"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  validate={{
                    maxLength: {
                      value: 50,
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
                <AvField
                  label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please confirm your password.',
                    },
                    match: {
                      value: 'password',
                      errorMessage: 'Password not match.',
                    },
                  }}
                />
                <FormGroup check>
                  <AvInput
                    type="checkbox"
                    name="terms"
                    required
                    value={agree}
                    onChange={e => toggleAgree(e.target.value)}
                  />
                  <Label check for="terms">
                    {' '}
                    I agree to the terms of service and privacy policy.
                  </Label>
                </FormGroup>
                <FormGroup className="mt-4">
                  <Button
                    type="submit"
                    color="success"
                    block
                    disabled={disabledButton}
                  >
                    Get Started for Free
                  </Button>
                </FormGroup>
                {isLoading && (
                  <FormGroup>
                    <h6>
                      Loading..... <Spinner color="secondary" />
                    </h6>
                  </FormGroup>
                )}
              </AvForm>
            </CardBody>
          </Card>
        </Col>
        <Col lg="7" className="mt-5">
          <BecomeAgentDetails />
        </Col>
      </Row>
    </>
  );
}
