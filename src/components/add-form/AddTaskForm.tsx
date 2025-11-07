import { addTodo } from '../../api/tasks-api'
import type { TodoRequest } from '../../types/todo.types'
import { validateTodo } from '../../helpers/validation'
import './addTaskForm.css'
import React from 'react'
import { Button, Form, Input } from 'antd';
import type { RuleObject } from 'antd/es/form'

interface Props {
  onOpenModalError: (textError: string) => void,
  startLoadingTasks: () => void
}

const AddTaskForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm<TodoRequest>();

  const handleCreateTodo = async (): Promise<void> => {
    try {
      const title: string = form.getFieldValue('title');
      await addTodo({ title: title, isDone: false });
      form.resetFields();
      props.startLoadingTasks();
    } catch (error: unknown) {
      if (error instanceof Error) props.onOpenModalError(error.message)
    }
  }

  return (
    <Form form={form} className='task-add' onFinish={handleCreateTodo}>
      <Form.Item
        name="title"
        rules={[
          {
            validator: (_: RuleObject, value: string): Promise<void> => {
              try {
                const title: string = value?.trim();
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
        label={null}>
        <Input
          name="title"
          placeholder='Введите название задачи...'
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(AddTaskForm)
