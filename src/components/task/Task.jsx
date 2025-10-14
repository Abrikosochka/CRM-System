import "./task.css"

const Task = (props) => {
  return (
    <div className="task">
      <div className="task-header">
        <input type="checkbox" name="complete" className="task_check"
          checked={props.status}
        />
        <p style={{ textDecoration: props.status ? 'line-through' : 'none' }}>{props.text}</p>
      </div>
      <div className="task-buttons">
        <button className="task-buttons_button edit">Редактировать</button>
        <button className="task-buttons_button delete">Удалить</button>
      </div>
    </div>
  )
}

export default Task
