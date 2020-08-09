import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.verifyAgent || initialState;

export const selectVerifyAgent = createSelector(
  [selectDomain],
  verifyAgentState => verifyAgentState,
);

export const selectVerifySuccess = createSelector(
  [selectDomain],
  verifyAgentState => verifyAgentState.verificationSuccess,
);

export const selectVerifyError = createSelector(
  [selectDomain],
  verifyAgentState => verifyAgentState.verificationError,
);
