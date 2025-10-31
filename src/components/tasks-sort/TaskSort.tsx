import type { TodoInfo, TodoStatus } from "../../types/todo.types"
import "./taskSort.css"

interface Props {
  filter: TodoStatus,
  onSetFilter: (todoFilter: TodoStatus) => void,
  todosCount: TodoInfo
}

const TaskSort: React.FC<Props> = (props) => {
  return (
    <div className="task-sort">
      <button className={`task-sort_button ${props.filter === 'all' ? 'task-sort_button-active' : ''}`}
        onClick={() => props.onSetFilter('all')}>
        Все {`${props.todosCount.all}`}</button>
      <button className={`task-sort_button ${props.filter === 'inWork' ? 'task-sort_button-active' : ''}`}
        onClick={() => props.onSetFilter('inWork')}>
        В работе {`${props.todosCount.inWork}`}</button>
      <button className={`task-sort_button ${props.filter === 'completed' ? 'task-sort_button-active' : ''}`}
        onClick={() => props.onSetFilter('completed')}>
        Завершенные {`${props.todosCount.completed}`}</button>
    </div>
  )
}

export default TaskSort
