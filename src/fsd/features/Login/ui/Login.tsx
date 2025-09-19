"use client";

import { Button, Form, type FormProps, Input } from "antd";
import { type ILoginRequestData, useLogin } from "@/fsd/features/Login";
import "@ant-design/v5-patch-for-react-19";

export const Login = () => {
  const [form] = Form.useForm<ILoginRequestData>();
  const { mutate, isError, data } = useLogin();

  const handleFinish: FormProps<ILoginRequestData>["onFinish"] = (values) => {
    console.log("Форма отправлена:", values);
    mutate(values);
  };

  return (
    <div className={"w-[350px] bg-primary-bg p-5 rounded-lg"}>
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item<ILoginRequestData>
          name="login"
          label="Логин"
          rules={[
            {
              required: true,
              message: "Введите логин!",
            },
          ]}
          normalize={(value) => value?.trim()}
        >
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item<ILoginRequestData>
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: "Введите пароль!",
            },
          ]}
          normalize={(value) => value?.trim()}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Button htmlType="submit" type="primary" className={"w-full"}>
          Войти
        </Button>
      </Form>
    </div>
  );
};
