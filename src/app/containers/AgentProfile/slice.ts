import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the AgentProfile container
export const initialState: ContainerState = {};

const agentProfileSlice = createSlice({
  name: 'agentProfile',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions, reducer, name: sliceKey } = agentProfileSlice;
