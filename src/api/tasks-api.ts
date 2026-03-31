import type { TodoStatus, TodoInfo, Todo, TodoRequest } from "../types/todo.types";
import type { MetaResponse } from "../types/todo.api";
import { instance } from "./axios";
import { apiRequest } from "./apiHelpers";

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  return apiRequest(
    () => instance({ method: 'POST', url: `/todos`, data: todo }).then(res => res.data),
    "Ошибка при добавлении задачи"
  );
}

export const getTodos = async (todoInfo: TodoStatus = 'all'): Promise<MetaResponse<Todo, TodoInfo>> => {
  return apiRequest(
    () => instance({ method: 'GET', url: `/todos`, params: { filter: todoInfo } }).then(res => res.data),
    "Ошибка при получении задач"
  );
}

export const deleteTodo = async (todoId: Todo["id"]): Promise<void> => {
  return apiRequest(
    () => instance({ method: 'DELETE', url: `/todos/${todoId}` }).then(() => undefined),
    "Ошибка при удалении задачи"
  );
}

export const editTodo = async (id: Todo["id"], todoData: TodoRequest): Promise<Todo> => {
  return apiRequest(
    () => instance({ method: 'PUT', url: `/todos/${id}`, data: todoData }).then(res => res.data),
    "Ошибка при редактировании задачи"
  );
}
