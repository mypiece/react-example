import axios from 'axios';
import qs from 'qs';

const client = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000
});

export const getTodos = () => {
  const queryString = qs.stringify({
    '_sort': 'id',
    '_order': 'ASC'
  });
  return client.get(`/todos?${queryString}`);
}

export const getTodo = id =>
    client.get(`/todos/${id}`);

export const createTodo = todo =>
    client.post('/todos', todo);

export const removeTodo = id =>
    client.delete(`/todos/${id}`);