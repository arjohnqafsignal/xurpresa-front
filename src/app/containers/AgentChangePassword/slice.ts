import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the AgentChangePassword container
export const initialState: ContainerState = {};

const agentChangePasswordSlice = createSlice({
  name: 'agentChangePassword',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions, reducer, name: sliceKey } = agentChangePasswordSlice;
