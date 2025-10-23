import { useState } from "react"
import "./task.css"
import { deleteTask, editTask } from "../../api/tasks-api";

interface taskProps {
  onUpdateError: () => void,
  id: bigint,
  text: string,
  status: boolean,
  onChangeFlagGetTasks: () => void
}

const Task: React.FC<taskProps> = (props) => {

  const [update, setUpdate] = useState(false);
  const [updateName, setUpdateName] = useState(props.text)
  const [isLoading, setIsLoading] = useState(false);

  const handleClickDone = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await editTask(props.id, { isDone: !props.status, title: updateName });
      if (response.ok) {
        props.onChangeFlagGetTasks();
      }
    } catch (e: unknown) {
      if (e instanceof Error) props.onUpdateError()
    } finally {
      setIsLoading(false);
    }
  }

  const handleClickSetUpdate = () => {
    setUpdate(prev => !prev)
  }

  const handleClickUpdate = async () => {
    try {
      const response = await editTask(props.id, { isDone: props.status, title: updateName.trim() });
      if (response.ok) {
        props.onChangeFlagGetTasks();
      }
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        props.onUpdateError();
      }
    }
  }

  const handleClickNotUpdate = () => {
    setUpdate(prev => !prev);
    setUpdateName(props.text);
  }


  const handleClickDelete = async () => {
    try {

      const response = await deleteTask(props.id);
      if (response.ok) {
        props.onChangeFlagGetTasks();
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        props.onUpdateError();
      }
    }
  }

  return (
    <div className="task">
      <div className="task-header">
        <>
          {!update && <input type="checkbox" name="complete" className="task_check"
            checked={props.status} onChange={handleClickDone}
          />}
          {update ?
            <input className="task_change-input" type='text' value={updateName} onChange={
              (e) => setUpdateName(e.target.value)}>
            </input>
            :
            <p style={{ textDecoration: props.status ? 'line-through' : 'none' }}>{props.text}</p>
          }
        </>
      </div>
      <div className="task-buttons">
        {!update ?
          <button className="task-buttons_button edit"
            onClick={handleClickSetUpdate}
          >Редактировать</button> :
          <>
            <button className="task-buttons_button edit"
              onClick={handleClickUpdate}
            >Сохранить</button>
            <button className="task-buttons_button edit"
              onClick={handleClickNotUpdate}
            >Отмена</button>
          </>
        }

        <button className="task-buttons_button delete"
          onClick={handleClickDelete}
        >Удалить</button>
      </div>
    </div>
  )
}

export default Task
