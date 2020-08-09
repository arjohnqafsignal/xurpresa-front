import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the BecomeAgent container
export const initialState: ContainerState = {
  loading: false,
  error: '',
  success: '',
  registrationData: {},
};

const becomeAgentSlice = createSlice({
  name: 'becomeAgent',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},

    toogleLoading(state) {
      state.loading = !state.loading;
    },
    submitForm(state, action: PayloadAction<any>) {
      state.registrationData = action.payload;
    },
    registrationError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = !state.loading;
    },
    registrationSuccess(state, action: PayloadAction<any>) {
      state.success = action.payload;
      state.loading = !state.loading;
    },
  },
});

export const { actions, reducer, name: sliceKey } = becomeAgentSlice;
