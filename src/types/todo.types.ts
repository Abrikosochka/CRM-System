export type TaskStatus = 'inProgress' | 'done';

export interface TodoRequest {
  title: string;
}

export interface TodoUpdateRequest extends TodoRequest {
  status: TaskStatus;
}

export interface TaskUser {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  executor: TaskUser;
  creator: TaskUser;
  status: TaskStatus;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoInfo {
  all: number
  completed: number
  inWork: number
}

export type TodoStatus = 'all' | 'completed' | 'inWork'

export interface TaskStatusCounts {
  inProgress: number;
  done: number;
}

export interface TasksResponse {
  data: Todo[];
  total: number;
  meta: {
    limit: number;
    offset: number;
    statuses: TaskStatus[];
    orderBy: string;
    orderDir: string;
    statusCounts: TaskStatusCounts;
  };
}
