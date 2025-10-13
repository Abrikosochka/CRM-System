import AddTaskForm from '../components/add-form/AddTaskForm'
import Header from '../components/header/Header'
import TaskList from '../components/tasks-list/TaskList'
import TaskSort from '../components/tasks-sort/TaskSort'
import './mainPage.css'

const MainPage = () => {
  return (
    <>
      <Header></Header>
      <main>
        <AddTaskForm></AddTaskForm>
        <TaskSort></TaskSort>
        <TaskList></TaskList>
      </main>
    </>
  )
}

export default MainPage
