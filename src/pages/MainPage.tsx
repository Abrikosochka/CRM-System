import { useState, useEffect } from 'react'
import AddTaskForm from '../components/add-form/AddTaskForm'
import Header from '../components/header/Header'
import TaskList from '../components/tasks-list/TaskList'
import TaskSort from '../components/tasks-sort/TaskSort'
import './mainPage.css'
import Error from '../components/error/Error'
import { getTasks } from '../api/tasks-api'

const MainPage = () => {

  const [errorAdd, setAddError] = useState<{ open: boolean, text: string }>({ open: false, text: "JFJDKFjdfjk" })
  const [tasks, setTasks] = useState(null)
  const [count, setCount] = useState({ all: 0, completed: 0, inWork: 0 })
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [getTasksFlag, setGetTasksFlag] = useState(false)

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async () => {
      try {
        const response = await getTasks(filter);
        setTasks(response.data);
        setCount(response.info);
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      } finally {
        setLoading(false)
        setGetTasksFlag(false)
      }
    };
    fetchTasks();
  }, [filter, getTasksFlag]);

  return (
    <div className='container'>
      {errorAdd.open && <Error text={errorAdd.text} onUpdateError={() => setAddError(prev => ({ ...prev, open: false }))}></Error>}
      <Header></Header>
      <main>
        <AddTaskForm
          onUpdateError={(text: string) => setAddError({ open: true, text: text })}
          onTaskFlag={() => setGetTasksFlag(true)}
        ></AddTaskForm>
        <TaskSort filter={filter} onSetFilter={(value: string) => setFilter(value)} count={count}></TaskSort>
        <TaskList
          loading={loading}
          filter={filter}
          onUpdateError={() => setAddError(prev => ({ ...prev, open: true }))}
          tasks={tasks}
          getFlagTasks={() => setGetTasksFlag(true)}
        ></TaskList>
      </main>
    </div>
  )
}

export default MainPage
