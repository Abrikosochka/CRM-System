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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className='container'>
      {errorAdd.open && <Error text={errorAdd.text} onUpdateError={setAddError}></Error>}
      <Header></Header>
      <main>
        <AddTaskForm onUpdateError={setAddError} onSetTasks={setTasks}></AddTaskForm>
        <TaskSort tasks={tasks} onSetTasks={setTasks}></TaskSort>
        <TaskList onUpdateError={setAddError} tasks={tasks} onSetTasks={setTasks}></TaskList>
      </main>
    </div>
  )
}

export default MainPage
