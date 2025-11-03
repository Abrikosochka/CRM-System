import type { TodoStatus, TodoInfo, Todo, TodoRequest } from "../types/todo.types";
import type { MetaResponse } from "../types/todo.api";
import axios from "axios";

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}todos`,
      JSON.stringify(todo)
    )
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при добавлении задачи")
  }
}

export const getTodos = async (todoInfo: TodoStatus = 'all'): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}todos?filter=${todoInfo}`
    )
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при получении задач")
  }
}

export const deleteTodo = async (todoId: Todo["id"]): Promise<void> => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND}todos/${todoId}`
    )
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при удалении задачи")
  }
}

export const editTodo = async (id: Todo["id"], todoData: TodoRequest): Promise<void> => {
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND}todos/${id}`,
      JSON.stringify(todoData)
    )
    return result.data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при редактировании задачи")
  }
}
