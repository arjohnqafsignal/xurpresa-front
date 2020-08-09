/**
 *
 * VerifyAgent
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectVerifySuccess, selectVerifyError } from './selectors';
import { verifyAgentSaga } from './saga';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

interface Props {}

export function VerifyAgent(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: verifyAgentSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const success = useSelector(selectVerifySuccess);
  const error = useSelector(selectVerifyError);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const currentUrl = window.location.href;
    const arrayUrl = currentUrl.split('/');
    const verificationToken = arrayUrl[4];

    dispatch(actions.verifyAction(verificationToken));

    if (error) {
      dispatch(actions.verifyError(error));
    }
    if (success) {
      dispatch(actions.verifySuccess(success));
    }
    setTimeout(() => {
      history.push('/agent-login');
    }, 1000);
  }, [dispatch, error, success, history]);
  return (
    <>
      <Helmet>
        <title>Verifying Agent</title>
      </Helmet>
      <div>
        <Row>
          <Col lg="12">
            <h1 className="text-center">Verifying your account.</h1>
          </Col>
        </Row>
      </div>
    </>
  );
}
