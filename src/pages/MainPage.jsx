import { useState, useEffect } from 'react'
import AddTaskForm from '../components/add-form/AddTaskForm'
import Header from '../components/header/Header'
import TaskList from '../components/tasks-list/TaskList'
import TaskSort from '../components/tasks-sort/TaskSort'
import './mainPage.css'
import Error from '../components/error/Error'
import { getTasks } from '../api/tasks-api'

const MainPage = () => {

  const [errorAdd, setAddError] = useState({ open: false, text: "JFJDKFjdfjk" })
  const [tasks, setTasks] = useState(null)
  const [count, setCount] = useState({ all: 0, completed: 0, inWork: 0 })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    console.log('Filter changed:', filter);
    const fetchTasks = async () => {
      try {
        const response = await getTasks(filter);
        setTasks(response.data);
        setCount(response.info);
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      }
    };
    fetchTasks();
  }, [filter]);

  return (
    <div className='container'>
      {errorAdd.open && <Error text={errorAdd.text} onUpdateError={setAddError}></Error>}
      <Header></Header>
      <main>
        <AddTaskForm onSetCount={setCount} onUpdateError={setAddError} onSetTasks={setTasks}></AddTaskForm>
        {tasks && <TaskSort filter={filter} onSetFilter={setFilter} count={count}></TaskSort>}
        <TaskList filter={filter} onSetCount={setCount} onUpdateError={setAddError} tasks={tasks} onSetTasks={setTasks}></TaskList>
      </main>
    </div>
  )
}

export default MainPage
