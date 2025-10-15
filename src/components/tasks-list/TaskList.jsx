import "./taskList.css"
import Task from "../task/Task"
import { useEffect, useState } from "react"

const TaskList = ({ filter, loading, tasks, onSetTasks, onUpdateError, onSetCount }) => {

  const [filterTasks, setFilteredTasks] = useState(null);

  useEffect(() => {
    setFilteredTasks(tasks ? tasks.filter(
      (value) => {
        if (filter === 'all') {
          return true
        } else if (filter === 'inWork' && value.isDone === false) {
          return true
        } else if (filter === 'completed' && value.isDone === true) {
          return true
        } else {
          return false
        }
      }
    ) : null)
  }, [tasks, filter])

  return (
    <div className="tasks-list">
      {loading ?
        'Loading ...'
        :
        <>
          {filterTasks !== null && filterTasks.length === 0 && (
            filter === "all" ? 'Создайте новую задачу)' :
              filter === "inWork" ? 'Так держать, все задачи выполнены!)' :
                'У вас нет завершенных задач(')
          }
          {filterTasks !== null && filterTasks.map((value) =>
            <Task filter={filter} onSetCount={onSetCount} onUpdateError={onUpdateError} key={value.id} id={value.id} text={value.title} status={value.isDone} onChangeTask={onSetTasks} />
          )}
        </>
      }
    </div>
  )
}

export default TaskList
