import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.agentLogin || initialState;

export const selectAgentLogin = createSelector(
  [selectDomain],
  agentLoginState => agentLoginState,
);

export const selectLoading = createSelector(
  [selectDomain],
  agentLoginState => agentLoginState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  agentLoginState => agentLoginState.error,
);

export const selectSuccess = createSelector(
  [selectDomain],
  agentLoginState => agentLoginState.success,
);

export const selectLoginData = createSelector(
  [selectDomain],
  agentLoginState => agentLoginState.loginData,
);
