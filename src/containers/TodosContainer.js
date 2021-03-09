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

  // 리덕스 데이터 구독
  const {input, todoList} = useSelector(state => state.todos);
  const inputLoading = useSelector(state => state.loading['todos/CREATE_TODO']);
  const listLoading = useSelector(state => state.loading['todos/GET_TODOS']);

  // 리덕스 디스패치 함수 생성
  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsertTodo = useCallback(text => dispatch(createTodo(text)), [dispatch]);
  const onToggleTodo = useCallback(id => dispatch(toggle(id)), [dispatch]);
  const onRemoveTodo = useCallback(id => dispatch(removeTodo(id)), [dispatch]);

  // 초기 데이터 로드
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

export default TodosContainer;