import { useRef, useState } from 'react'
import { addTask } from '../../api/tasks-api'
import './addTaskForm.css'
import React from 'react'

interface AddProps {
  onUpdateError: (text: string) => void,
  onTaskFlag: () => void
}

const AddTaskForm: React.FC<AddProps> = (props) => {
  const [value, setValue] = useState({ isDone: false, title: '' })
  const formRef = useRef<HTMLFormElement>(null);

  const handlerCreate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      await addTask(value);
      props.onTaskFlag();
      formRef.current?.reset();
      setValue({ isDone: true, title: '' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        props.onUpdateError(error.message)
      }
    }
  }

  return (
    <form className='task-add' ref={formRef} onSubmit={
      handlerCreate
    }>
      <input type="text"
        className='task-add_input'
        placeholder='Введите задачу...'
        onChange={
          (e) => setValue({ isDone: false, title: e.target.value.trim() })
        } />
      <button type='submit' className='task-add_button'>Добавить</button>
    </form>
  )
}

export default AddTaskForm
