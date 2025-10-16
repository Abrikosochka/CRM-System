import "./taskSort.css"

const TaskSort = (props) => {
  return (
    <div className="task-sort">
      <button className={`task-sort_button ${props.filter !== 'all' ? 'task-sort_button-unactive' : ''}`}
        onClick={() => props.onSetFilter('all')}>
        Все {`${props.count.all}`}</button>
      <button className={`task-sort_button ${props.filter !== 'inWork' ? 'task-sort_button-unactive' : ''}`}
        onClick={() => props.onSetFilter('inWork')}>
        В работе {`${props.count.inWork}`}</button>
      <button className={`task-sort_button ${props.filter !== 'completed' ? 'task-sort_button-unactive' : ''}`}
        onClick={() => props.onSetFilter('completed')}>
        Завершенные {`${props.count.completed}`}</button>
    </div>
  )
}

export default TaskSort
