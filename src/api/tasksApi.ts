import type { TodoStatus, TodoInfo, Todo, TodoRequest } from '../types/todo.types';
import type { MetaResponse } from '../types/todo.api';
import { instance } from './axios';

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  const response = await instance({
    method: 'POST',
    url: '/todos',
    data: todo,
  });
  return response.data;
};

export const getTodos = async (
  todoStatus: TodoStatus = 'all',
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await instance({
    method: 'GET',
    url: '/todos',
    params: {
      filter: todoStatus,
    },
  });
  return response.data;
};

export const deleteTodo = async (todoId: Todo['id']): Promise<void> => {
  await instance({
    method: 'DELETE',
    url: `/todos/${todoId}`,
  });
};

export const editTodo = async (todoId: Todo['id'], todoData: TodoRequest): Promise<Todo> => {
  const response = await instance({
    method: 'PUT',
    url: `/todos/${todoId}`,
    data: todoData,
  });
  return response.data;
};
