import { useState } from 'react'
import { addTodo } from '../../api/tasks-api'
import type { TodoRequest } from '../../types/todo.types'
import { validateTodo } from '../../helpers/validation'
import './addTaskForm.css'
import React from 'react'
import { Button, Form, Input } from 'antd';

const INITIAL_TODO_INPUT = {
  isDone: false,
  title: ''
};

interface Props {
  onOpenModalError: (textError: string) => void,
  startLoadingTasks: () => void
}

const AddTaskForm: React.FC<Props> = (props) => {
  const [inputText, setInputText] = useState<TodoRequest>(INITIAL_TODO_INPUT)

  const handleCreateTodo = async (): Promise<void> => {
    try {
      const title = inputText.title?.trim();
      validateTodo(title);
      await addTodo({ ...inputText, title: title });
      props.startLoadingTasks();
      setInputText(INITIAL_TODO_INPUT)
    } catch (error: unknown) {
      if (error instanceof Error) props.onOpenModalError(error.message)
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText({ isDone: false, title: e.target.value });
  }

  return (
    <Form className='task-add' onFinish={handleCreateTodo}>
      <Form.Item label={null}>
        <Input
          name="title"
          placeholder='Введите название задачи...'
          value={inputText.title}
          onChange={handleChangeInput}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddTaskForm
