import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the VerifyAgent container
export const initialState: ContainerState = {
  verificationToken: '',
  verificationError: '',
  verificationSuccess: '',
};

const verifyAgentSlice = createSlice({
  name: 'verifyAgent',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    verifyAction(state, action: PayloadAction<any>) {
      state.verificationToken = action.payload;
    },
    verifyError(state, action: PayloadAction<any>) {
      state.verificationError = action.payload;
      state.verificationSuccess = '';
    },
    verifySuccess(state, action: PayloadAction<any>) {
      state.verificationSuccess = action.payload;
      state.verificationError = '';
    },
  },
});

export const { actions, reducer, name: sliceKey } = verifyAgentSlice;
