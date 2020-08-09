import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.becomeAgent || initialState;

export const selectBecomeAgent = createSelector(
  [selectDomain],
  becomeAgentState => becomeAgentState,
);

export const selectLoading = createSelector(
  [selectDomain],
  becomeAgentState => becomeAgentState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  becomeAgentState => becomeAgentState.error,
);

export const selectSuccess = createSelector(
  [selectDomain],
  becomeAgentState => becomeAgentState.success,
);

export const selectRegistrationData = createSelector(
  [selectDomain],
  becomeAgentState => becomeAgentState.registrationData,
);
