import { put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

import doApi from '../../../utils/api';
export function* doVerify({ payload }) {
  const verifyResult = yield doApi('agent/verify', {
    verificationToken: payload,
  });

  if (verifyResult.status === 'success') {
    yield put(
      actions.verifySuccess('Account successfully verified! Please login.'),
    );
  } else {
    let errMsg = '';
    switch (verifyResult.data) {
      case 409:
        errMsg = 'Agent Account is already verified.';
        break;
      case 404:
        errMsg = 'Invalid Verification Link.';
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

export function* verifyAgentSaga() {
  yield takeLatest(actions.verifyAction, doVerify);
}
