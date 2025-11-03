import React, { useState, useEffect, useCallback } from 'react'
import AddTaskForm from '../components/add-form/AddTaskForm'
import TaskList from '../components/tasks-list/TaskList'
import TaskSort from '../components/tasks-sort/TaskSort'
import './todoPage.css'
import { getTodos } from '../api/tasks-api'
import type { Todo, TodoInfo, TodoStatus } from '../types/todo.types'
import type { ErrorMessage } from '../types/error.types'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Modal } from 'antd'

const INITIAL_TODO_INFO = {
  all: 0,
  completed: 0,
  inWork: 0
};

const TodosPage: React.FC = () => {

  const [modalText, setModalText] = useState<ErrorMessage>({ message: '' });
  const [todos, setTodos] = useState<Array<Todo> | null>(null)
  const [todosCount, setTodosCount] = useState<TodoInfo | typeof INITIAL_TODO_INFO>(INITIAL_TODO_INFO)
  const [filter, setFilter] = useState<TodoStatus>('all')
  const [loading, setLoading] = useState<boolean>(true)

  const openModal = (textError: string): void => {
    Modal.error({
      title: 'Ошибка',
      content: textError,
    });
  };

  const fetchTodos = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getTodos(filter);
      setTodos(response.data);
      setTodosCount(response.info ? response.info : INITIAL_TODO_INFO);
    } catch (error) {
      setModalText({ message: `Ошибка загрузки задач: ${error}` });
    } finally {
      setLoading(false)
    }
  }, [filter]);

  useEffect((): void => {
    fetchTodos();
  }, [fetchTodos])

  useEffect((): void => {
    if (modalText.message) {
      openModal(modalText.message);
    }
  }, [modalText])

  return (
    <Layout className='container'>
      <Header className='header'>
        <h2>
          ToDo
        </h2>
      </Header>
      <Content className='content'>
        <AddTaskForm
          onOpenModalError={(textError: string): void => setModalText({ message: textError })}
          startLoadingTasks={fetchTodos}
        ></AddTaskForm>
        <TaskSort
          filter={filter}
          onSetFilter={(todoFilter: TodoStatus): void => setFilter(todoFilter)}
          todosCount={todosCount}
        ></TaskSort>
        <TaskList
          loading={loading}
          filter={filter}
          onOpenModalError={(textError: string): void => setModalText({ message: textError })}
          startLoadingTasks={fetchTodos}
          todos={todos}
        ></TaskList>
      </Content>
    </Layout>
  )
}

export default TodosPage
