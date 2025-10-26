import { useState } from "react"
import "./task.css"
import { deleteTodo, editTodo } from "../../api/tasks-api";
import type { Todo } from "../../types/todo.types";
import { validateTodo } from "../../helpers/validation";
import { Icon } from "../icon/Icon";

interface Props {
  onOpenModalError: (errorText: string) => void,
  todoId: Todo["id"],
  todoText: Todo["title"],
  todoStatus: Todo["isDone"],
  startLoadingTasks: () => void
}

const Task: React.FC<Props> = (props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>(props.todoText)

  const handleClickUpdateTodoStatus = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await editTodo(props.todoId, { isDone: !props.todoStatus, title: updateTitle });
      props.startLoadingTasks();
    } catch (e: unknown) {
      if (e instanceof Error) props.onOpenModalError(e.message)
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenUpdateTodo = (): void => {
    setUpdate(true)
  }

  const handleClickUpdateTodoTitle = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      setIsLoading(true);
      const title: string = validateTodo(updateTitle);
      await editTodo(props.todoId, { isDone: props.todoStatus, title: title });
      props.startLoadingTasks();
    } catch (e: unknown) {
      if (e instanceof Error) props.onOpenModalError(e.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseUpdateTodo = (): void => {
    setUpdate(false);
    setUpdateTitle(props.todoText);
  }


  const handleClickDeleteTodo = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await deleteTodo(props.todoId);
      props.startLoadingTasks();
    } catch (e: unknown) {
      if (e instanceof Error) props.onOpenModalError(e.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="task">
      {!isLoading ? <>
        <div className="task-header">
          <>
            {!update && <input type="checkbox" name="complete" className="task_check"
              checked={props.todoStatus} onChange={handleClickUpdateTodoStatus}
            />}
            {update ?
              <input className="task_change-input" type='text' value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}>
              </input>
              :
              <p className={`${props.todoStatus ? 'task-header-is-done' : ''}`}>{props.todoText}</p>
            }
          </>
        </div>
        <div className="task-buttons">
          {!update ?
            <button className="task-buttons_button edit"
              onClick={handleOpenUpdateTodo}
            ><Icon icon="Edit" ></Icon></button> :
            <>
              <button type="submit" className="task-buttons_button edit"
                onClick={handleClickUpdateTodoTitle}
              ><Icon icon="Save" ></Icon></button>
              <button className="task-buttons_button edit"
                onClick={handleCloseUpdateTodo}
              ><Icon icon="Close" ></Icon></button>
            </>
          }

          <button type="submit" className="task-buttons_button delete"
            onClick={handleClickDeleteTodo}
          ><Icon icon="Delete" ></Icon></button>
        </div>
      </> : 'Loading...'}
    </form>
  )
}

export default Task
