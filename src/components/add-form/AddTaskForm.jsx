import { useRef, useState } from 'react'
import { addTask } from '../../api/tasks-api'
import './addTaskForm.css'

const AddTaskForm = (props) => {
  const [value, setValue] = useState({ isDone: false, title: '' })
  const formRef = useRef();

  const handlerCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await addTask(value);
      console.log(response);
      if (response.ok) {
        formRef.current.reset();
        setValue({ isDone: true, title: '' })
        const data = await response.json();
        props.onSetTasks(prev => [...prev, data])
        props.onSetCount(prev => ({ ...prev, all: prev.all++, inWork: prev.inWork++ }))
      }
    } catch (e) {
      props.onUpdateError({ open: true, text: e.message })
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
          (e) => setValue({ isDone: false, title: e.target.value })
        } />
      <button type='submit' className='task-add_button'>Добавить</button>
    </form>
  )
}

export default AddTaskForm
