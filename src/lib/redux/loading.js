import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  //초기 데이터 굳이 선언 안해줘도 되지만 어떤식으로 생성되는지 확인을 위해 작성해놓는다.
  "todos/GET_TODOS": false
};

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
    START_LOADING,
    componentType => componentType
);

export const finishLoading = createAction(
    FINISH_LOADING,
    componentType => componentType
);

const loading = handleActions(
    {
      [START_LOADING]: (state, {payload: componentType}) =>
        produce(state, draft => {
          draft[componentType] = true;
        }),
      [FINISH_LOADING]: (state, {payload: componentType}) =>
        produce(state, draft => {
          draft[componentType] = false;
        })
    },
    initialState
);

export default loading;
