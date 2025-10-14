import "./taskList.css"
import Task from "../task/Task"

const TaskList = ({ tasks, onSetTasks, onUpdateError }) => {

  return (
    <div className="tasks-list">
      {tasks ?
        <>
          {tasks.length === 0 && 'Создайте новую задачу)'}
          {tasks.map((value) =>
            <Task onUpdateError={onUpdateError} key={value.id} id={value.id} text={value.title} status={value.isDone} onChangeTask={onSetTasks} />
          )}
        </> :
        'Loading ...'}
    </div>
  )
}

export default TaskList
