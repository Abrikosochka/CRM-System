import type { TodoInfo, TodoStatus } from "../../types/todo.types"
import "./taskSort.css"
import { Button, Flex } from 'antd';
import React from "react";

interface Props {
  filter: TodoStatus,
  onSetFilter: (todoFilter: TodoStatus) => void,
  todosCount: TodoInfo
}

const TaskSort: React.FC<Props> = (props) => {
  return (
    <Flex className="task-sort">
      <Button
        type={`${props.filter === "all" ? "primary" : "default"}`}
        onClick={() => props.onSetFilter('all')}
      >
        Все {`${props.todosCount.all}`}
      </Button>
      <Button
        type={`${props.filter === "inWork" ? "primary" : "default"}`}
        onClick={() => props.onSetFilter('inWork')}
      >
        В работе {`${props.todosCount.inWork}`}
      </Button>
      <Button
        type={`${props.filter === "completed" ? "primary" : "default"}`}
        onClick={() => props.onSetFilter('completed')}
      >
        Завершенные {`${props.todosCount.completed}`}
      </Button>
    </Flex>
  )
}

export default TaskSort;
