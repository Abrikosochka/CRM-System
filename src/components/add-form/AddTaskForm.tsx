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
      validateTodo(inputText.title!);
      await addTodo(inputText);
      setInputText(INITIAL_TODO_INPUT)
    } catch (error: unknown) {
      if (error instanceof Error) props.onOpenModalError(error.message)
    } finally {
      props.startLoadingTasks();
    }
  }

  return (
    <form className='task-add' onSubmit={handleCreateTodo}>
      <input type="text"
        className='task-add_input'
        placeholder='Введите задачу...'
        value={inputText.title}
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>): void => setInputText({ isDone: false, title: e.target.value.trim() })
        } />
      <button type='submit' className='task-add_button'>Добавить</button>
    </form>
  )
}

export default AddTaskForm
