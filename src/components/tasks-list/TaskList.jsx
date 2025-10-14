import "./taskList.css"
import Task from "../task/Task"
import { useEffect, useState } from "react"

const TaskList = () => {
  useEffect(() => {

  }, [])

  const [tasks, setTasks] = useState([
    { id: 0, text: 'Задача 1', status: true },
    { id: 1, text: 'Задача 2', status: true },
    { id: 2, text: 'Задача 3', status: true },
    { id: 3, text: 'Задача 4', status: true }
  ])
  return (
    <div className="tasks-list">
      {tasks.length === 0 && 'Создайте новую задачу)'}
      {tasks.map((value) =>
        <Task key={value.id} id={value.id} text={value.text} status={value.status} onChangeTask={setTasks} />
      )}
    </div>
  )
}

export default TaskList
