/**
 *
 * AgentChangePassword
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectAgentChangePassword } from './selectors';
import { agentChangePasswordSaga } from './saga';

interface Props {}

export function AgentChangePassword(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: agentChangePasswordSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const agentChangePassword = useSelector(selectAgentChangePassword);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Agent Change Password</title>
        <meta name="description" content="Agent Change Password" />
      </Helmet>
      <div></div>
    </>
  );
}
