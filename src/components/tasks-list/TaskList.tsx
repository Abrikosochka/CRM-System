import "./taskList.css"
import Task from "../task/Task"
import { useEffect, useState } from "react"

type task = Array<{
  created: string,
  id: bigint,
  isDone: boolean,
  title: string
}> | null

interface TasksProps {
  loading: boolean,
  filter: string,
  onUpdateError: () => void,
  tasks: task,
  getFlagTasks: () => void,
}

const TaskList: React.FC<TasksProps> = (props) => {


  const [filterTasks, setFilteredTasks] = useState<task | null>(null);

  useEffect(() => {
    setFilteredTasks(props.tasks ? props.tasks.filter(
      (value) => {
        if (props.filter === 'all') {
          return true
        } else if (props.filter === 'inWork' && value.isDone === false) {
          return true
        } else if (props.filter === 'completed' && value.isDone === true) {
          return true
        } else {
          return false
        }
      }
    ) : null)
  }, [props.tasks, props.filter])

  return (
    <div className="tasks-list">
      {props.loading ?
        'Loading ...'
        :
        <>
          {filterTasks !== null && filterTasks.length === 0 && (
            props.filter === "all" ? 'Создайте новую задачу!' :
              props.filter === "inWork" ? 'Так держать, все задачи выполнены!)' :
                'У вас нет завершенных задач(')
          }
          {filterTasks !== null && filterTasks.map((value) =>
            <Task
              onUpdateError={props.onUpdateError}
              key={value.id}
              id={value.id}
              text={value.title}
              status={value.isDone}
              onChangeFlagGetTasks={props.getFlagTasks} />
          )}
        </>
      }
    </div>
  )
}

export default TaskList
