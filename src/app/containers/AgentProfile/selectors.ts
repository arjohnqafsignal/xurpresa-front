import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.agentProfile || initialState;

export const selectAgentProfile = createSelector(
  [selectDomain],
  agentProfileState => agentProfileState,
);
