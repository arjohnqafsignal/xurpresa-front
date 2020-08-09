/**
 *
 * AgentProfile
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectAgentProfile } from './selectors';
import { agentProfileSaga } from './saga';

interface Props {}

export function AgentProfile(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: agentProfileSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const agentProfile = useSelector(selectAgentProfile);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Agent Profile</title>
        <meta name="description" content="Description of Agent Profile" />
      </Helmet>
      <div></div>
    </>
  );
}
