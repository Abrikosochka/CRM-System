import "./taskSort.css"

const TaskSort = () => {
  return (
    <div className="task-sort">
      <button className="task-sort_button">Все</button>
      <button className="task-sort_button">В работе</button>
      <button className="task-sort_button">Закончены</button>
    </div>
  )
}

export default TaskSort
