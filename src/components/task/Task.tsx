import { useState } from "react"
import "./task.css"
import { deleteTodo, editTodo } from "../../api/tasks-api";
import type { Todo } from "../../types/todo.types";
import { validateTodo } from "../../helpers/validation";
import { Button, Checkbox, Form, Input, Layout, ConfigProvider } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

interface Props {
  onOpenModalError: (errorText: string) => void,
  todo: Todo,
  startLoadingTasks: () => void
}

const Task: React.FC<Props> = (props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>(props.todo.title)

  const handleClickUpdateTodoStatus = async (): Promise<void> => {
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
    <Form className="task">
      {!isLoading ? <>
        <Layout className="task-header">
          <>
            {isUpdating ?
              <Input
                name="title"
                placeholder='Введите название задачи...'
                className="task_change-input"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}>
              </Input>
              :
              <Form.Item className="checkbox">
                <Checkbox
                  type="checkbox"
                  name="complete"
                  checked={props.todo.isDone}
                  onChange={handleClickUpdateTodoStatus}
                  className={`${props.todo.isDone ? 'task-header-is-done' : ''}`}
                >
                  {props.todo.title}
                </Checkbox>
              </Form.Item>
            }
          </>
        </Layout>
        <Layout className="task-buttons">
          <ConfigProvider>
            {!isUpdating ?
              <Button
                onClick={handleOpenUpdateTodo}
                icon={<EditOutlined />}
                type="primary"
              >
              </Button> :
              <>
                <Button
                  htmlType="submit"
                  onClick={handleClickUpdateTodoTitle}
                  icon={<SaveOutlined />}
                  type="primary"
                >
                </Button>
                <Button
                  onClick={handleCloseUpdateTodo}
                  icon={<CloseOutlined />}
                  type="primary"
                >
                </Button>
              </>
            }
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleClickDeleteTodo}
              icon={<DeleteOutlined />}
              danger
            />
          </ConfigProvider>
        </Layout>
      </> : 'Loading...'}
    </Form>
  )
}

export default Task
