import { createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { takeLatest} from "redux-saga/effects";
import * as todoApi from 'lib/rest/todoApi';
import restCallSaga from 'lib/utils/restCallSaga';

/*
액션타입 정의
액션타입은 대문자와 언더바(_)로 정의하고 문자열 내용은 '모듈이름/액션이름' 형태로 작성한다.
리덕스 사가로 전처리가 필요한 액션은
작업시작, 처리결과 액션이 각각 필요하며
실제작업은 액션은 사가에서 모니터링하고
처리결과 액션은 리듀서에서 모니터링 한다.
 */
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값 변경
const TOGGLE_TODO = 'todos/TOGGLE_TODO'; // todo 를 체크/체크해제
const INIT = 'todos/INIT';

const GET_TODOS = 'todos/GET_TODOS'; // todos 데이터 조회
const GET_TODOS_SUCCESS = 'todos/GET_TODOS_SUCCESS'; // todos 데이터 조회 성공

const CREATE_TODO = 'todos/CREATE_TODO'; // 새로운 todo 등록
const CREATE_TODO_SUCCESS = 'todos/CREATE_TODO_SUCCESS'; // 새로운 todo 등록 성공

const REMOVE_TODO = 'todos/REMOVE_TODO'; // todo 삭제
const REMOVE_TODO_SUCCESS = 'todos/REMOVE_TODO_SUCCESS'; // todo 제거 성공

/*
초기상태
 */
const initialState = {
  input: '',
  todoList: []
};

/*
액션 생성 함수 정의
외부 컨테이너에서 디스패치시 사용할 액션객체를 생성하는데 사용된다.
redux-actions 모듈의 createAction 를 사용하며
첫번째 인자는 액션타입, 두번째 인자는 상태 변경에 필요한 payload로
이를 통해 생성되는 액션객체의 property 키는 type, payload 로 고정되며
changeInput 를 예로 들면 이를 통해 생성되는 액션객체는 아래와 같다.
{
   type: todos/CHANGE_INPUT
   payload: input
}
참고로 리덕스 사가에서 api 호출 결과로 사용할 액션생성 함수는
api 호출 결과로 payload 를 지정해야 하는 경우도 있기 때문에
여기에서 정의하지 않고 비동기 api 호출을 위한 공통함수인
restCallSaga 에서 액션 자체를 별도로 정의하도록 한다.
 */
export const changeInput = createAction(CHANGE_INPUT, input => input);
export const toggle = createAction(TOGGLE_TODO, id => id);
export const getTodos = createAction(GET_TODOS);
export const createTodo = createAction(CREATE_TODO, text => ({
  text,
  done: false
}));
export const removeTodo = createAction(REMOVE_TODO, id => id);
export const init = createAction(INIT);

//처리할 비동기 작업을 정의한다.
/*
사가는 제너레이터 함수 문법을 기반으로 비동기 작업을 관리해준다.
액션객체를 인자로 받아서 api를 호출할 사가를
공통함수 createApiCallSaga로 생성한다.
 */
const getTodosSaga = restCallSaga(GET_TODOS, todoApi.getTodos);
const createTodosSaga = restCallSaga(CREATE_TODO, todoApi.createTodo);
const removeTodosSaga = restCallSaga(REMOVE_TODO, todoApi.removeTodo);

//사가로 액션을 모니터링 한다.
/*
taskLatest는 기존에 동일한 작업이 진행중이라면 취소하고
가장 마지막으로 실행된 작업에만 특정 작업을 연결한다.
첫번째 인자는 모니터링 할 액션, 두번째 인자는 수행할 비동기작업(사가)을 정의한다.
두번째 인자로 지정된 사가를 실행할때에는 액션객체가 인자로 추가된다.
 */
export function* todosSaga(){

  yield takeLatest(GET_TODOS, getTodosSaga);
  yield takeLatest(CREATE_TODO, createTodosSaga);
  yield takeLatest(REMOVE_TODO, removeTodosSaga);
}

/*
리듀서 함수
리듀서 함수에서는 기존 초기데이터에는 영향을 주어선 안되고
새로운 상태를 만들어서 리턴해야 하기 때문에 ES6 전개연산자를 사용되기도 한다.
 */
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