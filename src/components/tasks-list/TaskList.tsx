import "./taskList.css"
import Task from "../task/Task"
import type { TodoStatus, Todo } from "../../types/todo.types";

interface Props {
  loading: boolean,
  filter: TodoStatus,
  todos: Array<Todo> | null,
  onOpenModalError: (textError: string) => void,
  startLoadingTasks: () => void
}

const TaskList: React.FC<Props> = (props) => {

  return (
    <div className="tasks-list">
      {props.loading ?
        'Loading ...'
        :
        <>
          {props.todos !== null && props.todos.length === 0 && (
            props.filter === "all" ? 'Создайте новую задачу!' :
              props.filter === "inWork" ? 'Так держать, все задачи выполнены!)' :
                'Нет завершенных задач(')
          }
          {props.todos !== null && props.todos.map((todo) =>
            <Task
              onOpenModalError={props.onOpenModalError}
              key={todo.id}
              todoId={todo.id}
              todoText={todo.title}
              todoStatus={todo.isDone}
              startLoadingTasks={props.startLoadingTasks} />
          )}
        </>
      }
    </div>
  )
}

export default TaskList
