import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeInput,
  toggle,
  createTodo,
  getTodos,
  removeTodo,
  init
} from "lib/redux/todos";
import Todos from 'components/Todos';

const TodosContainer = () => {

  //리덕스 데이터 구독
  const {input, todoList} = useSelector(state => state.todos);
  const inputLoading = useSelector(state => state.loading['todos/CREATE_TODO']);
  const listLoading = useSelector(state => state.loading['todos/GET_TODOS']);

  //리덕스 디스패치 함수 정의
  /*
  다만 디스패치 함수는 매번 다른 인스턴스로 생성될 수 있다.
  이 경우 해당 함수를 props 로 전달할 경우 매번 새로운 값이 전달되는 것이고
  이를 전달받는 컴포넌트는 React.memo 를 사용하더라도 리렌더링이 발생할 수 있다.
  이에 useCallback 으로 함수 생성로직을 감싸서 동일한 인스턴스를 재사용하도록 해야 한다.

  반면 인스턴스를 재활용하지 않아야 하는 경우도 있을 수 있는데
  useCallback 함수의 두번째 인자에 배열로 지정한 값이 변경되었을 경우에는
  인스턴스를 재생성하게 할 수 있다.
  참고로 []로 지정될 경우 초기렌더링 이후 항상 동일한 인스턴스를 재활용하게 된다.

  여기에서는 두번째 인자로 dispatch 를 지정했는데
  dispatch 의 경우 리덕스 스토어가 재연동 될 경우에 변경된다.
   */
  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsertTodo = useCallback(text => dispatch(createTodo(text)), [dispatch]);
  const onToggleTodo = useCallback(id => dispatch(toggle(id)), [dispatch]);
  const onRemoveTodo = useCallback(id => dispatch(removeTodo(id)), [dispatch]);

  //초기 데이터 로드
  /*
  useEffect 함수를 통해 컴포넌트가 업데이트 될때마다 특정 작업을 수행할 수 있다.
  여기에서는 컴포넌트 초기렌더링을 위한 초기상태값을 생성한다.
  첫번째 인자의 함수 내부 로직으로 렌더링시 수행할 작업을 정의할 수 있고
  해당 함수의 리턴값으로 업데이트 or 언마운트시 수행할 작업을 정의할 수 있다.

  참고로 첫번째 인자의 return 은 선택적으로 정의할 수 있는데
  초기상태값이 특정 조건에 따라 다르게 할당되어야 한다면
  return 에 반드시 상태값을 초기화하는 디스패치 로직이 추가되어야 한다.
  그렇지 않으면 컴포넌트 렌더링시 아주 짧은 시간동안 이전 상태값이 나타나는 깜빡임 현상이 발생한다.
   */
  useEffect(() => {
    dispatch(getTodos());
    return () => {
      dispatch(init());
    }
  }
  , [dispatch]);

  return (
      <Todos
        input={input}
        todos={todoList}
        inputLoading={inputLoading}
        listLoading={listLoading}
        onChangeInput={onChangeInput}
        onInsertTodo={onInsertTodo}
        onToggleTodo={onToggleTodo}
        onRemoveTodo={onRemoveTodo}
      />
  )
};

// export default React.memo(TodosContainer);
export default TodosContainer;