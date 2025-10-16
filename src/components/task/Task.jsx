import { useState } from "react"
import "./task.css"
import { deleteTask, editTask } from "../../api/tasks-api";

const Task = (props) => {

  const [check, setCheck] = useState(props.status);
  const [name, setName] = useState(props.text)
  const [update, setUpdate] = useState(false);
  const [updateName, setUpdateName] = useState(name)
  const [isLoading, setIsLoading] = useState(false);

  const handleClickDone = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await editTask(props.id, { isDone: !check, title: updateName });
      if (response.ok) {
        setCheck(!check)
        props.onChangeTask(prev => prev.map(
          (value) => {
            if (value.id === props.id) {
              return { ...value, isDone: !check };
            }
            return value;
          }
        ))
        props.onSetCount(
          prev => (!check ?
            { ...prev, inWork: prev.inWork - 1, completed: prev.completed + 1 }
            :
            { ...prev, completed: prev.completed - 1, inWork: prev.inWork + 1 }
          )
        )
      }
    } catch (e) {
      props.onUpdateError({ open: true, text: e.message })
    } finally {
      setIsLoading(false);
    }
  }

  const handleClickSetUpdate = () => {
    setUpdate(prev => !prev)
  }

  const handleClickUpdate = async () => {
    try {
      const response = await editTask(props.id, { isDone: check, title: updateName.trim() });
      setUpdate(prev => !prev)
      if (response.ok) {
        setName(updateName.trim());
        setUpdateName(updateName.trim())
      }
    }
    catch (e) {
      props.onUpdateError({ open: true, text: e.message });
    }
  }

  const handleClickNotUpdate = () => {
    setUpdate(prev => !prev);
    setUpdateName(name);
  }


  const handleClickDelete = async () => {
    const response = await deleteTask(props.id);
    if (response.ok) {
      props.onChangeTask(prev => prev.filter(
        (value) => {
          if (value.id !== props.id) {
            return true;
          }
          else {
            return false
          }
        }
      ))
      props.onSetCount(
        prev => (!check ?
          { ...prev, inWork: prev.inWork - 1, all: prev.all - 1 }
          :
          { ...prev, completed: prev.completed - 1, all: prev.all - 1 }
        )
      )
    }
  }

  return (
    <div className="task">
      <div className="task-header">
        {
          !isLoading ?
            <>
              {!update && <input type="checkbox" name="complete" className="task_check"
                checked={check} onChange={handleClickDone}
              />}
              {update ?
                <input className="task_change-input" type='text' value={updateName} onChange={
                  (e) => setUpdateName(e.target.value)}>
                </input>
                :
                <p style={{ textDecoration: check ? 'line-through' : 'none' }}>{name}</p>
              }
            </> :
            'Loading ...'
        }
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
