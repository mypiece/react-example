import {call, delay, put} from 'redux-saga/effects';
import { startLoading, finishLoading } from 'lib/redux/loading';

export const createApiActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

const restCallSaga = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작(put 함수의 역할은 디스패치)
    try {
      yield delay(1000); //테스트용
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: Object.keys(response.data).length > 0 ? response.data : action.payload
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}

export default restCallSaga;