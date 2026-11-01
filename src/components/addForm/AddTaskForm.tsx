import { addTodo } from '../../api/tasksApi.ts'
import type { TodoRequest } from '../../types/todo.types'
import { validateTodo, createAntValidator } from '../../helpers/validation'
import './addTaskForm.css'
import React from 'react'
import { Button, Form, Input } from 'antd';

interface Props {
  onOpenModalError: (error: unknown) => void,
  startLoadingTasks: () => void
}

const AddTaskForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm<TodoRequest>();

  const handleCreateTodo = async (): Promise<void> => {
    try {
      const title: string = form.getFieldValue('title');
      await addTodo({ title });
      form.resetFields();
      props.startLoadingTasks();
    } catch (error: unknown) {
      props.onOpenModalError(error)
    }
  }

  return (
    <Form form={form} className='task-add' onFinish={handleCreateTodo}>
      <Form.Item
        name="title"
        rules={[
          {
            validator: createAntValidator(validateTodo),
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
