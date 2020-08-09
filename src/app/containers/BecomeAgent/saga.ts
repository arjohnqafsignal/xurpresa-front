import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import axios from 'axios';

function apiAgentRegister(payload) {
  const register = axios
    .post('http://localhost:9100/api/agent/register', payload)
    .then(response => {
      return {
        status: 'success',
        data: response,
      };
    })
    .catch(error => {
      let errMessage = '';
      let status = error.response.status;
      switch (status) {
        case 409:
          errMessage = 'Email is already in used.';
          break;
        case 404:
          errMessage = 'Api URL not Found.';
          break;
        case 500:
          errMessage = 'Server error.';
          break;
        default:
          errMessage = 'Error undefined.';
      }

      return {
        status: 'error',
        data: errMessage,
      };
    });
  return register;
}
export function* doRegister({ payload }) {
  const result = yield apiAgentRegister(payload);
  if (result.status === 'error') {
    yield put(actions.registrationError(result.data));
  } else {
    yield put(
      actions.registrationSuccess(
        'Registration successful! Please verify your email.',
      ),
    );
  }
}

export function* becomeAgentSaga() {
  yield takeLatest(actions.submitForm, doRegister);
}
