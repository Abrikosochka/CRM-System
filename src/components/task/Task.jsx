import "./task.css"

const Task = () => {
  return (
    <div className="task">
      <div className="task-header">
        <input type="checkbox" name="complete" className="task_check" />
        <p>Задача</p>
      </div>
      <div className="task-buttons">
        <button className="task-buttons_button edit">Редактировать</button>
        <button className="task-buttons_button delete">Удалить</button>
      </div>
    </div>
  )
}

export default Task
