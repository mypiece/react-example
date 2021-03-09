import React from 'react';
import Loader from 'components/Loader';
import styled from 'styled-components';

const TodoSpan = styled.span`
    text-decoration: ${props => props.done ? 'line-through' : 'none'};
  `;

const TodoInput = React.memo(({input, onChangeInput, onInsertTodo, inputLoading}) => {
  const insert = () => {
    onInsertTodo(input);
    onChangeInput('');
  }

  return (
      inputLoading ?
          <Loader />
          :
          <>
            <input value={input} onChange={(e) => onChangeInput(e.target.value)} />
            <button type="botton" onClick={insert}>등록</button>
          </>
  );
});

const TodoItem = React.memo( ({ todo, onToggleTodo, onRemoveTodo }) => {

  return (
      <div>
        <input
            type="checkbox"
            onClick={() => onToggleTodo(todo.id)}
            checked={todo.done}
            readOnly={true}
        />
        <TodoSpan done={todo.done}>
          {todo.text}
        </TodoSpan>
        <button onClick={() => onRemoveTodo(todo.id)}>삭제</button>
      </div>
  );
});

const TodoList = React.memo(({todos, onToggleTodo, onRemoveTodo, listLoading}) => {

  return (
      listLoading ?
        <Loader />
        :
        <>
          {todos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggleTodo={onToggleTodo}
                onRemoveTodo={onRemoveTodo}
            />
          ))}
        </>
  );
});

const Todos = ({
  input, // 인풋에 입력되는 텍스트
  todos, // 할 일 목록이 들어있는 객체
  inputLoading,
  listLoading,
  onChangeInput,
  onInsertTodo,
  onToggleTodo,
  onRemoveTodo,
}) => {

  return (
      <div>
        <TodoInput
            input={input}
            onChangeInput={onChangeInput}
            onInsertTodo={onInsertTodo}
            inputLoading={inputLoading}
        />
        <TodoList
            todos={todos}
            onToggleTodo={onToggleTodo}
            onRemoveTodo={onRemoveTodo}
            listLoading={listLoading}
        />
      </div>
  );
};

export default React.memo(Todos);