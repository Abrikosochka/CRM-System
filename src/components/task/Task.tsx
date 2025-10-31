import { useState } from "react"
import "./task.css"
import { deleteTodo, editTodo } from "../../api/tasks-api";
import type { Todo } from "../../types/todo.types";
import { validateTodo } from "../../helpers/validation";
import { Icon } from "../icon/Icon";

interface Props {
  onOpenModalError: (errorText: string) => void,
  todo: Todo,
  startLoadingTasks: () => void
}

const Task: React.FC<Props> = (props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>(props.todo.title)

  const handleClickUpdateTodoStatus = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await editTodo(props.todo.id, { isDone: !props.todo.isDone, title: inputTitle });
      props.startLoadingTasks();
    } catch (e: unknown) {
      if (e instanceof Error) props.onOpenModalError(e.message)
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenUpdateTodo = (): void => {
    setIsUpdating(true)
  }

  const handleClickUpdateTodoTitle = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      setIsLoading(true);
      const title = inputTitle.trim();
      validateTodo(title);
      await editTodo(props.todo.id, { isDone: props.todo.isDone, title: title });
      props.startLoadingTasks();
    } catch (e: unknown) {
      if (e instanceof Error) props.onOpenModalError(e.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseUpdateTodo = (): void => {
    setIsUpdating(false);
    setInputTitle(props.todo.title);
  }


  const handleClickDeleteTodo = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await deleteTodo(props.todo.id);
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
            {!isUpdating && <input type="checkbox" name="complete" className="task_check"
              checked={props.todo.isDone} onChange={handleClickUpdateTodoStatus}
            />}
            {isUpdating ?
              <input className="task_change-input" type='text' value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}>
              </input>
              :
              <p className={`${props.todo.isDone ? 'task-header-is-done' : ''}`}>{props.todo.title}</p>
            }
          </>
        </div>
        <div className="task-buttons">
          {!isUpdating ?
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
