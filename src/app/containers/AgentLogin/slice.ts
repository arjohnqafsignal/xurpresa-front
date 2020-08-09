import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the AgentLogin container
export const initialState: ContainerState = {
  loading: false,
  error: '',
  success: '',
  loginData: {},
};

const agentLoginSlice = createSlice({
  name: 'agentLogin',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    toogleLoading(state) {
      state.loading = !state.loading;
    },
    submitForm(state, action: PayloadAction<any>) {
      state.loginData = action.payload;
    },
    loginError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.success = action.payload;
    },
    verifyError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.success = '';
    },
    verifySuccess(state, action: PayloadAction<any>) {
      state.success = action.payload;
      state.error = '';
    },
  },
});

export const { actions, reducer, name: sliceKey } = agentLoginSlice;
