import './addTaskForm.css'

const AddTaskForm = () => {
  return (
    <form className='task-add'>
      <input type="text" className='task-add_input' placeholder='Введите задачу...' />
      <button type='submit' className='task-add_button'>Добавить</button>
    </form>
  )
}

export default AddTaskForm
