import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

import { doApi } from '../../../utils/api';

export function* doLogin({ payload }) {
  const loginResult = yield doApi('agent/login', payload);
  if (loginResult.status === 'success') {
    const { data } = loginResult.data;
    localStorage.setItem('user', JSON.stringify(data.agent));
    localStorage.setItem('token', data.token);
    yield put(
      actions.verifySuccess('Account successfully verified! Please login.'),
    );
  } else {
    let errMsg = '';
    switch (loginResult.data) {
      case 409:
        errMsg = 'Agent Account is already verified.';
        break;
      case 401:
        errMsg = 'Invalid password.';
        break;
      case 404:
        errMsg = 'Could not find your email account.';
        break;
      case 500:
        errMsg = 'Internal Server Error';
        break;
      default:
        errMsg = 'Error undefined';
    }
    yield put(actions.verifyError(errMsg));
  }
}

export function* agentLoginSaga() {
  yield takeLatest(actions.submitForm, doLogin);
}
