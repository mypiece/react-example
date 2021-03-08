import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import todos, { todosSaga } from 'lib/redux/todos';
import loading from 'lib/redux/loading';

// 리듀서를 통합하는 루트 리듀서를 만든다.
// 스토어는 하나만 생성할 수 있는데 그 때 사용된다.
const rootReducer = combineReducers({
  todos,
  loading
})

export function* rootSaga(){
  //합칠 사가들를 all 함수에 배열인자로 전달한다.
  yield all([todosSaga()]);
}

export default rootReducer;