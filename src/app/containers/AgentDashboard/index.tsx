/**
 *
 * AgentDashboard
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectAgentDashboard } from './selectors';
import { agentDashboardSaga } from './saga';
import { AgentAccountSetup } from 'app/components/AgentAccountSetup';

import { Row, Col } from 'reactstrap';
interface Props {}

export function AgentDashboard(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: agentDashboardSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const agentDashboard = useSelector(selectAgentDashboard);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <>
      <Helmet>
        <title>Agent Dashboard</title>
        <meta name="description" content="Description of AgentDashboard" />
      </Helmet>
      <div>
        {!user.recent ? (
          <AgentAccountSetup />
        ) : (
          <Row>
            <Col>test</Col>
          </Row>
        )}
      </div>
    </>
  );
}
