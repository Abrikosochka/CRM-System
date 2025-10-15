import "./taskList.css"
import Task from "../task/Task"

const TaskList = ({ filter, tasks, onSetTasks, onUpdateError, onSetCount }) => {

  const filterTasks = tasks?.filter(
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
  )

  console.log(filterTasks)

  return (
    <div className="tasks-list">
      {filterTasks ?
        <>
          {filterTasks.length === 0 && (
            filter === "all" ? 'Создайте новую задачу)' :
              filter === "inWork" ? 'Так держать, все задачи выполнены!)' :
                'У вас нет завершенных задач(')
          }
          {filterTasks.map((value) =>
            <Task filter={filter} onSetCount={onSetCount} onUpdateError={onUpdateError} key={value.id} id={value.id} text={value.title} status={value.isDone} onChangeTask={onSetTasks} />
          )}
        </> :
        'Loading ...'}
    </div>
  )
}

export default TaskList
