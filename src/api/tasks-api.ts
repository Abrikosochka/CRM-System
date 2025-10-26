import type { TodoStatus, TodoInfo, Todo, TodoRequest } from "../types/todo.types";
import type { MetaResponse } from "../types/todo.api";

export const addTodo = async (todo: TodoRequest): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}todos`,
    {
      method: 'POST',
      body: JSON.stringify(todo),
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка HTTP: " + response.status)
  }
}

export const getTodos = async (todoInfo: TodoStatus = 'all'): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}todos?filter=${todoInfo}`,
    {
      method: 'GET'
    }
  );
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error("Ошибка HTTP: " + response.status);
  }
}

export const deleteTodo = async (todoId: Todo["id"]): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}todos/${todoId}`,
    {
      method: 'DELETE'
    }
  )
  if (!response.ok) {
    throw new Error("Ошибка HTTP: " + response.status)
  }
}

export const editTodo = async (id: Todo["id"], todoData: TodoRequest): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}todos/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(todoData),
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка HTTP: " + response.status)
  }
}
