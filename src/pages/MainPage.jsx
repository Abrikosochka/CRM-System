import { useState } from 'react'
import AddTaskForm from '../components/add-form/AddTaskForm'
import Header from '../components/header/Header'
import TaskList from '../components/tasks-list/TaskList'
import TaskSort from '../components/tasks-sort/TaskSort'
import './mainPage.css'
import Error from '../components/error/Error'

const MainPage = () => {

  const [errorAdd, setAddError] = useState({ open: true, text: "JFJDKFjdfjk" })

  return (
    <div className='container'>
      {errorAdd.open && <Error text={errorAdd.text} onUpdateError={setAddError}></Error>}
      <Header></Header>
      <main>
        <AddTaskForm onUpdateError={setAddError}></AddTaskForm>
        <TaskSort></TaskSort>
        <TaskList></TaskList>
      </main>
    </div>
  )
}

export default MainPage
