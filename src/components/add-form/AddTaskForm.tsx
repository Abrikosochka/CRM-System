import { useState } from 'react'
import { addTodo } from '../../api/tasks-api'
import type { TodoRequest } from '../../types/todo.types'
import { validateTodo } from '../../helpers/validation'
import './addTaskForm.css'
import React from 'react'

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

  const handleCreateTodo = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
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
    <form className='task-add' onSubmit={handleCreateTodo}>
      <input type="text"
        className='task-add_input'
        placeholder='Введите задачу...'
        value={inputText.title}
        onChange={handleChangeInput} />
      <button type='submit' className='task-add_button'>Добавить</button>
    </form>
  )
}

export default AddTaskForm
