import { createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { takeLatest} from "redux-saga/effects";
import * as todoApi from 'lib/rest/todoApi';
import restCallSaga from 'lib/utils/restCallSaga';

// 초기상태
const initialState = {
  input: '',
  todoList: []
};

// 액션타입
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값 변경
const TOGGLE_TODO = 'todos/TOGGLE_TODO'; // todo 를 체크/체크해제
const INIT = 'todos/INIT';

const GET_TODOS = 'todos/GET_TODOS'; // todos 데이터 조회
const GET_TODOS_SUCCESS = 'todos/GET_TODOS_SUCCESS'; // todos 데이터 조회 성공

const CREATE_TODO = 'todos/CREATE_TODO'; // 새로운 todo 등록
const CREATE_TODO_SUCCESS = 'todos/CREATE_TODO_SUCCESS'; // 새로운 todo 등록 성공

const REMOVE_TODO = 'todos/REMOVE_TODO'; // todo 삭제
const REMOVE_TODO_SUCCESS = 'todos/REMOVE_TODO_SUCCESS'; // todo 제거 성공



// 액션 생성 함수
export const changeInput = createAction(CHANGE_INPUT, input => input);
export const toggle = createAction(TOGGLE_TODO, id => id);
export const getTodos = createAction(GET_TODOS);
export const createTodo = createAction(CREATE_TODO, text => ({
  text,
  done: false
}));
export const removeTodo = createAction(REMOVE_TODO, id => id);
export const init = createAction(INIT);

//사가로 모니터링한 액션으로 수행될 함수를 정의한다.
const getTodosSaga = restCallSaga(GET_TODOS, todoApi.getTodos);
const createTodosSaga = restCallSaga(CREATE_TODO, todoApi.createTodo);
const removeTodosSaga = restCallSaga(REMOVE_TODO, todoApi.removeTodo);

//사가로 액션을 모니터링 한다.
export function* todosSaga(){
  yield takeLatest(GET_TODOS, getTodosSaga);
  yield takeLatest(CREATE_TODO, createTodosSaga);
  yield takeLatest(REMOVE_TODO, removeTodosSaga);
}


// 리듀서 함수
const todos = handleActions(
    {
      [INIT]: () => initialState,
      [CHANGE_INPUT]: (state, { payload: input }) =>
          // input 값 변경해서 리턴
          produce(state, draft => {
            draft.input = input;
          }),
      [TOGGLE_TODO]: (state, { payload: id }) =>
          // todos 배열에서 id에 해당하는 자원을 찾아서
          // done 값을 토글한다.
          produce(state, draft => {
            const todo = draft.todoList.find(todo => todo.id === id);
            todo.done = !todo.done;
          }),
      [GET_TODOS_SUCCESS]: (state, { payload: todoList }) =>
          produce(state, draft => {
            draft.todoList = todoList;
          }),
      [CREATE_TODO_SUCCESS]: (state, { payload: todo }) =>
          // todos 배열에 todo 추가해서 리턴
          produce(state, draft => {
            draft.todoList.push(todo);
          }),
      [REMOVE_TODO_SUCCESS]: (state, { payload: id }) =>
          // todos 배열에서 id에 해당하는 값을 삭제해서 리턴
          produce(state, draft => {
            const index = draft.todoList.findIndex(todo => todo.id === id);
            draft.todoList.splice(index, 1);
          })
  },
  initialState
);

export default todos;