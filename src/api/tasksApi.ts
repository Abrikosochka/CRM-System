import type {
  TaskStatus,
  TasksResponse,
  Todo,
  TodoRequest,
  TodoStatus,
  TodoUpdateRequest,
} from '../types/todo.types';
import { instance } from './axios';

const statuses: Record<Exclude<TodoStatus, 'all'>, TaskStatus> = {
  inWork: 'inProgress',
  completed: 'done',
};

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  const response = await instance({
    method: 'POST',
    url: '/tasks/',
    data: {
      ...todo,
      executorId: 1,
      status: 'inProgress',
    },
  });
  return response.data;
};

export const getTodos = async (
  todoStatus: TodoStatus = 'all',
): Promise<TasksResponse> => {
  const response = await instance({
    method: 'GET',
    url: '/tasks/',
    params: {
      limit: 20,
      offset: 0,
      orderBy: 'createdAt',
      orderDir: 'desc',
      ...(todoStatus === 'all' ? {} : { statuses: statuses[todoStatus] }),
    },
  });
  return response.data;
};

export const deleteTodo = async (todoId: Todo['id']): Promise<void> => {
  await instance({
    method: 'DELETE',
    url: `/tasks/${todoId}`,
  });
};

export const editTodo = async (
  todoId: Todo['id'],
  todoData: TodoUpdateRequest,
): Promise<Todo> => {
  const response = await instance({
    method: 'PUT',
    url: `/tasks/${todoId}`,
    data: {
      ...todoData,
      executorId: 1,
    },
  });
  return response.data;
};
