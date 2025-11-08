import type { TodoStatus, TodoInfo, Todo, TodoRequest } from "../types/todo.types";
import type { MetaResponse } from "../types/todo.api";
import { instance } from "./axios";

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  try {
    const response = await instance({
      method: 'POST',
      url: `/todos`,
      data: JSON.stringify(todo)
    })
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при добавлении задачи")
  }
}

export const getTodos = async (todoInfo: TodoStatus = 'all'): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await instance({
      method: 'GET',
      url: `/todos`,
      params: {
        filter: todoInfo,
      }
    })
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при получении задач")
  }
}

export const deleteTodo = async (todoId: Todo["id"]): Promise<void> => {
  try {
    await instance({
      method: 'DELETE',
      url: `/todos/${todoId}`,
    })
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при удалении задачи")
  }
}

export const editTodo = async (id: Todo["id"], todoData: TodoRequest): Promise<Todo> => {
  try {
    const result = await instance({
      method: 'PUT',
      url: `/todos/${id}`,
      data: JSON.stringify(todoData)
    })
    return result.data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при редактировании задачи")
  }
}
