import "./task.css"

const Task = () => {
  return (
    <div>
      <input type="checkbox" name="complete" checked />
      Задача
      <button>Редактировать</button>
      <button>Удалить</button>
    </div>
  )
}

export default Task
