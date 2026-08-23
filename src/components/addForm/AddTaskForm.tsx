import { addTodo } from '../../api/tasksApi.ts'
import type { TodoRequest } from '../../types/todo.types'
import { validateTodo, createAntValidator } from '../../helpers/validation'
import './addTaskForm.css'
import React from 'react'
import { Button, Form, Input } from 'antd';

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
