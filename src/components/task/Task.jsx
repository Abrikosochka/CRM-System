import { useState } from "react"
import "./task.css"

const Task = (props) => {

  const [check, setCheck] = useState(props.status);
  const [name, setName] = useState(props.text)
  const [update, setUpdate] = useState(false);
  const [updateName, setUpdateName] = useState(name)

  const handleClickDone = () => {
    setCheck(!check)
    props.onChangeTask(prev => prev.map(
      (value) => {
        if (value.id === props.id) {
          return { id: props.id, text: props.text, status: check };
        }
        return value;
      }
    ))
  }

  const handleClickSetUpdate = () => {
    setUpdate(prev => !prev)
  }

  const handleClickUpdate = () => {
    setUpdate(prev => !prev)
    setName(updateName);
  }

  const handleClickNotUpdate = () => {
    setUpdate(prev => !prev)
    setUpdateName(name);
  }


  const handleClickDelete = () => {
    props.onChangeTask(prev => prev.filter(
      (value) => {
        if (value.id !== props.id) {
          return value;
        }
      }
    ))
  }

  return (
    <div className="task">
      <div className="task-header">
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
