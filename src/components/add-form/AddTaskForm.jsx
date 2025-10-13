import { useState } from 'react'
import { addTask } from '../../api/tasks-api'
import './addTaskForm.css'

const AddTaskForm = (props) => {
  const [value, setValue] = useState({ isDone: true, title: '' })

  const handlerCreate = async (e) => {
    e.preventDefault()
    try {
      await addTask(value)
      setValue({ isDone: true, title: '' });
    } catch (e) {
      props.onUpdateError({ open: true, text: e.message })
    }
  }

  return (
    <form className='task-add' onSubmit={
      handlerCreate
    }>
      <input type="text"
        className='task-add_input'
        placeholder='Введите задачу...'
        onChange={
          (e) => setValue({ isDone: true, title: e.target.value })
        } />
      <button type='submit' className='task-add_button'>Добавить</button>
    </form>
  )
}

export default AddTaskForm
