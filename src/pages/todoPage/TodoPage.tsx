import React, { useState, useEffect, useCallback } from 'react'
import AddTaskForm from '../../components/addForm/AddTaskForm'
import TaskList from '../../components/tasksList/TaskList'
import TaskSort from '../../components/tasksSort/TaskSort'
import './todoPage.css'
import { getTodos } from '../../api/tasksApi.ts'
import type { Todo, TodoInfo, TodoStatus } from '../../types/todo.types'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useAppSelector } from '../../store/reduxHooks'
import { useError } from '../../hooks/errorContext'
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner'

const INITIAL_TODO_INFO = {
  all: 0,
  completed: 0,
  inWork: 0
};

const TodoPage: React.FC = () => {

  const isLoading: boolean | undefined = useAppSelector(state => state.auth.isLoading)
  const { showError } = useError();

  const [todos, setTodos] = useState<Array<Todo> | null>(null)
  const [todosCount, setTodosCount] = useState<TodoInfo | typeof INITIAL_TODO_INFO>(INITIAL_TODO_INFO)
  const [filter, setFilter] = useState<TodoStatus>('all')
  const [loading, setLoading] = useState<boolean>(true)
  const [reloadTimeout, setReloadTimeout] = useState<number>()

  const fetchTodos = useCallback(async (): Promise<void> => {
    try {
      const response = await getTodos(filter);
      setTodos(response.data);
      setTodosCount(response.info ? response.info : INITIAL_TODO_INFO);
    } catch (error) {
      showError(`Ошибка загрузки задач: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [filter, showError]);

  const debounceReloadTasks = useCallback(() => {
    if (reloadTimeout) {
      clearTimeout(reloadTimeout)
    }

    const timeout = setTimeout(() => {
      fetchTodos();
    }, 500);

    setReloadTimeout(timeout);
  }, [fetchTodos, reloadTimeout])

  const handleFilterChange = useCallback((newFilter: TodoStatus) => {
    setFilter(newFilter);
    setLoading(true);
  }, []);

  useEffect((): void => {
    setLoading(true);
    fetchTodos();
  }, [fetchTodos])

  useEffect((): () => void => {
    const interval: number = setInterval(async (): Promise<void> => {
      fetchTodos();
    }, 5000);

    return (): void => clearInterval(interval);
  }, [filter, fetchTodos]);

  return (
    <>
      {isLoading ? <LoadingSpinner /> :
        <Layout className='container'>
          <Content className='content'>
            <AddTaskForm
              onOpenModalError={showError}
              startLoadingTasks={fetchTodos}
            ></AddTaskForm>
            <TaskSort
              filter={filter}
              onSetFilter={handleFilterChange}
              todosCount={todosCount}
            ></TaskSort>
            <TaskList
              loading={loading}
              filter={filter}
              onOpenModalError={showError}
              startLoadingTasks={debounceReloadTasks}
              todos={todos}
            ></TaskList>
          </Content>
        </Layout>
      }
    </>
  )
}

export default TodoPage
