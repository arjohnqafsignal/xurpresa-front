import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the AgentDashboard container
export const initialState: ContainerState = {};

const agentDashboardSlice = createSlice({
  name: 'agentDashboard',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions, reducer, name: sliceKey } = agentDashboardSlice;
