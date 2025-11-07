import { useState } from "react"
import React from "react"
import "./task.css"
import { deleteTodo, editTodo } from "../../api/tasks-api";
import type { Todo } from "../../types/todo.types";
import { validateTodo } from "../../helpers/validation";
import { Button, Checkbox, Form, Input, Layout, ConfigProvider } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import type { RuleObject } from "antd/es/form";

interface Props {
  onOpenModalError: (errorText: string) => void,
  todo: Todo,
  startLoadingTasks: () => void
}

const Task: React.FC<Props> = (props) => {

  const [form] = Form.useForm<{ title: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleClickUpdateTodoStatus = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await editTodo(props.todo.id, { isDone: !props.todo.isDone, title: props.todo.title });
      props.startLoadingTasks();
    } catch (e: unknown) {
      if (e instanceof Error) props.onOpenModalError(e.message)
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenUpdateTodo = (): void => {
    setIsUpdating(true)
    form.setFieldsValue({
      title: props.todo.title
    })
  }

  const handleClickUpdateTodoTitle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const title = form.getFieldValue('title');
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
    form.setFieldsValue({
      title: props.todo.title
    })
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
    <Form form={form} className="task" disabled={isLoading} onFinish={handleClickUpdateTodoTitle}>
      <Layout className="task-header" >
        <>
          {isUpdating ?
            <Form.Item
              name="title"
              rules={[
                {
                  validator: (_: RuleObject, value: string): Promise<void> => {
                    try {
                      const title = value?.trim();
                      validateTodo(title);
                      return Promise.resolve();
                    } catch (error) {
                      if (error instanceof Error) {
                        return Promise.reject(error.message);
                      }
                      return Promise.reject('Ошибка валидации');
                    }
                  },
                },
              ]}
            >
              <Input
                name="title"
                placeholder='Введите название задачи...'
                className="task_change-input"
              >
              </Input>
            </Form.Item>
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
    </Form>
  )
}

export default Task;
