'use client'

import { Button, Form, Input, Radio } from 'antd';

export const Login = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: { username: string; password: string }) => {
    console.log("Форма отправлена:", values);
  };

  return (
    <div className={'w-[350px] bg-primary-bg p-5 rounded-lg'}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          name="username"
          label="Логин"
          rules={[{
            required: true, message: "Введите логин!"
          }]}
          normalize={(value) => value?.trim()}
        >
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{
            required: true, message: "Введите пароль!"
          }]}
          normalize={(value) => value?.trim()}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Button htmlType="submit" type="primary" className={'w-full'}>Войти</Button>
      </Form>
    </div>
  )
}