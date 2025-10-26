export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number
  completed: number
  inWork: number
}

export type TodoStatus = 'all' | 'completed' | 'inWork'
