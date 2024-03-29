import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.agentChangePassword || initialState;

export const selectAgentChangePassword = createSelector(
  [selectDomain],
  agentChangePasswordState => agentChangePasswordState,
);
