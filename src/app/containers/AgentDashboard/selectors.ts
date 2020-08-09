import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.agentDashboard || initialState;

export const selectAgentDashboard = createSelector(
  [selectDomain],
  agentDashboardState => agentDashboardState,
);
